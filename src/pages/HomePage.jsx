import { useEffect, useRef, useState } from 'react'
import CardList from '../components/Cards/CardList'
import Container from '../components/UI/Container/Container'
import Loader from '../components/UI/Loader/Loader'
import Error from '../components/UI/Error/Error'
import { fetchData } from '../api/fetchData'

const PER_PAGE = 20

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [loadNewPhotos, setLoadNewPhotos] = useState(false)
  const [page, setPage] = useState(200)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])
  const mounted = useRef(false)

  const getPhotos = async () => {
    setLoading(true)
    const result = await fetchData(`curated?page=${page}&per_page=${PER_PAGE}`)
    if (result.error) {
      setError(result.error)
    } else {
      setPhotos((prevPhotos) => [...prevPhotos, ...result.photos])
      setHasNextPage(result.next_page)
      setLoadNewPhotos(false)
    }
    setLoading(false)
  }

  // refetch images when page changes
  useEffect(() => {
    getPhotos()
  }, [page])

  // this won't run on initial render
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    // check before loading next page
    if (!loadNewPhotos) return
    if (!hasNextPage) return
    if (loading) return
    setPage((prevPage) => prevPage + 1)
  }, [loadNewPhotos])

  const loadNewPhotosOnScrollEnd = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) {
      setLoadNewPhotos(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', loadNewPhotosOnScrollEnd)
    return () => window.removeEventListener('scroll', loadNewPhotosOnScrollEnd)
  }, [])

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
