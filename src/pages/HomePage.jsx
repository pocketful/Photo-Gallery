import { useEffect, useState } from 'react'
import { apiKey, baseUrl } from '../api/config'
import style from './HomePage.module.scss'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  const endpoint = `curated?page=${page}&per_page=20`

  const getPhotos = async () => {
    setLoading(true)
    try {
      const resp = await fetch(`${baseUrl}/${endpoint}`, {
        headers: {
          Authorization: apiKey,
        },
      })
      const data = await resp.json()
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // refetch images when page changes
  useEffect(() => {
    getPhotos()
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // window.innerHeight - browser window height
      // window.scrollY - how much px have scrolled
      // document.body.scrollHeight - height of the doc, all loeaded pages

      // when at the end of the doc (3px sooner), load next page, but dont fetch if i'm already loading
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) {
        setPage((prevPage) => prevPage + 1)
      }
    })
    return () => window.removeEventListener('scroll', event)
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
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default HomePage
