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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const scrollDifference = Math.abs(window.scrollY - lastScrollY)

      if (scrollDifference < SCROLL_THRESHOLD) return

      if (window.scrollY > lastScrollY) {
        // scroll down
        setIsVisible(false)
      } else {
        // scroll up
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <header
      className={`sticky top-0 z-10 mx-auto max-w-screen-xl px-2 pb-2 transition-transform duration-300 md:px-4 md:pb-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='h-2 backdrop-blur-sm md:h-4'></div>
      <div className='flex justify-between gap-4 rounded-lg bg-blackish p-4 shadow-md md:px-6 md:py-4'>
        <Link href='/'>
          <LogoLightTextOnly className='h-auto max-w-32' />
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
        <Sheet>
          <SheetTrigger className='p-2 lg:hidden'>
            <MdMenu className='h-7 w-7 text-whiteish' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ul>
              {MENU_ITEMS.map(item => (
                <li key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <a
                      className='block p-4 text-blackish'
                      onClick={() => setIsVisible(true)}
                    >
                      {item.label}
                    </a>
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
