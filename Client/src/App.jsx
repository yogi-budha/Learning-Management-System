
import Navbar from './components/Navbar'
import { Login } from './pages/Login'
import Courses from './pages/student/Courses'
import HeroSection from './pages/student/HeroSection'


function App() {

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Courses/>
     {/* <Login/> */}
    </>
  )
}

export default App
