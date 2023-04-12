import PropTypes from 'prop-types'
import useToggleFavourite from '../../../hooks/useToggleFavourite'
import Grid from '../../UI/Grid/Grid'
import PhotoCard from '../PhotoCard/PhotoCard'

const PhotoCardList = ({ data }) => {
  const { favourites, toggleFavourite } = useToggleFavourite()
  return (
    <Grid>
      {data.map((photo, idx) => {
        const isFavourite = favourites.includes(photo.id)
        return (
          <PhotoCard
            key={idx}
            {...photo}
            onToggleFavourite={toggleFavourite}
            isFavourite={isFavourite}
          />
        )
      })}
    </Grid>
  )
}

export default PhotoCardList

PhotoCardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      photographer: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ),
}
