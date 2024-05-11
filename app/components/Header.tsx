'use client'
import Link from 'next/link';
import React,{FC, useEffect, useState} from 'react'
import NavItems from '../utils/NavItems';
import {ThemeSwitcher} from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/assets/avatar.png'
import Skeleton from '@mui/material/Skeleton';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import ForgotPassword from './Auth/ForgotPassword';
import AcceptOtpReset from './Auth/AcceptOtpReset';
import PasswordForReset from './Auth/PasswordForReset';

interface Props {
 open: boolean;
 setOpen: (open:boolean) => void;
 activeItem: number;
 setRoute: (route:string) => void;
 route: string;
}

const Header:FC<Props> = ({open,setOpen,activeItem,setRoute,route}) => {
  const [openSidebar, setOpenSidebar] = useState({right:false});
  const { isLoading, refetch } = useLoadUserQuery(undefined,{});
  const {user} = useSelector((state:any) =>state.auth)
  const [modifiedUser, setModifiedUser] = useState<any>()

  const{data} = useSession();
  const [socialAuth, {isSuccess,error}] = useSocialAuthMutation();

  useEffect(() => {
   if(!isLoading){
   if(!user){
    if(data){
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image
      });
      refetch(); 
    }
   }
   
 }

  }, [data,isLoading])

  
  useEffect(()=>{
    
    if(isSuccess){
      toast.success("Login Successfully");
    }
  
  if(error){
    if("data" in error){
      const errorData = error as any ;
      toast.error(errorData.data.message);
    }
   }

   },[isSuccess,error])
   

  useEffect(()=>{
   setModifiedUser(user)
  },[user])
  

  type Anchor = 'right';
  const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSidebar({ ...openSidebar, [anchor]: open });
  };

//   const handleClose = (e:any)=>{
//   if(e.target.id === 'screen'){
//    setOpenSidebar(false)
//   }
//   }


  return (
   <div className='w-full relative mb-[80px]'>

    <div 
    className='bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'>
       <div className='w-full max-md:px-3 px-10 py-2 h-full'>
          <div className='w-full h-full flex items-center justify-between p-3'>
             <div>
              <Link href={'/'} className='text-2xl font-Poppins font-[500] text-black dark:text-white '>
                 Elearning
              </Link>
             </div>
             <div className='flex items-center'>
              <NavItems
               activeItem={activeItem}
               isMobile={false}
               setOpen={setOpen}
              />
              <ThemeSwitcher/>
              {/* only for mobile */}
              <div className='md:hidden'>
                 <HiOutlineMenuAlt3
                 size={25}
                 className='cursor-pointer dark:text-white text-black'
                 onClick={()=> setOpenSidebar({right:true})}
                 />
              </div>
            
              {isLoading && !modifiedUser ? (
                   <Skeleton className='dark:bg-white' variant="circular" width={25} height={25} />
              ) :  (   
                modifiedUser ? (
                <Link href="/profile">
                  <Image
                    src={modifiedUser.avatar ? modifiedUser.avatar.url : avatar}
                    alt=""
                    width={120}
                    height={120}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
                  />
                </Link>
              ) : (
               <HiOutlineUserCircle
                   size={25}
                   className="cursor-pointer hidden md:block dark:text-white text-black"
                   onClick={() => setOpen(true)}
                 />
              )
              )}
             </div>
          </div>
        
          {/* mobile sidebar */}

{(['right'] as const).map((anchor) => (
            <SwipeableDrawer
              key={anchor}
              anchor={anchor}
              open={openSidebar[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
              className='md:hidden'
              PaperProps={{
                className: 'w-[60%] rounded-l-xl bg-white dark:bg-slate-900 dark:bg-opacity-90 ',
              }}
            >
              <div className='w-full text-center text-black dark:text-white'>
                <NavItems activeItem={activeItem} setOpen={setOpen} isMobile={true} />
                
                <br />
                <br />
                <p className='text-[16px] px-3 pl-5 '>
                  Copyright © 2023 Elearning
                </p>
              </div>
            </SwipeableDrawer>
          ))}

       </div>
    </div>

   {
    route === 'Login' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={Login}
           refetch={refetch}
         />
        ) 
      }
      </>
    )  
   }
{
    route === 'Sign-Up' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={SignUp}
           refetch={refetch}
         />
        ) 
      }
      </>
    )  
   }

{
    route === 'Verification' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={Verification}
         />
        ) 
      }
      </>
    )  
   }

{
    route === 'Forgot-Password' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={ForgotPassword}
         />
        ) 
      }
      </>
    )  
   }

{
    route === 'Accept-Password-Otp' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={AcceptOtpReset}
         />
        ) 
      }
      </>
    )  
   }

{
    route === 'Password-For-Reset' && (
      <>
      {
        open && (
         <CustomModal 
           open={open}
           setOpen={setOpen}
           setRoute={setRoute}
           component={PasswordForReset}
         />
        ) 
      }
      </>
    )  
   }

    </div>
  )
}

export default Header