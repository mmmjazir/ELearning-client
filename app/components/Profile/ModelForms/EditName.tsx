import { formStyles } from '@/app/styles/styles'
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react'
import * as Yup from 'yup';
import { useUpdateNameMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

interface Props{
  setOpen:(open:boolean)=> void;
}

const EditName:FC<Props> = ({setOpen}) => {

  const [updateName,{isSuccess,isLoading,error}] = useUpdateNameMutation();
  const { refetch } = useLoadUserQuery(undefined,{});

    const schema = Yup.object().shape({
        name: Yup.string().required("Please enter your name!").min(4),
      })

      const formik = useFormik({
        initialValues: {name:''},
        validationSchema: schema,
        onSubmit: async({name})=>{
           await updateName({name})
        }
      })
    
      useEffect(() => {
        if(isSuccess){
          refetch();
          toast.success('Your name updated successfully');
          setOpen(false);
        }
        if(error){
         if("data" in error){
           const errorData = error as any ;
           toast.error(errorData.data.message);
         }
        }
      }, [isSuccess,error])

const {errors,touched,values,handleChange,handleSubmit} = formik

  return (
  
   <div className='w-full'>
      <h1 className={`${formStyles.title}`}>
        Edit your name
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
      <label 
        className={`${formStyles.label}`}
        htmlFor='email'
        >
         Enter your Name
        </label>
        <input 
            type="text" 
            name='' 
            value={values.name} 
            onChange={handleChange} 
            id='name' 
            placeholder='johndoe' 
            className={`${errors.name && touched.name && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {errors.name && touched.name && (
              <span className='text-red-500 pt-2 block'>{errors.name}</span>
            )}
            </div>

     <input type="submit" value={isLoading ?'Loading...':'Save'} className={`${formStyles.button}`} />
      </form>
      <br />
    </div>
  )
}

export default EditName