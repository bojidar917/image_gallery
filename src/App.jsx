import { useState } from 'react'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Signin from './pages/Signin'
import { AuthContext } from './context/AuthContext'
import Protected from './pages/Protected'
import AuthProvider from './context/AuthContext'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Protected> <Home /> </Protected>
    },
    {
      path: "/signin",
      element: <Signin></Signin>
    },
    {
      path: "/signup",
      element: <Signup></Signup>
    }

  ])

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  )
}

export default App
