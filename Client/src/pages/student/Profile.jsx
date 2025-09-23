import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import MyLearning from './MyLearning'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useGetUserQuery } from '@/features/api/authApi'

function Profile() {

  const {data,isLoading} = useGetUserQuery()
  console.log(data)

  return (
    <div className='w-full min-h-screen mt-24 flex flex-col items-center '>
        <div className='w-[80%]'>
            <p className='text-2xl font-bold tracking-wider'>PROFILE </p>
            <div className='flex gap-10  items-center pt-6'>
                <Avatar className='mt-10 w-32 h-32 rounded-full  '>
  <AvatarImage className='' src={`${data?.user?.photourl ||"https://github.com/shadcn.png" }`} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<div className='flex flex-col gap-4'>
  <div>
      <p className='font-semibold text-lg '>Name: <span  className='font-light text-slate-900'>{data?.user?.name}</span></p>
  <p  className='font-semibold text-lg '>Email: <span  className='font-light text-slate-900'>{data?.user?.email}</span></p>
  <p  className='font-semibold text-lg '>Role: <span  className='font-light text-slate-900'>{data?.user?.role}</span></p>
  </div>

  
  <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button >Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder = "eg:yogesh" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Email</Label>
              <Input id="username-1" name="username" placeholder="eg:yogi@gmail.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
</div>

            </div>

           <MyLearning/>
          
        </div>

    </div>
  )
}

export default Profile