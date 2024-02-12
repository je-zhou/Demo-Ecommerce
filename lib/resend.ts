import { Resend } from "resend";
import CustomerInvoice from '@/emails/customerInvoice';
import { Order } from "@/types";
import axios from "axios";

const resendKey = process.env.RESEND_API_KEY || ''
const resend = new Resend(resendKey);

export type ResendResponse = {
    detail: string
    status: number
}

export class ResendClient {
  static async sendCustomerInvoice(email: string, order: Order ): Promise<ResendResponse> {
    try {        
      await resend.emails.send({
        from: '021 Commerce <info@021-commerce.com.au>',
        to: email,
        subject: `Thanks for your order! [${order.id}]`,
        react: CustomerInvoice({order: order}),
      });

      return {detail: "Invoice sent to customer!", status: 202};

    } catch (error) {
      console.log(error);

      return {detail: "Couldn't send order email", status: 501}
    }
  }

  static async test(): Promise<ResendResponse> {
    try {        
      const resp = axios.get("https://anime-facts-rest-api.herokuapp.com/api/v1");
      console.log(resp);
      return {detail: "Invoice sent to customer!", status: 202};

    } catch (error) {
      console.log(error);

      return {detail: "Couldn't send order email", status: 501}
    }
  }
}