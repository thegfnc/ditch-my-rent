'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Check, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { z } from 'zod'
import { newsletterSignUpSchema } from '@/data/schemas'

type NewsletterSignUpFormProps = {
  size?: 'sm' | 'lg'
  showDescription?: boolean
}

const STYLES = {
  sm: {
    heading: 'text-base',
    input: '',
    button: '',
  },
  lg: {
    heading: 'text-2xl',
    input: '!text-base',
    button: 'text-base',
  },
}

export default function NewsletterSignUpForm({
  size = 'lg',
  showDescription = false,
}: NewsletterSignUpFormProps) {
  const form = useForm<z.infer<typeof newsletterSignUpSchema>>({
    resolver: zodResolver(newsletterSignUpSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof newsletterSignUpSchema>) {
    const response = await fetch('/api/newsletter-sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    })

    if (response.ok) {
      console.log('Success!')
    } else {
      console.error('Failed to subscribe')
    }
  }

  const { isSubmitting, isSubmitSuccessful } = form.formState
  const CURRENT_STYLES = STYLES[size]

  return (
    <div className='flex w-full flex-col items-start justify-start'>
      {isSubmitSuccessful ? (
        <Alert className='max-w-96'>
          <Check className='h-4 w-4' />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Thank you for subscribing to our newsletter.{' '}
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <h4 className={`text-nowrap leading-none ${CURRENT_STYLES.heading}`}>
            Subscribe to our newsletter
          </h4>
          {showDescription && (
            <p className='mt-1 text-balance font-sans text-sm text-blackish/60'>
              Stay up to date with the latest news, articles, and updates. We
              promise we won&apos;t send spam.
            </p>
          )}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-2 flex w-full'
          >
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem className='flex-grow'>
                  <FormControl>
                    <Input
                      type='email'
                      id='email'
                      required
                      maxLength={256}
                      autoComplete='email'
                      placeholder='Enter your email'
                      {...field}
                      className={`rounded-r-none border-r-0 ${CURRENT_STYLES.input}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={`rounded-l-none ${CURRENT_STYLES.button}`}
              type='submit'
              disabled={isSubmitting}
              variant='secondary'
            >
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Subscribe
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
