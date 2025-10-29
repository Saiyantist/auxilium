import { useState } from 'react'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'

function App() {
  return (
    <AppLayout>
      <Home />
    </AppLayout>
  )
}

export default App
