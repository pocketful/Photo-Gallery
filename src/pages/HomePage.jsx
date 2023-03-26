import { useEffect, useState } from 'react'
import { apiKey, baseUrl } from '../api/config'
import style from './HomePage.module.scss'

const HomePage = () => {
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])

  const endpoint = 'curated?page=1&per_page=10'
  console.log('error: ', error)
  console.log('photos: ', photos)

  const getPhotos = async () => {
    try {
      const resp = await fetch(`${baseUrl}/${endpoint}`, {
        headers: {
          Authorization: apiKey,
        },
      })
      const data = await resp.json()
      setPhotos(data.photos)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    getPhotos()
  }, [])

  return (
    <div className="container">
      {photos.length === 0 && <p>Loading photos...</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={style.grid}>
          {photos?.map((image) => (
            <div className={style.card} key={image.id}>
              <img
                src={image.src.large}
                alt={image.alt || `a photo by ${image.photographer}`}
              ></img>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
