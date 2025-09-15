import { Toaster } from '@inu/ui/components/toaster'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import React from 'react'
import { Navbar } from '@/routes/-components/layout/nav/navbar'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then(res => ({
        default: res.TanStackRouterDevtools
      }))
    )

function RootComponent() {
  return (
    <>
      <Navbar />
      <Toaster />
      <div className='p-2 md:p-4'>
        <Outlet />
      </div>
      <React.Suspense>
        <TanStackRouterDevtools position='bottom-right' />
      </React.Suspense>
    </>
  )
}

export const Route = createRootRoute({ component: RootComponent })
