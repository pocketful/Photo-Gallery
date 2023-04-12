import PropTypes from 'prop-types'
import Button from '../../UI/Button/Button'
import style from './PhotoCard.module.scss'

const PhotoCard = ({ id, src, photographer, url, alt, onToggleFavourite, isFavourite }) => {
  return (
    <article className={style.card}>
      <div className={style.content}>
        <h2 className={style.description}>
          {url.split('/')[4].split('-').slice(0, -1).join(' ') || alt || 'Amazing world'}
        </h2>
        <p className={style.photographer}>{photographer}</p>
        <Button onClick={() => onToggleFavourite(id)} isFavourite={isFavourite}>
          Favourite
        </Button>
      </div>
      <img src={src} className={style.photo} alt={alt || `a photo by ${photographer}`}></img>
    </article>
  )
}

export default PhotoCard

PhotoCard.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  photographer: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onToggleFavourite: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
}
