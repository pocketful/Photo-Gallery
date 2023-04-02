import { useEffect, useRef } from 'react'

const useEffectAfterMounted = (cb, dependencies) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      return cb(dependencies)
    }
    mounted.current = true
  }, dependencies)
}

export default useEffectAfterMounted
