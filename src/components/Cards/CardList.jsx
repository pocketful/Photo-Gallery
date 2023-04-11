import useToggleFavourite from '../../hooks/useToggleFavourite'
import Grid from '../UI/Grid/Grid'
import Card from './Card'
import PropTypes from 'prop-types'

const CardList = ({ data }) => {
  const { favourites, toggleFavourite } = useToggleFavourite()
  return (
    <Grid>
      {data.map((photo, idx) => {
        const isFavourite = favourites.includes(photo.id)
        return (
          <Card
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

export default CardList

CardList.propTypes = {
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
