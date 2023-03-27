import { useState, useCallback } from 'react'

export const useAuth = () => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token')
    return storedToken ? storedToken : null
  })

  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId')
    return storedUserId ? storedUserId : null
  })

  const login = useCallback((token, id) => {
    if (!token) return

    setToken(token)
    setUserId(id)

    localStorage.setItem('token', token)
    localStorage.setItem('userId', id)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }, [])

  return { login, logout, token, userId }
}
