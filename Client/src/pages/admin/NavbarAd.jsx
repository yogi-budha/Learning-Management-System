import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Settings, ChevronDown, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function NavbarAd({name,isSearch=true,isFilter=true,isCreateCourses=true}) {
  return (
    <div className="flex justify-between items-center w-[95%] mx-auto   px-15 rounded-xl shadow-sm py-2 bg-white mb-10 ">
      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold text-[#2d2a6e]">{name}</h2>
       {isSearch && <div className="mt-4 flex items-center bg-white rounded-full px-4 py-2 w-64 shadow-sm">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Input
            type="text"
            placeholder="Search here..."
            className="border-0 focus-visible:ring-0 text-sm text-gray-600"
          />
        </div>}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {/* Icons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-semibold text-sm text-gray-800">Nabila A.</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Nabila" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">

            {
                isFilter &&  <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-1 rounded-full border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <span>Newest</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            {isFilter &&  <DropdownMenuItem>Newest</DropdownMenuItem>}
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Z-A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            }
         

          <Link to="/admin/dashboard/createCourse">{
            isCreateCourses &&  <Button className="flex items-center space-x-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </Button>
          }
   
          </Link>

        </div>
      </div>
    </div>
  )
}
