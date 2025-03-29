import './App.css'
import { Routes, Route } from "react-router";
;
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from "./components/Dashboard";
import EditProfile from './components/EditProfile';
import HeroSection from './components/HeroSection';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/hero" element={<HeroSection />} />
      </Routes>
    </>
  )
}

export default App
