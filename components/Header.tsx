'use client'

import { useEffect, useState } from 'react'
import { LogoLightTextOnly } from '@/components/svgs'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { MdMenu } from 'react-icons/md'

const SCROLL_THRESHOLD = 50

const MENU_ITEMS = [
  { label: 'Digital Nomads', href: '/digital-nomads' },
  { label: 'Home Buying', href: '/home-buying' },
  { label: 'House Hacking', href: '/house-hacking' },
  { label: 'Personal Finance', href: '/personal-finance' },
  { label: 'RV & Van Life', href: '/rv-van-life' },
  { label: 'Calculators', href: '/calculators' },
]

export default function Header() {
  const pathname = usePathname()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuSheetVisible, setIsMenuSheetVisible] = useState(false)

  useEffect(() => {
    const controlNavbar = () => {
      const scrollDifference = Math.abs(window.scrollY - lastScrollY)

      if (scrollDifference < SCROLL_THRESHOLD) return

      if (window.scrollY > lastScrollY) {
        // scroll down
        setIsHeaderVisible(false)
      } else {
        // scroll up
        setIsHeaderVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  useEffect(() => {
    setIsHeaderVisible(true)
    setIsMenuSheetVisible(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-10 mx-auto max-w-screen-xl px-2 pb-2 transition-transform duration-300 md:px-4 md:pb-4 lg:px-8 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='h-2 backdrop-blur-sm md:h-4'></div>
      <div className='flex justify-between gap-4 rounded-lg bg-blackish p-4 shadow-md md:px-6 md:py-5'>
        <Link href='/'>
          <LogoLightTextOnly className='mt-[2px] h-auto max-w-28' />
        </Link>
        <NavigationMenu className='hidden max-w-full flex-grow justify-end lg:flex'>
          <NavigationMenuList>
            {MENU_ITEMS.map(item => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname.startsWith(item.href)}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Sheet open={isMenuSheetVisible} onOpenChange={setIsMenuSheetVisible}>
          <SheetTrigger className='p-2 lg:hidden'>
            <MdMenu className='h-7 w-7 text-whiteish' />
          </SheetTrigger>
          <SheetContent className='px-0 py-6'>
            <SheetHeader className='px-6'>
              <SheetTitle className='text-left'>Menu</SheetTitle>
            </SheetHeader>
            <ul className='mt-8'>
              <li key={'/'}>
                <Link
                  href={'/'}
                  className={`block px-6 py-2 text-lg text-blackish active:bg-blackish/10 ${pathname === '/' ? 'bg-blackish/10' : ''}`}
                  onClick={() => {
                    setIsHeaderVisible(true)
                    setIsMenuSheetVisible(false)
                  }}
                >
                  Home
                </Link>
              </li>
              {MENU_ITEMS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-6 py-2 text-lg text-blackish active:bg-blackish/10 ${pathname.startsWith(item.href) ? 'bg-blackish/10' : ''}`}
                    onClick={() => {
                      setIsHeaderVisible(true)
                      setIsMenuSheetVisible(false)
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
