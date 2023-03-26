import { useEffect, useRef, useState } from 'react'
// import jsonData from '../api/data'
import { apiKey, baseUrl } from '../api/config'
import CardList from '../components/Cards/CardList'
import Container from '../components/UI/Container/Container'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [newPhotos, setNewPhotos] = useState(false)
  const isComponentMounted = useRef(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const endpoint = `curated?page=${page}&per_page=20`

  const getPhotos = async () => {
    try {
      const resp = await fetch(`${baseUrl}/${endpoint}`, {
        headers: {
          Authorization: apiKey,
        },
      })
      const data = await resp.json()
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos])
      // setPhotos(jsonData)
      setNewPhotos(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // refetch images when page changes
  useEffect(() => {
    getPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // won't run on initial render
  useEffect(() => {
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }
    // chech before loading next page
    if (!newPhotos) return
    if (loading) return
    setPage((prevPage) => prevPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPhotos])

  // window.innerHeight - browser window height
  // window.scrollY - how much px have scrolled
  // document.body.scrollHeight - height of the doc, all loeaded pages

  // when at the end of the doc (3px sooner)
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
      {loading && <p>Loading...</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <CardList
          data={photos}
          onToggleFavourite={toggleFavouriteHandler}
          favourites={favourites}
        />
      )}
    </Container>
  )
}

export default HomePage
