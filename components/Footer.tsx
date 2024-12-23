import Link from 'next/link'
import { LogoDarkTextOnly } from './svgs'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import NewsletterSignUpForm from './NewsletterSignUpForm'

export default function Footer() {
  return (
    <footer className='mx-auto max-w-screen-xl px-3 pb-4 md:px-4 lg:px-12'>
      <div className='mt-8 flex flex-col-reverse items-center justify-center gap-4 border-t-[1px] border-blackish/20 pt-8 sm:flex-row sm:justify-between sm:pr-4 sm:pt-4'>
        <Link href='/' className='inline-block p-4'>
          <LogoDarkTextOnly className='mt-[2px] h-auto max-w-28 opacity-70 transition-opacity hover:opacity-100' />
        </Link>
        <div className='w-full max-w-80'>
          <NewsletterSignUpForm size='sm' />
        </div>
      </div>
      <div className='mt-2 flex flex-col-reverse items-center justify-between gap-4 p-4 sm:mt-4 sm:flex-row'>
        <div className='text-sm text-slate-500'>
          &copy; {new Date().getFullYear()} Ditch My Rent. All rights reserved.
        </div>
        <ul className='flex gap-3'>
          <li>
            <Link
              href='https://www.instagram.com/ditchmyrent/'
              target='_blank'
              rel='noopener noreferrer'
              className='block aspect-square h-full rounded-full bg-blackish/10 p-2 transition-colors hover:bg-blackish/20'
            >
              <FaInstagram
                className='h-6 w-6 text-blackish'
                title='Instagram'
              />
            </Link>
          </li>
          <li>
            <Link
              href='https://www.tiktok.com/@ditchmyrent'
              target='_blank'
              rel='noopener noreferrer'
              className='block aspect-square h-full rounded-full bg-blackish/10 p-2 transition-colors hover:bg-blackish/20'
            >
              <FaTiktok className='h-6 w-6 text-blackish' title='TikTok' />
            </Link>
          </li>
          <li className='aspect-square'>
            <Link
              href='https://youtube.com/@ditchmyrent'
              target='_blank'
              rel='noopener noreferrer'
              className='block aspect-square h-full rounded-full bg-blackish/10 p-2 transition-colors hover:bg-blackish/20'
            >
              <FaYoutube className='h-6 w-6 text-blackish' title='YouTube' />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
