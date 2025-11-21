import { useState, useEffect } from 'react'

export default function useDebounce(
    value : string,
    delay : number
) {
  const [debouncedValue, setDebouncedValue] = useState(value) // State and setters for debounced value

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
