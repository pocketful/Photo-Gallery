import { useState, useEffect, useMemo } from 'react'
import debounceLeadingWithDelayCancel from '../utilities/debounceLeadingCancel'
import useEffectAfterMounted from './useEffectAfterMounted'

const useInfiniteScroll = (cb) => {
  const [loadMore, setLoadMore] = useState(false)

  const handleLoadMore = useMemo(
    () =>
      debounceLeadingWithDelayCancel(() => {
        setLoadMore(true)
      }, 250),
    [],
  )

  const handleScrollForLoadMore = () => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight
    if (scrolledToBottom) {
      handleLoadMore()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollForLoadMore)
    return () => window.removeEventListener('scroll', handleScrollForLoadMore)
  }, [])

  useEffectAfterMounted(() => {
    if (loadMore) {
      cb()
    }
  }, [loadMore])

  return [setLoadMore]
}

export default useInfiniteScroll
