import { DIMR_blogPost } from '@/types'
import { cmsFetch, getImageUrl } from '../data/client'
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

type CategoryProps = {
  params: Promise<{
    slug: string
  }>
}

const CATEGORY_QUERY = defineQuery(`
  *[_type == "DIMR_blogPost" && category == $slug]{
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

export default async function CategoryPage(props: CategoryProps) {
  const params = await props.params
  const { slug } = params

  const [categoryData] = await Promise.all([
    cmsFetch<DIMR_blogPost[]>({
      query: CATEGORY_QUERY,
      params: { slug },
    }),
  ])

  const categoryName = getCategoryNameFromSlug(slug)

  return (
    <Main className='px-4 py-6 md:px-12 md:py-12'>
      <h1 className='text-6xl font-bold'>{categoryName}</h1>

      <div className='mt-10'>
        <h2 className='text-xl font-medium'>Articles</h2>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categoryData.length > 0 ? (
            categoryData.map(article => (
              <Link key={article._id} href={`/article/${article.slug.current}`}>
                <Card
                  key={article._id}
                  className='bg-white transition-shadow duration-500 hover:shadow-xl active:shadow-sm'
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
                  <CardHeader>
                    <CardTitle className='leading-tighter text-[20px] font-bold'>
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
