import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // This will be replaced with actual API call
        const mockUser = { id: '1', email, name: 'John Doe' }
        const mockToken = 'mock-jwt-token'
        
        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        })
        
        localStorage.setItem('token', mockToken)
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        localStorage.removeItem('token')
      },
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'auth-storage',
    }
  )
)