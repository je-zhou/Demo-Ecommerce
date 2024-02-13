import Stripe from "stripe"
import {headers} from "next/headers"

import stripe from "@/lib/stripe"
import { NextResponse } from "next/server";
import { ResendClient, ResendResponse } from "@/lib/resend";
import getOrder from "@/actions/getOrder";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeSecret
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message} ::: Webhook Signature: ${signature} ::: Stripe Webhook Secret: ${stripeSecret}`, {status:400})
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.async_payment_succeeded") {

    const orderId = session?.metadata?.orderId;

    if (orderId) {
      const order = await getOrder(orderId);

      // Send email
      const emailResult: ResendResponse = await ResendClient.sendCustomerInvoice(order.email, order);
  
      console.log("[CUSTOMER INVOICE]: ", emailResult.detail);
  
      return new NextResponse(emailResult.detail, {status: 200})
   
    }
  }

  return new NextResponse("Email not sent - Something went wrong", {status: 400})
}