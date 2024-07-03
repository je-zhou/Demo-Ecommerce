import Stripe from "stripe";
import { headers } from "next/headers";

import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";
import { ResendClient, ResendResponse } from "@/lib/resend";
import getOrder from "@/actions/getOrder";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeSecret);
  } catch (error: any) {
    return new NextResponse(
      `Webhook Error: ${error.message} ::: Webhook Signature: ${signature} ::: Stripe Webhook Secret: ${stripeSecret}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const address = session.shipping_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const orderId = session?.metadata?.orderId;

    if (orderId) {
      let order = await getOrder(orderId);

      if (order) {
        order = {
          ...order,
          paidOn: new Date(),
          phone: session.customer_details?.phone || "",
          address: addressString,
          email: session.customer_details?.email || "",
          name: session.customer_details?.name || "",
          shipping: session.shipping_cost?.amount_total
            ? session.shipping_cost?.amount_total / 100
            : 0,
          isLocalPickUp: session?.metadata?.localPickUp === "true",
        };

        // Send email
        const emailResult: ResendResponse =
          await ResendClient.sendCustomerInvoice(order.email, order);

        console.log("[CUSTOMER INVOICE]: ", emailResult.detail);

        return new NextResponse(JSON.stringify(emailResult), {
          status: emailResult.status,
        });
      }

      return new NextResponse("Email not sent - Order not found", {
        status: 500,
      });
    }
  }

  return new NextResponse("Email not sent - Something went wrong", {
    status: 500,
  });
}
