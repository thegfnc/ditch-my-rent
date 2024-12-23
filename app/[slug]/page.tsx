import { DIMR_blogPost } from '@/types'
import { cmsFetch, getImageUrl } from '../../data/client'
import { defineQuery, toPlainText } from 'next-sanity'
import getCategoryNameFromSlug from '@/utils/getCategoryNameFromSlug'
import Main from '@/components/Main'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitialsFromFullName } from '@/utils/getInitialsFromFullName'
import { Metadata, ResolvingMetadata } from 'next'

type CategoryProps = {
  params: Promise<{
    slug: string
  }>
}

const CATEGORY_QUERY = defineQuery(`
  *[_type == "DIMR_blogPost" && category == $slug] | order(publishedAt desc) {
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

export async function generateMetadata(
  props: CategoryProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  const { openGraph } = await parent
  const pathname = '/' + slug

  const categoryName = getCategoryNameFromSlug(slug)

  return {
    title: categoryName + ' Articles',
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      ...openGraph,
      url: pathname,
    },
  }
}

export default async function CategoryPage(props: CategoryProps) {
  const params = await props.params
  const { slug } = params

  const categoryData = await cmsFetch<DIMR_blogPost[]>({
    query: CATEGORY_QUERY,
    params: { slug },
  })

  const categoryName = getCategoryNameFromSlug(slug)

  return (
    <Main className='px-2 py-6 md:px-4 md:py-12 lg:px-12'>
      <h1 className='text-4xl font-bold md:text-6xl'>{categoryName}</h1>

      <div className='mt-6 md:mt-10'>
        <h2 className='text-xl font-medium'>Articles</h2>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categoryData.length > 0 ? (
            categoryData.map(article => (
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
                    width={
                      article.featuredImage.asset.metadata.dimensions.width
                    }
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
            ))
          ) : (
            <p>{categoryName} articles coming soon...</p>
          )}
        </div>
      </div>
    </Main>
  )
}
