import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Auth from "./pages/Auth"
import Cp from "./pages/Cp"
import Lead from "./pages/Lead"
import Projects from "./pages/Projects"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/cp" element={<Cp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/lead" element={<Lead />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
