import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({children}) => {
  const {token, user} = useSelector((state) => state.auth)

  if (!token || user?.isAdmin !== true) {
    return <Navigate to="/admin-signin" />;
  }
  return (
    <>
      {children}
    </>
  )
}

export default AdminProtectedRoute
