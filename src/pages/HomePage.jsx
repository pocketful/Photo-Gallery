import { useEffect, useState } from 'react'
import { apiKey, baseUrl } from '../api/config'

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

  return <div>HomePage</div>
}

export default HomePage
