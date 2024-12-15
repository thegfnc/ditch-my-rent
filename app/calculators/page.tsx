import Main from '@/components/Main'
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import Link from 'next/link'

export default async function CalculatorsPage() {
  return (
    <Main className='px-4 py-6 md:px-12 md:py-12'>
      <h1 className='text-6xl font-bold'>Calculators</h1>

      <div className='mt-10'>
        <p>Calculators coming soon...</p>
        {/* <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Link href={`/calculators/one`}>
            <Card className='bg-white transition-shadow duration-500 hover:shadow-xl active:shadow-sm'>
              <CardHeader>
                <CardTitle>Calculator One</CardTitle>
                <CardDescription>Check it out</CardDescription>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </Link>
        </div> */}
      </div>
    </Main>
  )
}
