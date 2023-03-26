import Button from '../UI/Button/Button'
import style from './Card.module.scss'

const Card = ({ alt, id, photographer, src, url, onToggleFavourite, isFavourite }) => {
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
      <img src={src.large} alt={alt || `a photo by ${photographer}`}></img>
    </article>
  )
}

export default Card
