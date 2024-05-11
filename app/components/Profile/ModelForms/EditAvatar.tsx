import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import avatarIcon from '../../../../public/assets/avatar.png'
import { formStyles } from '@/app/styles/styles';
import { useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

interface Props {
   setOpen:(open:boolean)=> void;
   refetch: any;
}

const EditAvatar:FC<Props> = ({setOpen}) => {
  const {user} = useSelector((state:any) => state.auth)
  const [avatar, setAvatar] = useState('');
  const [updateAvatar,{isSuccess,isLoading,error}] = useUpdateAvatarMutation()
  const { refetch } = useLoadUserQuery(undefined,{});

  useEffect(() => {

   if(isSuccess){
       toast.success("Avatar updated successfully!");
       setOpen(false);
       refetch();
   }
   if(error){
     if("data" in error){
       const errorData = error as any ;
       toast.error(errorData.data.message);
     }
    }
 
  }, [isSuccess,error])
 
   

  const imageHandler = async (e:any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        setAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

 const handleUpdateAvatar = async()=>{
   await updateAvatar({avatar})
 }

  return (
    <div className='w-full'>
       <h1 className={`${formStyles.title}`}>
       Edit Avatar
      </h1>
        <input type="file" id="avatar" 
            onChange={imageHandler}  
            accept="image/png,image/jpg,image/jpeg,image/webp" 
            className="hidden "
          />

      <label
        htmlFor="avatar"
       >
        <Image width={380} height={450} src={avatar ? avatar : (user?.avatar ? user?.avatar?.url : avatarIcon)} alt="Avatar" />
      </label>
      <button onClick={handleUpdateAvatar} disabled={!avatar} className={`${formStyles.button} ${!avatar && 'bg-gray-400 cursor-auto'}`} >
        {isLoading ?'Loading...':'Save'}
      </button>
     <br />
    </div>
  )
}

export default EditAvatar