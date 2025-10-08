import { MenuIcon, School2, School2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DarkMode } from './DarkMode'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import profilePic from "@/assets/profilePic.webp";
import logo from "@/assets/logo.png";

function Navbar() {
  const  navigate = useNavigate();
  const [logoutData,isSuccess,isError] = useLogoutUserMutation()
  
  const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    console.log(user)
    const logoutHandler = async()=>{
      await logoutData()
      navigate("/login")
      dispatch(userLoggedOut())
      
      toast.success("logout Successfully")
    }

    useEffect(()=>{

      if(isError){
        toast.error("error while logout")
      }
    },[isSuccess,isError,navigate])
  return (
    <div className='flex items-center justify-center  w-full h-20 fixed right-0 top-0 left-0 z-10 p-4 shadow-lg bg-white'>
        <div className='flex items-center gap-3  w-[70%] '>
            <Link to={"/"} className='flex gap-3'> 
            <img className='w-15' src={logo} alt="" />
            <h2 className='font-bold text-2xl'>E-Learning</h2></Link>
        </div>

        {user ? 
        
         <div className='flex items-center gap-10'>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar className={'w-12 h-12'}>
     
  <AvatarImage  src={`${user?.photoUrl || profilePic }`} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/mylearning">My learning</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
    {
      user.role == "instructor" && <>
          <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/admin/dashboard">Dashboard</Link>
          
          
        </DropdownMenuItem>
      </>
    }
      </DropdownMenuContent>
    </DropdownMenu>
    <div className="hidden md:block">
    <DarkMode />
    </div>
    <div className=" block md:hidden">
<MobileNavbar />
    </div>
        </div>  :
        <div className="gap-4 flex items-center justify-between">
 
  <Button className='bg-slate-700' onClick={()=> navigate("/login")} >Sign up</Button>
  <Button className={'bg-slate-500'} onClick={()=> navigate("/login") }>Login</Button>
</div>


      
}
    </div>
  )
}

import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  useLogoutUserMutation } from '@/features/api/authApi'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {  useSelector } from 'react-redux'
import { userLoggedOut } from '@/features/authSlice'

export function MobileNavbar() {
    const role = 'instructor'
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
            <MenuIcon className='w-6 h-6'/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <School2/>
          </SheetTitle>
          
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-4 px-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sheet-demo-name text-xl font-bold">E-Learning</Label>
            <DarkMode/>
          </div>
          <div className="grid gap-3">
            <p>My learning</p>
            <p>Edit Profile</p>
            <p>Logout</p>
          </div>
        </div>
        <SheetFooter>
            {
                role == "instructor" ? <Button type="submit">Dashboard</Button> : "" 
            }
          
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


export default Navbar