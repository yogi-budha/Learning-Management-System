
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Login } from './pages/Login'
import Courses from './pages/student/Courses'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './components/MainLayout'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Dashboard from './pages/admin/Dashboard'
import AdminSideBar from './pages/admin/Sidebar'
import CoursesTable from './pages/admin/CoursesTable'
import CreateCourses from './pages/admin/CreateCourses'




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
    },
    {
      path:"/admin",
      element:<AdminSideBar/>,
      children:[
        {
          path:"dashboard",
          element:<Dashboard/>
        },
        {
          path:"dashboard/courses",
          element:<CoursesTable/>
        },
        {
          path:"dashboard/createCourse",
          element:<CreateCourses/>
        },
      ]
    }
  ])

  return (
    <main >
      <RouterProvider router = {appRouter}/>
    </main>
  )
}

export default App
