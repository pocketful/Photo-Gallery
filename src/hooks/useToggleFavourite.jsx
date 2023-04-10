import useLocalStorage from './useLocalStorage'

const useToggleFavourite = () => {
  const { storedValue: favourites, updateStoredValue } = useLocalStorage('favourites', [])

  const toggleFavourite = (id) => {
    const isFavourite = favourites.includes(id)

    const newFavourites = isFavourite
      ? favourites.filter((favourite) => favourite !== id)
      : [...favourites, id]
    updateStoredValue(newFavourites)
  }

  return { favourites, toggleFavourite }
}

export default useToggleFavourite
