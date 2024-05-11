'use client'
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage"

const page = ({params}: any) => {
 
    return (
    <div>
        <CourseDetailsPage id={params.id}/>
    </div>
  )
}

export default page