import { useState } from 'react'
import { fetchData } from '../api/fetchData'

const useLoadItems = (url, itemsArrName) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [error, setError] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    const result = await fetchData(url)
    if (result.error) {
      setError(result.error)
    } else {
      if (result.next_page) {
        setHasNextPage(true)
        setItems((prevItems) => [...prevItems, ...result[itemsArrName]])
      } else {
        setItems(result[itemsArrName])
      }
    }
    setLoading(false)
  }

  return { loading, items, hasNextPage, error, fetchItems }
}

export default useLoadItems
