import { useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import { AuthService } from './appwrite/auth'
import { login, logOut } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  return (
    <>
      <div>Hello</div>
    </>
  )
}

export default App
