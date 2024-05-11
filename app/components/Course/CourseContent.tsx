import { useGetCourseContentQuery } from '@/redux/features/courses/courseApi';
import React, { FC, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentList from './CourseContentList';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import Footer from '../Footer';

type Props = {
    id: string;
    user:any;
}

const CourseContent:FC<Props> = ({id,user}) => {
    const {data, isLoading,refetch} = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
    
    const [activeVideo, setActiveVideo] = useState(0);

    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState('Login')

  return (
    <>
    {
      isLoading ? (
        <Loader/>
      ): (
        <>
       <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
        <div className="w-full mt-[80px] grid 800px:grid-cols-10">
          <Heading
          title={data?.content[activeVideo]?.title}
          description='anything'
          keywords={data?.content[activeVideo]?.tags}
          />
          <div className="col-span-7">
            <CourseContentMedia 
            data={data?.content}
            id={id}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            user={user}
            refetch={refetch}
          />
          </div>
          <div className="hidden md:block md:col-span-3">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data?.content}
              activeVideo={activeVideo}
            />
          </div>
        </div> 
        <Footer/>
        </>
      )
    }
    </>
  )
}

export default CourseContent