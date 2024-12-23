import Main from '@/components/Main'
import NewsletterSignUpForm from '@/components/NewsletterSignUpForm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cmsFetch, getImageUrl } from '@/data/client'
import { DIMR_blogPost } from '@/types'
import { getInitialsFromFullName } from '@/utils/getInitialsFromFullName'
import { defineQuery, toPlainText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

const LATEST_ARTICLES_QUERY = defineQuery(`
  *[_type == "DIMR_blogPost"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    content,
    featuredImage {
      ...,
      asset-> {
        url,
        metadata {
          lqip,
          dimensions {
            height,
            width
          }
        }
      }
    },
    author-> {
      fullName,
      profilePicture {
        ...,
        asset-> {
          url,
          metadata {
            lqip,
            dimensions {
              height,
              width
            }
          }
        }
      },
    }
  }
`)

export default async function Home() {
  const latestArticlesData = await cmsFetch<DIMR_blogPost[]>({
    query: LATEST_ARTICLES_QUERY,
  })

  return (
    <Main className='gap-16 px-3 py-4 md:px-4 lg:px-12 lg:py-6'>
      <h1 className='visually-hidden'>Ditch My Rent</h1>

      <div className='rounded-xl bg-gradient-to-br from-light-blue/20 to-light-blue/50 px-6 py-8 md:p-10'>
        <div className='grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-[9fr_11fr] md:gap-12'>
          <div className='flex items-center justify-center'>
            <Image
              src='/ditch-my-rent__full-logo.svg'
              alt='Ditch My Rent logo'
              width={400}
              height={400}
              priority
              className='aspect-square w-full max-w-56 md:max-w-96'
            />
          </div>
          <div>
            <h2 className='text-balance text-center text-2xl leading-tighter md:text-left md:text-3xl lg:text-4xl'>
              America has a rent problem, and we&apos;re here to help fix it.
            </h2>
            <p className='mt-4 text-balance text-center text-sm leading-tight md:mt-5 md:text-left md:text-base lg:text-lg'>
              Half of Americans are paying too much for rent and don&apos;t even
              know it. We&apos;re tackling the housing crisis by empowering
              renters to reclaim the American Dream.
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto grid grid-cols-1 px-4 py-10 md:grid-cols-2 md:px-6 lg:px-10 lg:py-14'>
        <div className='mx-auto max-w-[65ch] text-sm italic !leading-tight text-blackish/60 md:pr-14 md:text-base'>
          Nearly half of American households are burdened by rent, spending more
          than 30% of their income just to keep a roof over their heads. We
          believe everyone deserves a home that brings them happiness and
          security, whatever &quot;home&quot; means to you. By embracing
          innovative, practical, and creative solutions, we&apos;re tackling the
          housing crisis head-on—empowering individuals to reclaim freedom and
          redefine the American Dream.
        </div>
        <div className='mt-8 flex items-center justify-center border-t-[1px] border-blackish/20 pt-8 md:mt-0 md:border-l-[1px] md:border-t-0 md:pl-14 md:pt-0'>
          <NewsletterSignUpForm showDescription={true} />
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='text-2xl font-extrabold uppercase'>Latest Articles</h3>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {latestArticlesData.map(article => (
            <Link key={article._id} href={`/article/${article.slug.current}`}>
              <Card
                key={article._id}
                className='flex h-full flex-col bg-white transition-shadow duration-500 hover:shadow-xl active:shadow-sm'
              >
                <Image
                  src={getImageUrl(article.featuredImage)
                    .width(1200)
                    .quality(90)
                    .url()}
                  width={article.featuredImage.asset.metadata.dimensions.width}
                  height={
                    article.featuredImage.asset.metadata.dimensions.height
                  }
                  alt={article.featuredImage.caption}
                  className={`aspect-[16/7] w-full object-cover`}
                  priority
                  unoptimized
                  placeholder={article.featuredImage.asset.metadata.lqip}
                />
                <div className='flex flex-grow flex-col justify-between'>
                  <CardHeader>
                    <CardTitle className='text-[20px] font-bold leading-tighter'>
                      {article.title}
                    </CardTitle>
                    <CardDescription className='font-serif'>
                      {toPlainText(article.content).slice(0, 120)}...
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className='grid grid-cols-[auto,1fr] items-center gap-2 text-sm'>
                      <Avatar className='h-6 w-6 border-[1px] border-slate-400'>
                        <AvatarImage
                          src={getImageUrl(article.author.profilePicture)
                            .width(1200)
                            .quality(90)
                            .url()}
                          className='not-prose object-cover'
                          style={{
                            objectPosition: `${(article.author.profilePicture.hotspot?.x || 0.5) * 100}% ${(article.author.profilePicture.hotspot?.y || 0.5) * 100}%`,
                          }}
                          alt='@shadcn'
                        />
                        <AvatarFallback>
                          {getInitialsFromFullName(article.author.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='text-xs'>
                        By {article.author.fullName}
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Main>
  )
}
