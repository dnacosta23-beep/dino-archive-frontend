import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const DinosaurContext = createContext()

const API_URL = 'http://127.0.0.1:5000'

export function DinosaurProvider({ children }) {
  const [dinosaurs, setDinosaurs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchDinosaurs() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_URL}/dinosaurs`)

      if (!response.ok) {
        throw new Error('The dinosaur records could not be loaded.')
      }

      const data = await response.json()
      setDinosaurs(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function createDinosaur(formData) {
    const response = await fetch(`${API_URL}/dinosaurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'The dinosaur could not be created.')
    }

    setDinosaurs((currentDinosaurs) =>
      [...currentDinosaurs, data].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    )

    return data
  }

  useEffect(() => {
    fetchDinosaurs()
  }, [])

  const contextValue = {
    dinosaurs,
    loading,
    error,
    createDinosaur,
    fetchDinosaurs,
  }

  return (
    <DinosaurContext.Provider value={contextValue}>
      {children}
    </DinosaurContext.Provider>
  )
}

export function useDinosaurs() {
  const context = useContext(DinosaurContext)

  if (!context) {
    throw new Error(
      'useDinosaurs must be used inside a DinosaurProvider.'
    )
  }

  return context
}