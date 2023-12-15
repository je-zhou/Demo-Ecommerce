import getProducts from '@/actions/getProducts';
import Container from '@/components/Container';
import LandingPage from '@/components/Landing/LandingPage'
import ProductList from '@/components/ProductList';


export default async function Home() {
  const products = await getProducts({isFeatured: true})

  return (
    <main className="flex flex-col items-center bg-white min-h-screen">
      {/* TitlePage */}
      <div className='w-full h-full'>
        <LandingPage></LandingPage>
        <div className='py-16'>
          <Container>
            <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 '>
              {/* Best Sellers */}
              <div className='flex flex-row space-x-16 justify-center py-24'>
                {/* Text */}
                <div className='text-black max-w-[240px] space-y-4 mt-8'>
                  <p className='font-bold underline text-xl'>Best Sellers</p>
                  <p>Drip out in style with the most popular picks our customers love</p>
                </div>
                {/* Best Selling Products */}
                <ProductList title='' items={products ?? []}/>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </main>
  )
}
      