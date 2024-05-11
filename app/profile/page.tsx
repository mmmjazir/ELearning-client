'use client'
import React from 'react'
import Heading from '../utils/Heading'
import Protected from '../hooks/useProtected'
import { useSelector } from 'react-redux'
import Profile from '../components/Profile/Profile'



const Page = () => {
  
  const {user} = useSelector((state:any) => state.auth)

  return (
    <div className="min-h-screen">
        <Heading
          title={`${user?.name} profile - Elearning`}
          description="ELearning is a platform for students to learn and get help from teachers" 
          keywords="Programming,MERN,Redux,Machine Learning" 
         />
         <Profile
         user={user}
         />
     
    </div>
  )
}

export default Page