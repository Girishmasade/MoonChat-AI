import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Commondashboard/Dashboard'
import UserLogin from './pages/Auth/UserLogin'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/dashboard"}/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<UserLogin/>}/>
      </Routes>
    </Router>
  )
}

export default App
