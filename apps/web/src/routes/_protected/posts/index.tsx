import { Button } from '@inu/ui/components/button'
import { Input } from '@inu/ui/components/input'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider
} from '@inu/ui/components/tooltip'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  stripSearchParams,
  type SearchSchemaInput
} from '@tanstack/react-router'
import { Link, useNavigate } from '@tanstack/react-router'
import * as v from 'valibot'
import type { RouterOutput } from '@inu/api/client'
import { apiClient } from '@/clients/apiClient'
import { queryClient } from '@/clients/queryClient'
import CreatePostButton from '@/routes/_protected/posts/-components/create-post'
import DeletePostButton from '@/routes/_protected/posts/-components/delete-post'
import {
  postsSearchDefaults,
  postsSearchSchema,
  type PostSearchSchema
} from '@/routes/_protected/posts/-validations/posts-link-options'

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(apiClient.posts.all.queryOptions()),
  component: RouteComponent,
  validateSearch: (input: SearchSchemaInput) =>
    v.parse(postsSearchSchema, input),
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)]
  },
  errorComponent: ({ error }) => {
    return (
      <div className='flex w-full flex-col items-center gap-y-3'>
        <div>{error.message}</div>
      </div>
    )
  }
})

function PostItem({
  post,
  disabled
}: Readonly<{
  post: RouterOutput['posts']['all'][number]
  disabled: boolean
}>) {
  return (
    <Link
      to='/posts/$postid'
      params={{ postid: post.id }}
      className='bg-elevated flex w-full items-center justify-between gap-3 rounded-xl border border-gray-500 p-4 hover:brightness-90'
      disabled={disabled}
    >
      <div className='flex flex-col gap-y-1'>
        <div className='line-clamp-3 text-lg font-bold wrap-anywhere'>
          {post.title}
        </div>
        <div className='text-sm italic'>
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      <DeletePostButton postId={post.id}>
        <TrashIcon />
      </DeletePostButton>
    </Link>
  )
}

function RouteComponent() {
  const { data: posts, isPending } = useQuery(
    apiClient.posts.all.queryOptions()
  )
  const navigate = useNavigate({ from: Route.fullPath })
  const search = Route.useSearch()

  const updateFilters = (name: keyof PostSearchSchema, value: unknown) => {
    navigate({ search: prev => ({ ...prev, [name]: value }) })
  }

  /**
   * You could memoize posts, although if you use the react 19 compiler
   * (which RT-stack will in the future), it won't be necessary.
   */
  const lowercaseSearch = search.searchString.toLowerCase()
  const filteredPost = posts
    ?.filter(p => p.title.toLowerCase().includes(lowercaseSearch))
    ?.sort((a, b) =>
      search.sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col p-1.5 md:p-4'>
      <div className='flex items-center justify-between border'>
        <h1 className='text-2xl'>Posts</h1>
        <CreatePostButton />
      </div>
      <hr className='mt-4 border-b-2 border-gray-400' />

      <div className='relative mt-4 flex items-center justify-end gap-x-2'>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild onClick={e => e.preventDefault()}>
              <Button
                variant='link'
                className='border-input w-12 border hover:brightness-150'
                onClick={() =>
                  updateFilters(
                    'sortDirection',
                    search.sortDirection === 'asc' ? 'desc' : 'asc'
                  )
                }
              >
                {search.sortDirection === 'asc' ? (
                  <ArrowUpIcon />
                ) : (
                  <ArrowDownIcon />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side='top'
              align='center'
              sideOffset={4}
              onPointerDownOutside={e => e.preventDefault()}
              className='bg-neutral-500 fill-neutral-500 duration-0'
            >
              <span>Sort by created date ({search.sortDirection})</span>
              <TooltipArrow width={15} height={10} className='duration-0' />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className='relative w-full sm:max-w-64'>
          <Input
            value={search.searchString}
            onChange={e => updateFilters('searchString', e.target.value)}
            placeholder='Search by title...'
            className='peer w-full pr-10 placeholder:italic'
          />
          <MagnifyingGlassIcon className='text-input peer-focus:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors' />
        </div>
      </div>

      <div className='my-4 flex flex-wrap gap-x-3 gap-y-3 md:my-6'>
        {filteredPost?.length
          ? filteredPost.map(p => (
              <PostItem key={p.id} post={p} disabled={isPending} />
            ))
          : 'There are no posts available.'}
      </div>
    </div>
  )
}
