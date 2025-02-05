import { useState } from 'react'
import {useDispatch} from 'react-redux'
import Layout from './components/Layout/Layout'
import './App.css'
import { AuthService } from './appwrite/auth'
import { login, logOut } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  return (
    <>
      <Layout />
    </>
  )
}

export default App
