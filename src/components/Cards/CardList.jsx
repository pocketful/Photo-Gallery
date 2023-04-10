import useToggleFavourite from '../../hooks/useToggleFavourite'
import Grid from '../UI/Grid/Grid'
import Card from './Card'

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
