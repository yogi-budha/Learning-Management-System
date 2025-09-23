
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './pages/Login'
import Courses from './pages/student/Courses'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './components/MainLayout'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'




function App() {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:"/",
          element:(
            <>
            <HeroSection/>
            <Courses/>
            </>
          )

        },
        {
          path:'/mylearning',
          element:<MyLearning/>
        },
        {
          path:'/profile',
          element:<Profile/>
        }
        
      ],
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])

  return (
    <main >
      <RouterProvider router = {appRouter}/>
    </main>
  )
}

export default App
