import Main from '@/components/Main'
import Image from 'next/image'

export default function Home() {
  return (
    <Main className='gap-16 px-4 py-4 md:px-12 md:py-8'>
      <h1 className='visually-hidden'>Ditch My Rent</h1>
      <main className='flex flex-col items-center justify-center gap-12'>
        <Image
          className='dark:invert'
          src='/ditch-my-rent__full-logo.svg'
          alt='Ditch My Rent logo'
          width={360}
          height={360}
          priority
        />
        <article className='prose-lg mx-auto max-w-[40ch] lg:prose-xl prose-h2:text-[24px] lg:prose-h2:text-[30px]'>
          <h2 className='text-balance leading-tight'>
            America has a rent problem, and we&apos;re here to help fix it.
          </h2>
          <p className='leading-snug'>
            Nearly half of American households are burdened by rent, spending
            more than 30% of their income just to keep a roof over their heads.
            We believe everyone deserves a home that brings them happiness and
            security, whatever &quot;home&quot; means to you. By embracing
            innovative, practical, and creative solutions, we&apos;re tackling
            the housing crisis head-on—empowering individuals to reclaim freedom
            and redefine the American Dream.
          </p>
        </article>
      </main>
    </Main>
  )
}
