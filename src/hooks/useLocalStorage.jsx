import { useState } from 'react'

const useLocalStorage = (storageKey, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(storageKey)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const updateStoredValue = (newValue) => {
    try {
      setStoredValue(newValue)
      window.localStorage.setItem(storageKey, JSON.stringify(newValue))
    } catch (error) {
      console.error(error)
    }
  }

  return { storedValue, updateStoredValue }
}

export default useLocalStorage
