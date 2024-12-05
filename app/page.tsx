import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
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
        <article className='prose-lg prose-h2:text-[24px] lg:prose-xl lg:prose-h2:text-[30px] mx-auto max-w-[40ch]'>
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
      <footer className='flex flex-wrap items-center justify-center gap-6 font-sans text-xl'>
        Coming Soon
      </footer>
    </div>
  )
}
