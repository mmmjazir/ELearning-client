'use client'
import { useEditCourseMutation, useGetSingleCourseQuery } from '@/redux/features/courses/courseApi';
import React, { FC, useEffect, useState } from 'react'
import CoursePreview from './CoursePreview';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseInformation from './CourseInformation';
import { formStyles } from '@/app/styles/styles';
import CourseContent from './CourseContent';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
 id: string
}

const EditCourse:FC<Props> = ({id}) => {
  const [editCourse,{isSuccess,isLoading,error}] = useEditCourseMutation();
  const {data}:any = useGetSingleCourseQuery({id},  { refetchOnMountOrArgChange: true });


useEffect(()=>{
 if(data){
  setCourseInfo({
    name: data.course.name,
    description: data.course.description,
    price: data.course.price,
    estimatedPrice: data.course.estimatedPrice,
    tags: data.course.tags,
    level: data.course.level,
    categories: data.course.categories,
    demoUrl: data.course.demoUrl,
    thumbnail: data.course.thumbnail.url,
  })
  setBenefits(data.course.benefits);
  setPrerequisites(data.course.prerequisites);
  setCourseContentData(data.course.courseData);
 }
},[data])


useEffect(()=>{
if(isSuccess){
  toast.success("Course Updated successfully");
  redirect("/admin/courses");
}
if (error) {
  if ("data" in error) {
    const errorMessage = error as any;
    toast.error(errorMessage.data.message);
  }
}
},[isSuccess,error])

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
   name: "",
   description: "",
   price: "",
   estimatedPrice: "",
   tags: "",
   level: "",
   categories:"",
   demoUrl: "",
   thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{title: ""}]);
  const [prerequisites, setPrerequisites] = useState([{title: ""}]);
  const [courseContentData, setCourseContentData] = useState([
   {
     videoUrl: "",
     title: "",
     description: "",
     videoSection: "Untitled Section",
     videoLength: "",
     links: [
       {
         title: "",
         url: "",
       },
     ],
     suggestion: "",
   },
 ]);

 const [courseData, setCourseData] = useState({});



const handleSubmit = async () => {
  // Format benefits array
  const formattedBenefits = benefits.map((benefit) => ({
    title: benefit.title,
  }));
  // Format prerequisites array
  const formattedPrerequisites = prerequisites.map((prerequisite) => ({
    title: prerequisite.title,
  }));

  // Format course content array
  const formattedCourseContentData = courseContentData.map(
    (courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      videoLength: courseContent.videoLength,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    })
  );

  //   prepare our data object
  const data = {
    name: courseInfo.name,
    description: courseInfo.description,
    categories: courseInfo.categories,
    price: courseInfo.price,
    estimatedPrice: courseInfo.estimatedPrice,
    tags: courseInfo.tags,
    thumbnail: courseInfo.thumbnail,
    level: courseInfo.level,
    demoUrl: courseInfo.demoUrl,
    totalVideos: courseContentData.length,
    benefits: formattedBenefits,
    prerequisites: formattedPrerequisites,
    courseData: formattedCourseContentData,
  };

  setCourseData(data);
};



const handleCourseCreate = async (e: any) => {
  console.log(courseData);
  const data = courseData;
  await editCourse({id,data});
};

  return (
    <div className='w-full flex'>
     
        <div className='w-[80%] mt-5'> 
        <h5 className={formStyles.title}>Create Course</h5>
         {
            active === 0 && (
                <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
                />
            )
         }

         {
            active === 1 && (
                <CourseData
                 benefits={benefits}
                 setBenefits={setBenefits}
                 prerequisites={prerequisites}
                 setPrerequisites={setPrerequisites}
                 active={active}
                 setActive={setActive}
                />
            )
         }

       {
            active === 2 && (
                <CourseContent
                 courseContentData={courseContentData}
                 setCourseContentData={setCourseContentData}
                 active={active}
                 setActive={setActive}
                 handleSubmit={handleSubmit}
                />
            )
         }

     {
            active === 3 && (
                <CoursePreview
                 courseData={courseData}
                 active={active}
                 setActive={setActive}
                 handleCourseCreate={handleCourseCreate}
                 isLoading={isLoading}
                 isEdit={true}
                />
            )
         }  
        </div>
        <div className="w-[20%] mt-32 fixed z-[-2] right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default EditCourse