import { cn } from '@inu/ui/lib/utils'
import { GearIcon } from '@radix-ui/react-icons'

function Spinner({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn('inline-block animate-spin duration-500', className)}>
      <GearIcon />
    </div>
  )
}

export default Spinner
