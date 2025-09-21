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

function Navbar() {
    const user = true
  return (
    <div className='flex items-center justify-center  w-full h-16 fixed right-0 top-0 left-0 z-10 p-4 shadow-lg'>
        <div className='flex items-center gap-3  w-[70%] '>
             <School2 className='w-8 h-8'/>
        <h2 className='font-bold text-2xl'>E-Learning</h2>
        </div>

        {user ? 
        
         <div className='flex items-center gap-10'>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            My learning
          </DropdownMenuItem>
          <DropdownMenuItem>
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Dashboard
        </DropdownMenuItem>
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
 
  <Button className='bg-slate-700'>Sign up</Button>
  <Button className={'bg-slate-500'}>Login</Button>
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