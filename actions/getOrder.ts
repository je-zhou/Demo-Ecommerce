import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

export default async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${URL}/${id}`);  
  
  return res.json();
}