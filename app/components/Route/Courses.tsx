import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/courseApi'
import React, { useEffect, useState } from 'react'
import CourseCard from '../Course/CourseCard'
import { Card, CardContent, CardHeader, IconButton, Skeleton } from '@mui/material'

type Props = {}

const Courses = (props: Props) => {
  const {data, isLoading} = useGetUsersAllCoursesQuery({search:"",category:""}, {refetchOnMountOrArgChange:true})
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      
        <div className={`w-[90%] md:w-[80%] m-auto`}>
            <h1 className='text-center font-Poppins text-[25px] sm:text-3xl lg:text-4xl dark:text-white md:!leading-[60px] text-[#000] font-[700] tracking-tight'>
                Expand Your Career {""}
                <span className='text-gradient'>Opportunity</span> <br />
                Opportunity With Our Courses
            </h1>
            <br />
            <br />

  {isLoading ? (
            <div className='flex'>
            <Card className="
            w-full h-[46vh] dark:bg-slate-500 dark:bg-opacity-20 
            backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]
            dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner " sx={{ maxWidth: 485, m: 2 }}>
           
            {
              <Skeleton className='mt-[1vh]' sx={{ height: 250 }} animation="wave" variant="rectangular" />
            }
            <CardContent>
              {
                <React.Fragment>
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                  <Skeleton animation="wave" height={40} style={{ marginBottom: 0 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
             }
            </CardContent>
          </Card>
          <Card className="
            w-full h-[46vh] dark:bg-slate-500 dark:bg-opacity-20 
            backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]
            dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner " sx={{ maxWidth: 485, m: 2 }}>
           
            {
              <Skeleton className='mt-[1vh]' sx={{ height: 250 }} animation="wave" variant="rectangular" />
            }
            <CardContent>
              {
                <React.Fragment>
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                  <Skeleton animation="wave" height={40} style={{ marginBottom: 0 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
             }
            </CardContent>
          </Card>

          <Card className="
            w-full h-[46vh] dark:bg-slate-500 dark:bg-opacity-20 
            backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]
            dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner " sx={{ maxWidth: 485, m: 2 }}>
           
            {
              <Skeleton className='mt-[1vh]' sx={{ height: 250 }} animation="wave" variant="rectangular" />
            }
            <CardContent>
              {
                <React.Fragment>
                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                  <Skeleton animation="wave" height={40} style={{ marginBottom: 0 }} />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
             }
            </CardContent>
          </Card>

</div>
        ) : (
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] 2xl:gap-[35px] mb-12 border-0'>
                {
                    courses && 
                    courses.map((item:any, index:number) => (
                        <CourseCard item={item} key={index} />
                    ))
                }
            </div>
         )}

        </div>
  
    </div>
  )
}

export default Courses