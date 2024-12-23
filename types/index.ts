import { ArbitraryTypedObject } from "@portabletext/types"
import { PortableTextBlock } from "next-sanity"

export type Image = {
  _type: 'image'
  asset: {
    extension: string
    url: string
    metadata: {
      lqip: `data:image/${string}`
      dimensions: {
        aspectRatio: number
        height: number
        width: number
      }
    }
  }
  hotspot?: {
    x: number
    y: number
  }
  caption: string
}

export type DIMR_author = {
  _id: string
  fullName: string
  profilePicture: Image
  title: string
  bio: string
}

export type DIMR_blogPost = {
  _id: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  featuredImage: Image
  content: ArbitraryTypedObject[] | PortableTextBlock[]
  category: string
  author: DIMR_author
  tags: Array<{
    _key: string
    label: string
    value: string
  }>
}
