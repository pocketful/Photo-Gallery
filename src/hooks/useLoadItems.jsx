import { useEffect, useState } from 'react'
import { fetchData } from '../api/fetchData'

const useLoadItems = (url, mapItems) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  const fetchItems = async () => {
    setLoading(true)
    const result = await fetchData(`${url}&page=${page}`)
    const mappedItems = mapItems(result)
    if (result.error) {
      setError(result.error)
    } else {
      if (result.next_page) {
        setItems((prevItems) => {
          const existingIds = prevItems.map((item) => item.id)
          const uniqueNewItems = mappedItems.filter((item) => !existingIds.includes(item.id))
          return [...prevItems, ...uniqueNewItems]
        })
      } else {
        setHasNextPage(false)
        setItems(mappedItems)
      }
    }
    setLoading(false)
  }

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    fetchItems()
  }, [page])

  return { loading, items, hasNextPage, error, loadMoreItems }
}

export default useLoadItems
