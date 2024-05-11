import { formStyles } from '@/app/styles/styles';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'

interface Props {
courseInfo: any;
setCourseInfo: (courseInfo: any) => void;
active: number;
setActive:(active:number)=> void;
}

const CourseInformation:FC<Props> = ({courseInfo,setCourseInfo,active,setActive}) => {
  const [dragging, setDragging] = useState(false)
  
  const { data } = useGetHeroDataQuery("Categories", {});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data?.layout?.categories]);

  const handleSubmit =(e:any)=>{
    e.preventDefault();
    setActive(active + 1)
  }

  const handleFileChange = (e:any)=>{
   const file = e.target.files?.[0];
   if(file){
    const reader = new FileReader();

    reader.onload =() =>{
      if(reader.readyState === 2){
        setCourseInfo({...courseInfo, thumbnail: reader.result});
      }
    }
    reader.readAsDataURL(file);
   }
  }

 const handleDragOver = (e:any) =>{
    e.preventDefault();
    setDragging(true);
  }

 const handleDragLeave =(e:any) =>{
  e.preventDefault();
  setDragging(false);
 } 

 const handleDrop =(e:any)=>{
  e.preventDefault();
  setDragging(false);

  const file = e.dataTransfer.files?.[0];

  if(file){
    const reader = new FileReader();
    reader.onload =()=>{
      setCourseInfo({...courseInfo, thumbnail: reader.result});
    }
    reader.readAsDataURL(file)
   }
   
 }

  return (
    <div className='w-[80%] m-auto mt-10 mb-10'>
        <form onSubmit={handleSubmit}>
         <div>
         <label htmlFor="" className={formStyles.label}>
            Course Name
          </label>
          <input 
          type="text"
          name='name'
          required 
          value={courseInfo.name}
          onChange={(e:any)=> setCourseInfo({...courseInfo, name: e.target.value})} 
          id='name'
          placeholder='MERN stack LMS platform with next 13'
          className={formStyles.input}
          />
         </div>
         <br />
         
         <div className='mb-5'>
           <label htmlFor="" className={formStyles.label}>Course Description</label>
           <textarea name="" id="" cols={30} rows={7}
            placeholder='Write something...'
            required
            className={`${formStyles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e:any)=> setCourseInfo({...courseInfo, description: e.target.value})}
           >

           </textarea>
         </div>
         <br />

         <div className='flex justify-between gap-16'>
           <div className='w-full'>
            <label htmlFor="" className={formStyles.label}>Course Price</label>
            <input 
            type="number"
            name=""
            required
            value={courseInfo.price}
            onChange={(e:any)=> setCourseInfo({...courseInfo, price: e.target.value})}
             id='price'
             placeholder='29'
             className={formStyles.input}
             />
           </div>
           <div className='w-full'>
            <label htmlFor="" className={formStyles.label}>Estimated Price (optional)</label>
            <input 
            type="number"
            name=""
            value={courseInfo.estimatedPrice}
            onChange={(e:any)=> setCourseInfo({...courseInfo, estimatedPrice: e.target.value})}
             id='estimatedPrice'
             placeholder='29'
             className={formStyles.input}
             />
           </div>
         </div>
         <div className="w-full mt-5 flex gap-16 justify-between items-center"> 
          <div className='w-full '>
            <label className={formStyles.label} htmlFor="">Course Tags</label>
            <input 
            className={formStyles.input}
            type="text" 
            name=''
            id='tags'
            placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
            required
            value={courseInfo.tags}
            onChange={(e:any)=> setCourseInfo({...courseInfo, tags: e.target.value})}
            />
          </div>

          <div className="w-full">
            <label className={`${formStyles.label} w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${formStyles.input}`}
              required
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option  className="bg-gray-200 text-black rounded-md px-4 py-2 w-full" value="">Select Category</option>
              {categories &&
                categories.map((item: any) => (
                  <option 
                    value={item.title} 
                    key={item._id}
                    className="bg-gray-200  text-black rounded-md w-full"
                    >
                    {item.title}
                  </option>
                ))}
            </select>
          </div>

   </div>
        <div className='mt-5 flex justify-between gap-16 mb-14'>
          <div className='w-full'>
            <label className={formStyles.label} htmlFor="">Course Level</label>
            <input 
            className={formStyles.input}
            type="text" 
            name=''
            id='level'
            placeholder='Beginner/Intermediate/Expert'
            required
            value={courseInfo.level}
            onChange={(e:any)=> setCourseInfo({...courseInfo, level: e.target.value})}
            />
          </div>
          
          <div className='w-full'>
            <label className={formStyles.label} htmlFor="">Demo Url</label>
            <input 
            className={formStyles.input}
            type="text" 
            name=''
            id='demoUrl'
            placeholder='eer73g'
            required
            value={courseInfo.demoUrl}
            onChange={(e:any)=> setCourseInfo({...courseInfo, demoUrl: e.target.value})}
            />
          </div>
          </div>
          
          <div className='w-full mb-5'>
            <input 
             type="file"
             accept='image/*'
             id='file'
             className='hidden'
             onChange={handleFileChange}
             />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
              {courseInfo.thumbnail ? (
                <div className="cursor-pointer">
               <Image 
                layout="responsive"
                src={courseInfo.thumbnail}
                alt="" 
                width={600} 
                height={900} 
                className='max-h-[550px] max-w-full'
                />
              </div>
              ): (
               <span className='text-black dark:text-white'>
                Drag and drop your thumbnail here or click to browse
               </span>
              )
              }
             </label>
          </div>
          <div className='w-full flex items-center justify-end'>
         <input 
            type="submit"
            value='Next'
            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] rounded mt-8 cursor-pointer'
          />
          </div>
         </form>
    </div>
  )
}

export default CourseInformation