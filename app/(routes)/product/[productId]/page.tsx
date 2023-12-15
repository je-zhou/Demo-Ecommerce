import getProduct from '@/actions/getProduct';
import getProducts from '@/actions/getProducts'
import Container from '@/components/Container';
import Gallery from '@/components/Gallery/Gallery';
import Info from '@/components/Info';
import ProductList from '@/components/ProductList';
import Reviews from '@/components/Reviews';
import { Product } from '@/types';
import React from 'react'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({params}: ProductPageProps) {
  const product = await getProduct(params.productId);;

  const suggestedProducts: Product[] = await getProducts({
    categoryId: product.categories.length > 0 ? product.categories[0].id : undefined
  })

  return (
    <div className='bg-white w-full h-full text-black'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info data={product}/>
            </div>
            <Gallery images={product.images}/>
          </div>
          {/* Details */}
          <div className='space-y-8 pt-16'>
            <div className='flex items-center flex-col max-w-fit'>
              <h2 className='text-2xl font-bold'>Details</h2>
              <div className='w-full px-1'>
               <div className='h-1 bg-[#FF6A6A] rounded-t-full'/>
              </div>
            </div>
            <p className='whitespace-pre-line text-sm text-gray-800'>{product.productDetails ? Buffer.from(product.productDetails.data).toString("utf-8") : ""}</p>
          </div>
          {/* Reviews */}
          <div className='space-y-8 pt-16'>
            <div className='flex items-center flex-col max-w-fit'>
              <h2 className='text-2xl font-bold'>Reviews</h2>
              <div className='w-full px-1'>
                <div className='h-1 bg-[#FF6A6A] rounded-t-full'/>
              </div>
            </div>
            <Reviews
              product={product}
            />
          </div>
          {/* Related products */}
          <hr className='my-10'/>
          <ProductList title='Related Items' items={suggestedProducts}/>
        </div>
      </Container>
    </div>
  )
}
