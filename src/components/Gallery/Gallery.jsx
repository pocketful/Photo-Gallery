import { useEffect, useState, useMemo } from 'react'
import { fetchData } from '../../api/fetchData'
import useEffectAfterMounted from '../../hooks/useEffectAfterMounted'
import debounceLeadingWithDelayCancel from '../../utilities/debounceLeadingCancel'
import CardList from '../Cards/CardList'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import style from './Gallery.module.scss'

const PER_PAGE = 20

const Gallery = () => {
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
    <section>
      {error && <Error>{error}</Error>}
      <h1 className={style.heading}>Photo Gallery</h1>
      <CardList data={photos} onToggleFavourite={toggleFavouriteHandler} favourites={favourites} />
      {loading && <Loader />}
    </section>
  )
}

export default Gallery
