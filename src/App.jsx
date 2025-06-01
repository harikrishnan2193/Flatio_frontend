import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Auth from "./pages/Auth"
import Cp from "./pages/Cp"
import Lead from "./pages/Lead"
import Projects from "./pages/Projects"

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/cp" element={<Cp />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/lead" element={<Lead />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
