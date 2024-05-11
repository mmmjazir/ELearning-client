import Image from 'next/image';
import React, { FC, useEffect } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from '../../../public/assets/avatar.png'
import { formStyles } from '@/app/styles/styles';;

interface Props {
    user:any;
    setRoute:(route:string) => void;
    setOpen:(open:boolean) => void;
}

const ProfileInfo:FC<Props> = ({user,setRoute,setOpen}) => {
const editRoute = (route:string)=>{
  setOpen(true);
  setRoute(route)
}

  return (
    <>
    <div className="w-full flex justify-center">
      <div className="relative">
        <Image
          src={user?.avatar ? user?.avatar?.url : avatarIcon}
          alt=""
          width={120}
          height={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
        />
       
          <div onClick={()=> editRoute('Edit-Avatar')} className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="z-1" />
          </div>
    
      </div>
    </div>
    <br />
    <br />
    <div className="w-full pl-6 md:pl-10">
      <form >
        <div className="md:w-[50%] m-auto block pb-4">
          <div className="w-[100%]">
            <label className="block pb-2">Full Name</label>
           <div className='flex items-center gap-2'>
            <input
              type="text"
              className={`${formStyles.input} !w-[95%] mb-4 800px:mb-0`}
              readOnly
              value={user?.name}
            />
            <p className='cursor-pointer text-red-400' onClick={()=> editRoute('Edit-Name')}>edit</p>
            </div>
          </div>
          <div className="w-[100%] pt-4">
            <label className="block pb-2">Email Address</label>
            <div className='flex items-center gap-2'>
            <input
              type="text"
              readOnly
              className={`${formStyles.input} !w-[95%] mb-1 800px:mb-0`}
              value={user?.email}
            />
             <p className='cursor-pointer text-red-400' onClick={()=> editRoute('Edit-Email')}>edit</p>
          </div>
          </div>
          <div className="w-[100%] pt-4">
            <label className="block pb-2">Password</label>
            <div className='flex items-center gap-2'>
            <input
              type="password"
              readOnly
              className={`${formStyles.input} !w-[95%] mb-1 800px:mb-0`}
              value='........'
            />
             <p className='cursor-pointer text-red-400' onClick={()=> editRoute('Edit-Password')}>edit</p>
          </div>
          </div>
        </div>
      </form>
      <br />
    </div>
  </>
  )
}

export default ProfileInfo