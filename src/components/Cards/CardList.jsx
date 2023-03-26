import Grid from '../UI/Grid/Grid'
import Card from './Card'

const CardList = ({ data, favourites, onToggleFavourite }) => {
  return (
    <Grid>
      {data.map((photo) => {
        const isFavourite = favourites.includes(photo.id)
        return (
          <Card
            key={photo.id}
            {...photo}
            onToggleFavourite={onToggleFavourite}
            isFavourite={isFavourite}
          />
        )
      })}
    </Grid>
  )
}

export default CardList
