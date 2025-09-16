import { Button } from '@inu/ui/components/button'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow
} from '@inu/ui/components/tooltip'
import { ArrowLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import { createFileRoute, Link } from '@tanstack/react-router'
import { apiClient } from '@/clients/apiClient'
import { queryClient } from '@/clients/queryClient'
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options'

export const Route = createFileRoute('/_protected/posts/$postid/')({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      apiClient.posts.one.queryOptions({ input: { id: params.postid } })
    ),
  component: RouteComponent,
  errorComponent: ({ error, reset }) => {
    return (
      <div className='flex w-full flex-col items-center gap-y-3'>
        <div>{error.message}</div>
        <div className='flex gap-2'>
          <Button asChild variant='outline' className='w-full'>
            <Link {...postsLinkOptions}>
              <ArrowLeftIcon />
              Go Back
            </Link>
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              // Reset the router error boundary
              reset()
            }}
            className='w-full'
          >
            Retry? <ReloadIcon />
          </Button>
        </div>
      </div>
    )
  }
})

function RouteComponent() {
  const post = Route.useLoaderData()

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col px-4 break-words'>
      <div className='rounded-2xl p-5 text-center'>
        <h1 className='text-2xl font-bold md:text-4xl'>{post.title}</h1>
        <h2 className='mt-2 text-sm text-gray-500'>
          Created by <span className='font-medium'>{post.author.name}</span>
        </h2>
        <h2 className='mt-1 text-sm text-gray-500'>
          {new Date(post.createdAt).toLocaleString()}
        </h2>
      </div>
      <hr className='mt-3 border border-gray-500' />

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant='link'
              className='mt-4 w-12 border border-gray-500 hover:brightness-150 md:mt-6'
            >
              <Link {...postsLinkOptions}>
                <ArrowLeftIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side='right'
            align='center'
            sideOffset={4}
            className='bg-neutral-500 fill-neutral-500 duration-0'
          >
            <span>View all posts</span>
            <TooltipArrow width={15} height={10} className='duration-0' />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className='bg-elevated my-4 min-h-96 w-full rounded-2xl border border-gray-500 p-6 shadow md:my-6'>
        <p className='leading-relaxed whitespace-break-spaces'>
          {post.content ?? 'No content available.'}
        </p>
      </div>
    </div>
  )
}
