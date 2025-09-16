import { Toaster } from '@inu/ui/components/toaster'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import React from 'react'
import Spinner from './-components/common/spinner'
import NavContainer from './-components/layout/nav/nav-container'
import { authClient } from '@/clients/authClient'
import { Navbar } from '@/routes/-components/layout/nav/navbar'

// https://tanstack.com/router/v1/docs/framework/react/devtools
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-router-devtools').then(res => ({
        default: res.TanStackRouterDevtools
      }))
    )

const RootComponent = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <NavContainer>
        <Spinner />
      </NavContainer>
    )
  }

  return (
    <>
      <Navbar session={session} />
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
