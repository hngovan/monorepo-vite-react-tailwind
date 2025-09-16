import type { ReactNode } from 'react'

export default function NavContainer({
  children
}: Readonly<{
  children?: ReactNode
}>) {
  return (
    <div className='bg-nav flex h-12 items-center justify-between px-2 text-lg md:px-4'>
      {children}
    </div>
  )
}
