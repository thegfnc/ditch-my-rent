import { cmsFetch, getImageUrl } from '@/app/data/client'
import Main from '@/components/Main'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DIMR_blogPost } from '@/types'
import getCategoryNameFromSlug from '@/utils/getCategoryNameFromSlug'
import { getInitialsFromFullName } from '@/utils/getInitialsFromFullName'
import { defineQuery, PortableText } from 'next-sanity'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, Suspense } from 'react'

type ArticleProps = {
  params: Promise<{
    slug: string
  }>
}

const MediaPlayer = dynamic(() => import('@/components/MediaPlayer'))

const ARTICLE_QUERY = defineQuery(`
  *[_type == "DIMR_blogPost" && slug.current == $slug][0]{
    title,
    slug,
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
    content,
    category,
    tags,
    author-> {
      fullName,
      title,
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
      bio,
    }
  }
`)

export default async function ArticlePage(props: ArticleProps) {
  const params = await props.params
  const { slug } = params

  const [articleData] = await Promise.all([
    cmsFetch<DIMR_blogPost>({
      query: ARTICLE_QUERY,
      params: { slug },
    }),
  ])

  return (
    <Main className='px-4 py-6 md:px-12 md:py-12'>
      <article className='prose mx-auto lg:prose-lg'>
        <header>
          <a
            href={'/' + articleData.category}
            className='not-prose border-line-hide block uppercase'
          >
            {getCategoryNameFromSlug(articleData.category)}
          </a>
          <h1 className='!mt-4 text-pretty'>{articleData.title}</h1>
          <figure>
            <Image
              src={getImageUrl(articleData.featuredImage)
                .width(1200)
                .quality(90)
                .url()}
              width={articleData.featuredImage.asset.metadata.dimensions.width}
              height={
                articleData.featuredImage.asset.metadata.dimensions.height
              }
              alt={articleData.featuredImage.caption}
              className={`w-full rounded`}
              priority
              unoptimized
              placeholder={articleData.featuredImage.asset.metadata.lqip}
            />
            <figcaption className='!ml-1 !mt-2 !text-xs tracking-normal'>
              {articleData.featuredImage.caption}
            </figcaption>
          </figure>
          <div className='grid grid-cols-[auto,1fr] gap-4 border-y-[1px] border-slate-400 py-4 text-sm'>
            <Avatar className='h-16 w-16 border-[1px] border-slate-400'>
              <AvatarImage
                src={getImageUrl(articleData.author.profilePicture)
                  .width(1200)
                  .quality(90)
                  .url()}
                className='not-prose object-cover'
                style={{
                  objectPosition: `${(articleData.author.profilePicture.hotspot?.x || 0.5) * 100}% ${(articleData.author.profilePicture.hotspot?.y || 0.5) * 100}%`,
                }}
                alt='@shadcn'
              />
              <AvatarFallback>
                {getInitialsFromFullName(articleData.author.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col justify-center text-xs'>
              <div className='text-base'>
                By <strong>{articleData.author.fullName}</strong>
              </div>
              <div className='font-light italic'>
                {articleData.author.title}
              </div>
              <div className='mt-2 max-w-[40ch]'>{articleData.author.bio}</div>
            </div>
          </div>
        </header>

        <div className='font-serif'>
          <PortableText
            value={articleData.content}
            components={{
              marks: {
                link: ({ value, children }) => {
                  const target = (value?.href || '').startsWith('http')
                    ? '_blank'
                    : undefined
                  return (
                    <a
                      href={value?.href}
                      target={target}
                      rel={target === '_blank' ? 'noindex nofollow' : ''}
                    >
                      {children}
                    </a>
                  )
                },
              },
              types: {
                image: function CaseStudyImage({ value }) {
                  return (
                    <Image
                      src={getImageUrl(value).width(1200).quality(90).url()}
                      width={value.asset.metadata.dimensions.width}
                      height={value.asset.metadata.dimensions.height}
                      alt={value.caption}
                      className={`w-full`}
                      unoptimized
                      placeholder={value.asset.metadata.lqip}
                    />
                  )
                },
                videoFile: function CaseStudyVideoFile({ value }) {
                  return (
                    <div className='flex aspect-video justify-center'>
                      <MediaPlayer
                        url={value.asset.url}
                        playing={value.playing}
                        controls={value.controls}
                        loop={value.loop}
                        playsinline={true}
                        volume={0}
                        muted={true}
                      />
                    </div>
                  )
                },
                embedUrl: function CaseStudyEmbedUrl({ value }) {
                  return (
                    <div className='flex aspect-video justify-center'>
                      <MediaPlayer url={value.url} />
                    </div>
                  )
                },
                embedCode: memo(function CaseStudyEmbedCode({ value }) {
                  return (
                    <Suspense>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: value.code.code,
                        }}
                        className='flex justify-center'
                      />
                    </Suspense>
                  )
                }),
              },
            }}
          />
        </div>

        <div className='not-prose flex flex-wrap items-center gap-2 border-t-[1px] border-slate-400 pt-6'>
          <h4 className='text-sm'>Tags:</h4>
          {articleData.tags.map(tag => (
            <Badge key={tag._key}>{tag.label}</Badge>
          ))}
        </div>
      </article>
    </Main>
  )
}
