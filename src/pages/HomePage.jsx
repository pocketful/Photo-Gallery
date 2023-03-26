import { useEffect, useRef, useState } from 'react'
// import jsonData from '../api/data'
import { apiKey, baseUrl } from '../api/config'
import style from './HomePage.module.scss'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [newPhotos, setNewPhotos] = useState(false)
  const isComponentMounted = useRef(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  console.log('favourites', favourites)
  const endpoint = `curated?page=${page}&per_page=20`

  const getPhotos = async () => {
    try {
      const resp = await fetch(`${baseUrl}/${endpoint}`, {
        headers: {
          Authorization: apiKey,
        },
      })
      const data = await resp.json()
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos])
      setNewPhotos(false)
      // setPhotos(jsonData)
      // setNewPhotos(false)
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

  // won't run on initial render
  useEffect(() => {
    if (!isComponentMounted.current) {
      isComponentMounted.current = true
      return
    }
    // chech before loading next page
    if (!newPhotos) return
    if (loading) return
    setPage((prevPage) => prevPage + 1)
    console.log('run')
  }, [newPhotos])

  // window.innerHeight - browser window height
  // window.scrollY - how much px have scrolled
  // document.body.scrollHeight - height of the doc, all loeaded pages

  // when at the end of the doc (3px sooner)
  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) {
      setNewPhotos(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const toggleFavourite = (photoId) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(photoId)
      const newFavourites = isFavourite
        ? prevFavourites.filter((favourite) => favourite !== photoId)
        : [...prevFavourites, photoId]
      localStorage.setItem('favourites', JSON.stringify(newFavourites))
      return newFavourites
    })
  }

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={style.grid}>
          {photos?.map((photo) => (
            <div className={style.card} key={photo.id}>
              <img
                src={photo.src.large}
                alt={photo.alt || `a photo by ${photo.photographer}`}
              ></img>
              <button
                className={favourites.includes(photo.id) ? `${style.favourite}` : ''}
                type="submit"
                onClick={() => toggleFavourite(photo.id)}
              >
                Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
