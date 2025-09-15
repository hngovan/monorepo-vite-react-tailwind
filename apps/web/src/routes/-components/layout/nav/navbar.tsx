import { Link } from '@tanstack/react-router'

const activeClassName = 'underline decoration-2 opacity-70'

export function Navbar() {
  return (
    <div className='flex gap-x-4'>
      <Link
        to='/'
        activeProps={{ className: activeClassName }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
    </div>
  )
}
