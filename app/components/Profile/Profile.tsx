import React, { FC, useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import ProfileInfo from './ProfileInfo';
import CustomModal from '@/app/utils/CustomModal';
import EditName from './ModelForms/EditName';
import EditEmail from './ModelForms/EditEmail';
import EditAvatar from './ModelForms/EditAvatar';
import EditPassword from './ModelForms/EditPassword';
import CourseCard from '../Course/CourseCard';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { signOut, useSession } from 'next-auth/react';
import { useLogOutMutation } from '@/redux/features/auth/authApi';

interface Props {
    user : any;
}

const Profile:FC<Props> = ({user}) => {
 const [active, setActive] = useState(1);
 const [route,setRoute] = useState('')
 const [open, setOpen] = useState(false);
 const [courses, setCourses] = useState([]);
 const { data, isLoading } = useGetUsersAllCoursesQuery({search:"",category:""}, {});
 const [logOut] = useLogOutMutation();
 const{data:sessionData} = useSession();

 const logoutHandler = async()=> {
  
  setOpen(false)

  await logOut({});
  
  if(sessionData){
    await signOut();
  }
  
}

 useEffect(() => {
  if (data) {
    const filteredCourses = user.courses
      .map((userCourse: any) =>
        data.courses.find((course: any) => course._id === userCourse._id)
      )
      .filter((course: any) => course !== undefined);
    setCourses(filteredCourses);
  }
}, [data,user]);



  return (
    <div className='w-[85%] flex mx-auto'>
        <div className={`min-w-[60px] md:min-w-[310px] h-[450px] bg-slate-900/90 border rounded-[5px] border-[#ffffff1d] 
         shadow-sm mb-[80px] relative top-[80px] left-[30px]`}>
        <SideBarProfile
         user={user}
         active={active}
         setActive={setActive}
         logoutHandler={logoutHandler}
        />
     </div>
     {route === 'Edit-Avatar' && (
      <>
      {
      open && (
        <CustomModal
        open={open}
        setOpen={setOpen}
        component={EditAvatar}
        />
      )
      }
      </>
     )}
     {route === 'Edit-Name' && (
      <>
      {
      open && (
        <CustomModal
        open={open}
        setOpen={setOpen}
        component={EditName}
        />
      )
      }
      </>
     )}
   {route === 'Edit-Email' && (
      <>
      {
      open && (
        <CustomModal
        open={open}
        setOpen={setOpen}
        component={EditEmail}
        />
      )
      }
      </>
     )}
     {route === 'Edit-Password' && (
      <>
      {
      open && (
        <CustomModal
        open={open}
        setOpen={setOpen}
        component={EditPassword}
        />
      )
      }
      </>
     )}

     {
      active === 1 && (
        <div className="w-full max-md:ml-7 h-full bg-transparent relative top-[80px]">
        <ProfileInfo user={user} setRoute={setRoute} setOpen={setOpen} />
        </div>
      )
     }
  
  {active === 3 && (
        <div className="w-full ml-7 px-2 800px:px-10 800px:ml-8 mt-[80px]">
          <div className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0`}>
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile