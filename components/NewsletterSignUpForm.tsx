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

export default function NewsletterSignUpForm() {
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

  return (
    <div className='flex w-full max-w-80 flex-col items-start justify-start gap-1'>
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
          <h4 className='text-nowrap'>Subscribe to our newsletter</h4>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-grow'
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
                      className='rounded-r-none border-r-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='rounded-l-none'
              type='submit'
              disabled={isSubmitting}
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
