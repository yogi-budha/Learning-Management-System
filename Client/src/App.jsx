
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
import CourseForm from './pages/admin/CourseForm'
import CreateLecture from './pages/lecture/CreateLecture'
import EditLecture from './pages/lecture/EditLecture'




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
        {
          path:"dashboard/courses/createCourseForm/:id",
          element:<CourseForm/>
        },
        {
          path:"dashboard/courses/createCourseForm/:id/lecture",
          element:<CreateLecture/>
        },
        {
          path:"dashboard/courses/createCourseForm/:courseId/lecture/:lectureId",
          element:<EditLecture/>
        }
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
