import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useLoadItems from '../../hooks/useLoadItems'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import PhotoCardList from './PhotoCardList/PhotoCardList'

const PER_PAGE = 20

const Gallery = () => {
  const itemsFetchURL = `curated?per_page=${PER_PAGE}`

  const mapPhotos = (fetchResult) => {
    return fetchResult.photos.map((photo) => ({
      id: photo.id,
      src: photo.src.medium,
      photographer: photo.photographer,
      url: photo.url,
      alt: photo.alt,
    }))
  }

  const { loading, items, hasNextPage, error, loadMoreItems } = useLoadItems(
    itemsFetchURL,
    mapPhotos,
  )

  useInfiniteScroll({ loading, hasNextPage, error, onLoadMore: loadMoreItems })

  return (
    <section>
      {error && <Error>{error}</Error>}
      <PhotoCardList data={items} />
      {loading && <Loader />}
    </section>
  )
}

export default Gallery
