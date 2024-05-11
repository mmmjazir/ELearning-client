'use client'
import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux';

type Props = {
    params:any;
}

const Page:FC<Props> = ({params}) => {

  const id = params.id;
  const {user} = useSelector((state:any) => state.auth);

  const {isLoading,error} = useLoadUserQuery(undefined,{});

  useEffect(()=>{
   if(user){
    const isPurchased = user.courses.find((item:any)=> item._id === id);
    if(!isPurchased){
        redirect('/');
    }
    if(error){
        redirect('/')
    }
   }
  }, [user,error])

  return (
    <>
    {isLoading ? (
        <Loader/>
    ) : (
       <div>
        <CourseContent id={id} user={user}/>
       </div> 
    ) }
    </>
  )
}

export default Page