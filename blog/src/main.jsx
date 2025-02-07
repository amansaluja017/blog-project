import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/Store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AddPost, AllPosts, AuthLayout, EditPost, Home, LoginPage, Post, SignupPage } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      
      <Route index element={<Home />} />

      <Route path='/login' element={<LoginPage />} />

      <Route path='/signup' element={<SignupPage />} />

      <Route path='/allposts' element={
        <AuthLayout authentication={true}>
        
          <AllPosts />
        </AuthLayout>
      } />

      <Route path='/addpost' element={<AddPost />} />

      <Route path='/editpost/:slug' element={
        <AuthLayout authentication={true}>
          
          <EditPost />
        </AuthLayout>
      } />

      <Route path='/post' element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
