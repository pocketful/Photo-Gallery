import { useEffect, useRef, useState } from 'react'
import CardList from '../components/Cards/CardList'
import Container from '../components/UI/Container/Container'
import Loader from '../components/UI/Loader/Loader'
import Error from '../components/UI/Error/Error'
import { fetchData } from '../api/fetchData'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [newPhotos, setNewPhotos] = useState(false)
  const isComponentMounted = useRef(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const getPhotos = async () => {
    setIsLoading(true)
    const result = await fetchData(`curated?page=${page}&per_page=20`)
    if (result.error) {
      setError(result.error)
    } else {
      setPhotos((prevPhotos) => [...prevPhotos, ...result.photos])
      setNewPhotos(false)
    }
    setIsLoading(false)
  }

  // refetch images when page changes
  useEffect(() => {
    getPhotos()
  }, [page])

  // this won't run on initial render
  useEffect(() => {
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }

    // check before loading next page
    if (!newPhotos) return
    if (isLoading) return
    setPage((prevPage) => prevPage + 1)
  }, [newPhotos])

  // detect when the user has scrolled to the end of the page and set a flag to load new photos
  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) {
      setNewPhotos(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
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
      {error ? (
        <Error>{error}</Error>
      ) : (
        <CardList
          data={photos}
          onToggleFavourite={toggleFavouriteHandler}
          favourites={favourites}
        />
      )}
      {isLoading && <Loader />}
    </Container>
  )
}

export default HomePage
