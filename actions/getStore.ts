import { Store } from "@/types";

const URL = `https://www.021-commerce.com.au/api/stores`;

export default async function getStore(id: string): Promise<Store> {
  const res = await fetch(`${URL}/${id}`);  
  
  return res.json();
}