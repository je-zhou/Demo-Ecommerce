import getOrder from "@/actions/getOrder";
import { ResendResponse, ResendClient } from "@/lib/resend";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS(){
  return NextResponse.json({}, {headers: corsHeaders})
}

export async function GET(
) {
  try {
    const order = await getOrder("2d4de07c-9f8f-4ca5-9ede-6ac059ccebf7")

    if (order){

      // Test to see if storeID === the store id in the order

      // if (params.storeId != order.storeId) throw Error("Store ID does not match the store ID on this order")

      // Send email
      const emailResult: ResendResponse = await ResendClient.sendCustomerInvoice(order.email, order);

      console.log("[CUSTOMER INVOICE]: ", emailResult.detail);

      return new NextResponse(emailResult.detail, {status: 200, headers: corsHeaders})
    } else {
      console.log("Order Not Found")
      return new NextResponse("No order found with this ID",{status: 501, headers: corsHeaders})
    }
  } catch (error) {
    console.log('[SEND_INVOICE]', error);
    return new NextResponse("Internal Error", {status: 500, headers: corsHeaders})
  }
}
