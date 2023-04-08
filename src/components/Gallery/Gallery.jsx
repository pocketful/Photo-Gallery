import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useLoadItems from '../../hooks/useLoadItems'
import CardList from '../Cards/CardList'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import style from './Gallery.module.scss'

const PER_PAGE = 20

const Gallery = () => {
  const itemsFetchURL = `curated?per_page=${PER_PAGE}`

  const { loading, items, hasNextPage, error, loadMoreItems } = useLoadItems(
    itemsFetchURL,
    'photos',
  )

  useInfiniteScroll({ loading, hasNextPage, error, onLoadMore: loadMoreItems })

  return (
    <section>
      <h1 className={style.heading}>Photo Gallery</h1>
      {error && <Error>{error}</Error>}
      <CardList data={items} />
      {loading && <Loader />}
    </section>
  )
}

export default Gallery
