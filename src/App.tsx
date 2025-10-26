import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './NavBar'
import Results from './pages/Results'
import About from './pages/About'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
