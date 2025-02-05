import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import Layout from './components/Layout/Layout'
import './App.css'
import authService from './appwrite/auth'
import { Login, LogOut } from './store/AuthSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(Login({userData}))
      }else {
        dispatch(LogOut())
      }
    })
    .finally(() => setLoading(false))
  },[]);


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Layout />
      </div>
    </div>
  ) : null
}

export default App         