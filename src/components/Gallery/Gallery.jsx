import { useEffect, useState } from 'react'
import { fetchData } from '../../api/fetchData'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
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
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const fetchMorePhotos = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const [setLoadMore] = useInfiniteScroll(fetchMorePhotos)

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
    setLoadMore(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [page])

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
