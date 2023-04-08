import { useEffect, useMemo } from 'react'
import debounceLeadingWithDelayCancel from '../utilities/debounceLeadingCancel'

const useInfiniteScroll = ({ loading, hasNextPage, error, onLoadMore }) => {
  const handleLoadMore = useMemo(
    () =>
      debounceLeadingWithDelayCancel(() => {
        onLoadMore()
      }, 250),
    [],
  )

  const handleScrollForLoadMore = () => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight
    if (scrolledToBottom && hasNextPage && !loading && !error) {
      handleLoadMore()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollForLoadMore)
    return () => window.removeEventListener('scroll', handleScrollForLoadMore)
  }, [])
}

export default useInfiniteScroll
