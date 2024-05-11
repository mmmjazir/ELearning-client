import { formStyles } from '@/app/styles/styles';
import { useCreateLayoutMutation, useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

interface Props {}

const EditHero:FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

 const {data, refetch} = useGetHeroDataQuery("Banner",{
 refetchOnMountOrArgChange: true
}); 

const [editLayout, {isSuccess,isLoading,error}] = useEditLayoutMutation();
const [createLayout,{isSuccess:createLayoutSuccess,error:createLayoutError,isLoading:createLayoutLoading}] = useCreateLayoutMutation();


useEffect(()=>{
 if(data){
  setTitle(data?.layout?.banner?.title);
  setSubTitle(data?.layout?.banner?.subTitle);
  setImage(data?.layout?.banner?.image?.url);
 }
},[data])

useEffect(()=>{

 if (isSuccess) {
  toast.success("Hero updated successfully!");
  refetch();
}
if (error) {
  if ("data" in error) {
    const errorData = error as any;
    toast.error(errorData?.data?.message);
  }
}


if (createLayoutSuccess) {
  toast.success("Hero created successfully!");
  refetch();
}

if (createLayoutError) {
  if ("data" in createLayoutError) {
    const errorData = createLayoutError as any;
    toast.error(errorData?.data?.message);
  }
}

},[isSuccess, error,createLayoutSuccess,createLayoutError])


const handleUpdate = (e: any) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }
};

const handleEdit = async () => {
  const data = {
    type: "Banner",
    image,
    title,
    subTitle,
  }
  await editLayout(data);
};

const handleSave = async () =>{
  const data = {
    type: "Banner",
    image,
    title,
    subTitle,
  }
  await createLayout(data);
}

const dataExists = 
  (
    data?.layout?.banner?.title &&
    data?.layout?.banner?.subTitle && 
    data?.layout?.banner?.image?.url
   )
    ? true : false


 return (
  <>
    <div className='w-full lg:flex items-center'>
        <div className="absolute top-[100px] lg:w-[700px] ml-[10vh] 1000px:top-[unset] 1500px:h-[700px] hero_animation rounded-[50%] "></div>
        
        <div className="1000px:w-[40%] flex  1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
           <div className="relative flex max-md:top-[100px] items-center justify-end">
           <img
              src={image}
              alt=""
              className="object-contain  1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[12]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-[20]">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
           </div>
       </div>


       <div className={`1000px:w-[60%] ${!image && 'mt-[440px]'} flex flex-col items-center max-md:ml-40 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]`}>
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none"
          ></textarea>
          <br />
          <br />
          <br />
          <button
            className={`${
              formStyles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
          ${
            (data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image ) && 
            (title && subTitle && image)
              ? "!cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }
          !rounded absolute bottom-12 right-12`}
            onClick={
                 dataExists
                ? handleEdit
                : handleSave
            }
            disabled={
             (data?.layout?.banner?.title === title &&
              data?.layout?.banner?.subTitle === subTitle &&
              data?.layout?.banner?.image?.url === image ) ||
              (!title || !subTitle || !image)
            }
          >
            {isLoading || createLayoutLoading ? 'Loading...' : (dataExists ? 'Update' : 'Save')}
            </button>
          
          
        </div>

    </div>
    
    </>
  )
}

export default EditHero