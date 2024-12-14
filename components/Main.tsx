import { cn } from '@/lib/utils'

export default function Main({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return (
    <main className={cn('mx-auto max-w-screen-xl', className)}>{children}</main>
  )
}
