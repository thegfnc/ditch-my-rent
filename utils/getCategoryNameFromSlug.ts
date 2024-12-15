export default function getCategoryNameFromSlug(slug: string) {
  switch (slug) {
    case 'digital-nomads':
      return 'Digital Nomads'
    case 'home-buying':
      return 'Home Buying'
    case 'house-hacking':
      return 'House Hacking'
    case 'personal-finance':
      return 'Personal Finance'
    case 'rv-van-life':
      return 'RV & Van Life'
    default:
      return 'Unknown'
  }
}
