'use client'

import { LogoDarkTextOnly } from '@/components/svgs'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <header className='sticky top-2 z-10 mx-auto max-w-screen-xl px-2 md:top-4 md:px-4'>
      <div className='bg-blackish mt-2 flex gap-4 rounded-lg p-4 md:mt-4 md:p-6'>
        <LogoDarkTextOnly className='h-auto max-w-32' />
        <NavigationMenu className='max-w-full flex-grow justify-end'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/digital-nomads' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/digital-nomads')}
                >
                  Digital Nomads
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/home-buying' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/home-buying')}
                >
                  Home Buying
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/house-hacking' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/house-hacking')}
                >
                  House Hacking
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/personal-finance' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/personal-finance')}
                >
                  Personal Finance
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/rv-van-life' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/rv-van-life')}
                >
                  RV & Van Life
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/calculators' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname.startsWith('/calculators')}
                >
                  Calculators
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
