'use client'

import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import {
  cleanCurrencyInput,
  validateCurrencyInput,
} from '@/utils/currencyInput'

const STATES = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Puerto Rico', value: 'PR' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
]

const calculatorSchema = z
  .object({
    annualIncome: z
      .string()
      .nonempty({ message: 'Please enter your annual income.' })
      .refine(validateCurrencyInput, {
        message: 'Annual income must be a number greater than 0.',
      })
      .transform(val => cleanCurrencyInput(val)),
    stateResidence: z
      .string()
      .nonempty({ message: 'Please select your state of residence.' }),
    monthlyPayment: z
      .string()
      .nonempty({ message: 'Please enter your monthly payment.' })
      .refine(validateCurrencyInput, {
        message: 'Monthly payment must be a number greater than 0.',
      })
      .transform(val => cleanCurrencyInput(val)),
  })
  .required()

export type CalculatorSchema = z.infer<typeof calculatorSchema>

type CalculatorProps = {
  onSubmit: (values: CalculatorSchema) => void
}

export default function Calculator({ onSubmit }: CalculatorProps) {
  const form = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      annualIncome: '',
      stateResidence: '',
      monthlyPayment: '',
    },
  })

  const { isSubmitting } = form.formState

  return (
    <div className='rounded-lg border-[1px] border-blackish bg-black/10 p-6 text-blackish'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-grow'
        >
          <div className='space-y-6'>
            <p>
              Half of Americans are paying too much for rent and don&apos;t even
              know it. Find out if you&apos;re paying too much and what your
              options are.
              <br />
              <br />
              Start by entering your details below.
            </p>
            <FormField
              name='annualIncome'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='$50,000' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='stateResidence'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current State of Residence</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a state from the list' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATES.map(state => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.value + ' - ' + state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='monthlyPayment'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent or Mortage Payment</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='$1,000' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting} size='lg'>
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Calculate
            </Button>
            <div className='text-xs italic text-slate-500'>
              This calculator is for informational purposes only. Data is not
              stored with any identifying information.
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
