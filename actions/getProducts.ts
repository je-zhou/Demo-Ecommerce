import qs from "query-string"

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string
  isFeatured?: boolean
}

export default async function getProducts(query: Query): Promise<Product[]> {

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured
    }
  });

  const res = await fetch(url);
  
  return res.json();
}