import { cmsFetch, getImageUrl } from '@/data/client'
import Main from '@/components/Main'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DIMR_blogPost } from '@/types'
import getCategoryNameFromSlug from '@/utils/getCategoryNameFromSlug'
import { getInitialsFromFullName } from '@/utils/getInitialsFromFullName'
import { defineQuery, PortableText, toPlainText } from 'next-sanity'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, Suspense } from 'react'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import NewsletterSignUpForm from '@/components/NewsletterSignUpForm'

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

export async function generateMetadata(
  props: ArticleProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  const { openGraph, keywords } = await parent
  const pathname = '/article/' + slug

  const articleData = await cmsFetch<DIMR_blogPost>({
    query: ARTICLE_QUERY,
    params: { slug },
  })

  return {
    title: `${articleData.title} Article`,
    description: toPlainText(articleData.content).slice(0, 157) + '...',
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      ...openGraph,
      url: pathname,
      images: [
        getImageUrl(articleData.featuredImage).width(1200).quality(90).url(),
      ],
    },
    keywords: [...articleData.tags.map(tag => tag.label), ...(keywords || [])],
    authors: [{ name: articleData.author.fullName }],
  }
}

export default async function ArticlePage(props: ArticleProps) {
  const params = await props.params
  const { slug } = params

  const articleData = await cmsFetch<DIMR_blogPost>({
    query: ARTICLE_QUERY,
    params: { slug },
  })

  for (let i = 5; i < articleData.content.length; i++) {
    const currentBlock = articleData.content[i]

    if (
      currentBlock._type === 'block' &&
      ['h1', 'h2', 'h3', 'h4'].includes(currentBlock.style)
    ) {
      articleData.content.splice(i, 0, {
        _type: 'newsletterSignUpForm',
      })
      break
    }
  }

  return (
    <Main className='px-3 py-4 md:px-4 md:py-8 lg:px-12'>
      <article className='prose mx-auto'>
        <header>
          <Link
            href={'/' + articleData.category}
            className='not-prose border-line-hide block font-semibold uppercase text-red-orange'
          >
            {getCategoryNameFromSlug(articleData.category)}
          </Link>
          <h1 className='not-prose !mt-4 text-pretty text-[32px] font-extrabold leading-tightest text-blackish md:text-[48px]'>
            {articleData.title}
          </h1>
          <figure className='mb-4'>
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
              className='aspect-[16/9] w-full rounded-lg object-cover'
              style={{
                objectPosition: `${(articleData.featuredImage.hotspot?.x || 0.5) * 100}% ${(articleData.featuredImage.hotspot?.y || 0.5) * 100}%`,
              }}
              priority
              unoptimized
              placeholder={articleData.featuredImage.asset.metadata.lqip}
            />
            <figcaption className='!ml-2 !mt-2 !text-xs tracking-normal'>
              {articleData.featuredImage.caption}
            </figcaption>
          </figure>
          <div className='grid grid-cols-[auto,1fr] gap-4 border-y-[1px] border-blackish/40 py-4 text-sm'>
            <Avatar className='ml-2 mt-1 h-12 w-12 border-[1px] border-blackish'>
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
              <div className='mt-2 max-w-[48ch]'>{articleData.author.bio}</div>
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
                    <Link
                      href={value?.href}
                      target={target}
                      rel={target === '_blank' ? 'noindex nofollow' : ''}
                    >
                      {children}
                    </Link>
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
                newsletterSignUpForm: function CaseStudyNewsletterSignUpForm() {
                  return (
                    <div className='not-prose my-8 rounded-lg bg-blackish/5 p-4 md:p-6'>
                      <NewsletterSignUpForm showDescription={true} />
                    </div>
                  )
                },
              },
            }}
          />
        </div>

        <div className='not-prose flex flex-wrap items-center gap-2 border-t-[1px] border-blackish/20 pt-6'>
          <h4 className='text-sm'>Tags:</h4>
          {articleData.tags.map(tag => (
            <Badge key={tag._key}>{tag.label}</Badge>
          ))}
        </div>
      </article>
    </Main>
  )
}
