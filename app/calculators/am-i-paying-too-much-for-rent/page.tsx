'use client'

import { useState } from 'react'
import Main from '@/components/Main'
import Link from 'next/link'
import Calculator, { CalculatorSchema } from './Calculator'

export default function AmIPayingTooMuchForRent() {
  const [values, setValues] = useState<CalculatorSchema | null>(null)

  return (
    <Main className='px-3 py-4 md:px-12 md:py-8'>
      <article className='mx-auto'>
        <header>
          <Link
            href={'/calculators'}
            className='not-prose border-line-hide block font-semibold uppercase text-red-orange'
          >
            Calculators
          </Link>
          <h1 className='not-prose !mt-4 text-pretty text-[32px] font-extrabold leading-tightest text-blackish md:text-[48px]'>
            Am I Paying Too Much for Rent?
          </h1>
        </header>

        <div className='leading mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
          <Calculator
            onSubmit={(values: CalculatorSchema) => setValues(values)}
          />
          <div className='lg:col-span-2'>
            {values ? (
              <pre>{JSON.stringify(values, null, 2)}</pre>
            ) : (
              <p>
                Fill out the form to the left to see the results appear here.
              </p>
            )}
          </div>
        </div>
      </article>
    </Main>
  )
}
