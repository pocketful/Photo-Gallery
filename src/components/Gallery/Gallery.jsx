import { useEffect, useState } from 'react'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useLoadItems from '../../hooks/useLoadItems'
import CardList from '../Cards/CardList'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import style from './Gallery.module.scss'

const PER_PAGE = 20

const Gallery = () => {
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])
  const [page, setPage] = useState(1)

  const itemsFetchURL = `curated?page=${page}&per_page=${PER_PAGE}`

  const { loading, items, hasNextPage, error, fetchItems } = useLoadItems(itemsFetchURL, 'photos')

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    fetchItems()
  }, [page])

  useInfiniteScroll({ loading, hasNextPage, error, onLoadMore: loadMoreItems })

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
      <h1 className={style.heading}>Photo Gallery</h1>
      {error && <Error>{error}</Error>}
      <CardList data={items} onToggleFavourite={toggleFavouriteHandler} favourites={favourites} />
      {loading && <Loader />}
    </section>
  )
}

export default Gallery
