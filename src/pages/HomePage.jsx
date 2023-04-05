import { useEffect, useState, useMemo } from 'react'
import CardList from '../components/Cards/CardList'
import Container from '../components/UI/Container/Container'
import Loader from '../components/UI/Loader/Loader'
import Error from '../components/UI/Error/Error'
import { fetchData } from '../api/fetchData'
import useEffectAfterMounted from '../hooks/useEffectAfterMounted'
import debounceLeadingCancel from '../utilities/debounceLeadingCancel'

const PER_PAGE = 20

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const fetchPhotos = async () => {
    setLoading(true)
    const result = await fetchData(`curated?page=${page}&per_page=${PER_PAGE}`)
    if (result.error) {
      setError(result.error)
    } else {
      if (result.next_page) {
        setHasNextPage(true)
        setPhotos((prevPhotos) => [...prevPhotos, ...result.photos])
      } else {
        setPhotos(result.photos)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [page])

  const handleLoadMore = useMemo(
    () =>
      debounceLeadingCancel(() => {
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
    if (!loadMore || !hasNextPage || loading) return
    setPage((prevPage) => prevPage + 1)
    setLoadMore(false)
  }, [loadMore])

  const toggleFavouriteHandler = (photoId) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(photoId)
      const newFavourites = isFavourite
        ? prevFavourites.filter((favourite) => favourite !== photoId)
        : [...prevFavourites, photoId]
      localStorage.setItem('favourites', JSON.stringify(newFavourites))
      return newFavourites
    })
  }

  return (
    <Container>
      {error && <Error>{error}</Error>}
      {loading && <Loader />}
      <CardList data={photos} onToggleFavourite={toggleFavouriteHandler} favourites={favourites} />
    </Container>
  )
}

export default HomePage
