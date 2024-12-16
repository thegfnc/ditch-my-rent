import { MetadataRoute } from 'next'
// import getCurrentLocationFromUrlParams from './helpers/getCurrentLocationFromUrlParams'
// import getChildLocationsFromLocation from './helpers/getChildLocationGroupsFromLocation'
// import getUrlFromCurrentLocation from './helpers/getUrlFromCurrentLocation'
// import { IIHD_country, CurrentLocation } from './types'
import { cmsFetch } from '../data/client'
import { defineQuery } from 'next-sanity'
import { DIMR_blogPost } from '@/types'

const defaultPage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const digitalNomadsPage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/digital-nomads',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const homeBuyingPage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/home-buying',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const houseHackingPage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/house-hacking',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const personalFinancePage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/personal-finance',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const rvVanLifePage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/rv-van-life',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const calculatorsPage: MetadataRoute.Sitemap[0] = {
  url: 'https://ditchmyrent.com/calculators',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 1,
}

const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "DIMR_blogPost"]{
    slug,
  }
`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await cmsFetch<DIMR_blogPost[]>({
    query: ALL_ARTICLES_QUERY,
  })

  const articlePages: MetadataRoute.Sitemap[0][] = data.map((article) => ({
    url: `https://ditchmyrent.com/article/${article.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }))

  return [defaultPage, digitalNomadsPage, homeBuyingPage, houseHackingPage, personalFinancePage, rvVanLifePage, calculatorsPage, ...articlePages]
}
