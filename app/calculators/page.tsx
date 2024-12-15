// import { getImageUrl } from '../data/client'
import Main from '@/components/Main'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import Image from 'next/image'
import Link from 'next/link'

export default async function CalculatorsPage() {
  return (
    <Main className='px-4 py-6 md:px-12 md:py-12'>
      <h1 className='text-6xl font-bold'>Calculators</h1>

      <div className='mt-10'>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Link href={`/calculators/one`}>
            <Card className='bg-white transition-shadow duration-500 hover:shadow-xl active:shadow-sm'>
              {/* <Image
                src={getImageUrl(article.featuredImage)
                  .width(1200)
                  .quality(90)
                  .url()}
                width={article.featuredImage.asset.metadata.dimensions.width}
                height={article.featuredImage.asset.metadata.dimensions.height}
                alt={article.featuredImage.caption}
                className={`aspect-[16/7] w-full object-cover`}
                priority
                unoptimized
                placeholder={article.featuredImage.asset.metadata.lqip}
              /> */}
              <CardHeader>
                <CardTitle>Calculator One</CardTitle>
                <CardDescription>Check it out</CardDescription>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </Main>
  )
}