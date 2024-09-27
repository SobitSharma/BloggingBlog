import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Auth from './componets/AuthComponent/Auth.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './componets/Home/Home.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Auth flag={1}/>}></Route>
      <Route path='/login' element={<Auth flag={0}/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_domain}
    clientId={import.meta.env.VITE_clientId}
    authorizationParams={{
      redirect_uri:import.meta.env.VITE_REDIRECT_URL
      // redirect_uri:window.location.origin
    }}
  >
    <RouterProvider router={router}/>
  </Auth0Provider>
    
)
