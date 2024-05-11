import EditCourse from '@/app/components/Admin/Course/EditCourse';
import React from 'react'


const page = ({params}:any) => {
  const id = params.id;

    return (
    <>
    <EditCourse id={id} />
    </>
  )
}

export default page