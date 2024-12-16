'use client'

import { useState } from 'react'
import Main from '@/components/Main'
import Link from 'next/link'
import Calculator, { CalculatorProps } from './Calculator'

export default function AmIPayingTooMuchForRent() {
  const [values, setValues] = useState<CalculatorProps | null>(null)

  return (
    <Main className='px-4 py-4 md:px-12 md:py-8'>
      <article className='mx-auto'>
        <header>
          <Link
            href={'/calculators'}
            className='not-prose border-line-hide text-red-orange block font-semibold uppercase'
          >
            Calculators
          </Link>
          <h1 className='not-prose leading-tightest !mt-4 text-pretty text-[32px] font-extrabold text-blackish md:text-[48px]'>
            Am I Paying Too Much for Rent?
          </h1>
        </header>

        <div className='leading mt-12 grid grid-cols-3 gap-10'>
          <Calculator onSubmit={values => setValues(values)} />
          <div className='col-span-2'>
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
