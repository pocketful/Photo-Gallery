import { apiKey, baseUrl } from './config'

export const fetchData = async (endpoint, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: apiKey,
  }
  const options = { method, headers }

  try {
    const resp = await fetch(url, options)
    if (resp.ok) {
      return resp.json()
    }
    const errorMessage = `Request failed with status code: ${resp.status}`
    return { error: errorMessage }
  } catch (error) {
    return { error: error.message }
  }
}
