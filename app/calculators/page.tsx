import Main from '@/components/Main'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default async function CalculatorsPage() {
  return (
    <Main className='px-4 py-6 md:px-12 md:py-12'>
      <h1 className='text-6xl font-bold'>Calculators</h1>

      <div className='mt-10'>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Link href={`/calculators/am-i-paying-too-much-for-rent`}>
            <Card className='bg-white transition-shadow duration-500 hover:shadow-xl active:shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Am I Paying Too Much for Rent?
                </CardTitle>
                <CardDescription>
                  Half of Americans are paying too much for rent and don&apos;t
                  even know it. Find out if you&apos;re paying too much and what
                  your options are.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </Main>
  )
}
