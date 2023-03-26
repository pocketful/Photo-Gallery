export const baseUrl = import.meta.env.VITE_PEXELS_BASE_URL
if (!baseUrl) throw new Error('baseUrl not found')

export const apiKey = import.meta.env.VITE_PEXELS_API_KEY
if (!apiKey) throw new Error('apiKey not found')
