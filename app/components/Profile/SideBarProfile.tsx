import Image from 'next/image';
import React, { FC, useState } from 'react'
import avatarDefault from '../../../public/assets/avatar.png'
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { signOut, useSession } from 'next-auth/react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';
import toast from 'react-hot-toast';


interface Props {
    user: any;
    active: number;
    setActive: (active:number) => void;
    logoutHandler: any;
}

const SideBarProfile:FC<Props> = ({user,active,setActive,logoutHandler}) => {
  const [open,setOpen] = useState(false)


  return (
    <div className='w-full'>
     <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 && !open ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user?.avatar ? user?.avatar.url : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 && !open ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black "  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 && !open ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      {user.role === 'admin' && (
      <Link href={'/admin'}>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 && !open ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(4)}
      >
        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Admin dashboard
        </h5>
      </div>
      </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          open ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        } `}
        onClick={() => setOpen(true)}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
        
      </div>
      <Dialog
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(false)}>Cancel</Button>
          <Button onClick={logoutHandler}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SideBarProfile