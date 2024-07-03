import { Resend } from "resend";
import CustomerInvoice from "@/emails/customerInvoice";
import { Order } from "@/types";

const resendKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendKey);

export type ResendResponse = {
  detail: string;
  status: number;
};

export class ResendClient {
  static async sendCustomerInvoice(
    email: string,
    order: Order
  ): Promise<ResendResponse> {
    try {
      const response = await resend.emails.send({
        from: "021 Commerce <info@021-commerce.com.au>",
        to: email,
        subject: `Thanks for your order! [${order.id}]`,
        react: CustomerInvoice({ order: order }),
      });

      if (response.error) {
        return {
          detail: "Couldn't send order email: " + response.error.message,
          status: 501,
        };
      }
      return {
        detail: "Order Email Sent: Response - " + response.data?.id,
        status: 202,
      };
    } catch (error) {
      console.log(error);

      return { detail: "Couldn't send order email", status: 501 };
    }
  }
}
