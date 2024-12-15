import Link from 'next/link'
import { LogoDarkTextOnly } from './svgs'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='mx-auto max-w-screen-xl px-4 pb-4 md:px-12'>
      <div className='mt-8 flex flex-col items-center justify-center border-t-[1px] border-blackish/20 pt-4 sm:flex-row sm:justify-between'>
        <Link href='/' className='inline-block p-4'>
          <LogoDarkTextOnly className='h-auto max-w-28 opacity-70 transition-opacity hover:opacity-100' />
        </Link>
      </div>
      <div className='mt-4 flex flex-col-reverse items-center justify-between gap-4 p-4 sm:flex-row'>
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
