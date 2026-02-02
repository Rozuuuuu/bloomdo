import { Link } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

export const Header = () => {
  const { user, logout } = useAuthStore()

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              MyApp
            </Link>
            <nav className="ml-10 space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button onClick={logout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}