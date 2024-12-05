import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <Image
          className='dark:invert'
          src='/ditch-my-rent__full-logo.svg'
          alt='Ditch My Rent logo'
          width={500}
          height={500}
          priority
        />
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        Coming Soon
      </footer>
    </div>
  )
}
