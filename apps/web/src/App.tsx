import { Button } from '@inu/ui/components/button'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <Button
        variant='destructive'
        onClick={() => setCount(count => count + 1)}
      >
        count is {count}
      </Button>
      <Button variant='outline' onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <Button variant='ghost' onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <Button variant='link' onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <Button asChild>
        <a href='https://example.com'>Đi tới ví dụ</a>
      </Button>
    </>
  )
}

export default App
