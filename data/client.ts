import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient, QueryParams } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

type SanityFetchParams = {
  query: string
  params?: QueryParams
  tags?: string[]
}

export async function cmsFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: SanityFetchParams) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      tags,
    },
  })
}

export function getImageUrl(source: SanityImageSource) {
  return builder.image(source)
}
