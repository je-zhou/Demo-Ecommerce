import getCategory from '@/actions/getCategory';
import getProducts from '@/actions/getProducts';
import Billboard from '@/components/Billboard';
import Container from '@/components/Container';
import React from 'react'
import Filter from './components/Filter';
import NoResults from '@/components/ui/NoResults';
import ProductCard from '@/components/ProductCard';
import MobileFilter from './components/MobileFilter';

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colourId: string;
    sizeId: string
  }
}

export default async function CategoryPage({params, searchParams}: CategoryPageProps) {
  const products = await getProducts({
    categoryId: params.categoryId,
  })

  const category = await getCategory(params.categoryId)

  return (
    <div className='bg-white min-h-screen text-black pb-24'>
      <Container>
        <Billboard url={category.imageUrl} description={""}/>
        <div className='py-16 flex flex-row space-between'>
          <div className='space-y-4 w-full'>
            <h2 className='font-bold text-4xl underline'>{category.name}</h2>
            <p>Customers love our top home decoration bestsellers – these curated favorites will transform your space with style.</p>
          </div>
          <div className='w-64 flex justify-end items-end'>
            <p className='text-gray-500'>Sort by <span className='font-bold text-black underline'>Best Sellers</span></p>
          </div>
        </div>
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length === 0 && <NoResults/>}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((item) => (
                  <ProductCard key={item.id} data={item}></ProductCard>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center text-gray-400'>
          {`Showing ${products.length} of ${products.length}`}
        </div>
      </Container>
    </div>
  )
}
