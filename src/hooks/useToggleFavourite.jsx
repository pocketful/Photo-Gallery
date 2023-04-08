import { useState } from 'react'

const useToggleFavourite = () => {
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const toggleFavourite = (id) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(id)
      const newFavourites = isFavourite
        ? prevFavourites.filter((favourite) => favourite !== id)
        : [...prevFavourites, id]
      localStorage.setItem('favourites', JSON.stringify(newFavourites))
      return newFavourites
    })
  }

  return [favourites, toggleFavourite]
}

export default useToggleFavourite
