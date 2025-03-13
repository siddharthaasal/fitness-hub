import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
;
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./components/Dashboard"
  ;


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
