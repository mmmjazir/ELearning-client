import { formStyles } from '@/app/styles/styles'
import { useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';


interface Props {
    setRoute:(route:string) => void;
    setOpen:(open:boolean) => void;
}

const schema = Yup.object().shape({
    currentPassword: Yup.string().required("Please enter your current password!").min(6),
    newPassword: Yup.string().required("Please enter your password!").min(6).matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character(a-z)")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character(A-Z)")
    .matches(/^(?=.*[0-9])/, "Must Contain One Number Character(0-9)")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "Must Contain One Special Case Character($,#,&,*)"
    )
    .notOneOf([Yup.ref("currentPassword")], "New password must be different from current password"),
    confirmNewPassword: Yup.string()
    .required("Please confirm your password!")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .min(6),
  
  })
  
const EditPassword:FC<Props> = ({setRoute,setOpen}) => {
   const [show,setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  })
  
   const [updatePassword,{isLoading,isSuccess,error}] = useUpdatePasswordMutation();

    const formik = useFormik({
        initialValues: {currentPassword:"",newPassword:"",confirmNewPassword:""},
        validationSchema: schema,
        onSubmit: async({currentPassword,newPassword,confirmNewPassword})=>{
         const data = {currentPassword,newPassword,confirmNewPassword};
         await updatePassword(data);
        }
      })
    
     useEffect(() => {
       if(isSuccess){
         toast.success('Password updated Successful');
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
      Edit Your Password
    </h1>
    <form onSubmit={handleSubmit}>
    <label 
          className={`${formStyles.label}`}
          htmlFor='currentPassword'
         >
      Current password:
      </label>
      <div className='relative'>
      <input 
          type={!show.currentPassword ? 'password' : 'text'}
          name='currentPassword' 
          value={values.currentPassword} 
          onChange={handleChange} 
          id='currentPassword' 
          placeholder='password!@%' 
          className={`${errors.currentPassword && touched.currentPassword && 'border-red-500'} 
          ${formStyles.input}
          `}
          />
          {!show.currentPassword ? (
            <AiOutlineEyeInvisible 
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, currentPassword: true }))} 
            size={20}
            />
          ) : (
            <AiOutlineEye
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, currentPassword: false }))} 
            size={20}
            />
          )
          }
      </div>
          {errors.currentPassword && touched.currentPassword && (
            <span className='text-red-500 pt-2 block'>{errors.currentPassword}</span>
          )}
          <div className='mt-5 relative mb-1'>
          <label 
          className={`${formStyles.label}`}
          htmlFor='newPassword'
         >
       New Password
      </label>
      <div className='relative'>
      <input 
          type={!show.newPassword ? 'password' : 'text'}
          name='newPassword' 
          value={values.newPassword} 
          onChange={handleChange} 
          id='newPassword' 
          autoComplete="new-password"
          placeholder='password!@%' 
          className={`${errors.newPassword && touched.newPassword && 'border-red-500'} 
          ${formStyles.input}
          `}
          />
          {!show.newPassword ? (
            <AiOutlineEyeInvisible 
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, newPassword: true }))} 
            size={20}
            />
          ) : (
            <AiOutlineEye
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, newPassword: false }))} 
            size={20}
            />
          )
          }
          </div>
          {errors.newPassword && touched.newPassword && (
            <span className='text-red-500 pt-2 block'>{errors.newPassword}</span>
          )}
      </div>
      <div className='mt-5 relative mb-1'>
          <label 
          className={`${formStyles.label}`}
          htmlFor='newPassword'
         >
       Confirm New Password
      </label>
      <div className='relative'>
      <input 
          type={!show.confirmNewPassword ? 'password' : 'text'}
          name='confirmNewPassword' 
          value={values.confirmNewPassword} 
          onChange={handleChange} 
          id='confirmNewPassword' 
          autoComplete="newPassword"
          placeholder='password!@%' 
          className={`${errors.confirmNewPassword && touched.confirmNewPassword && 'border-red-500'} 
          ${formStyles.input}
          `}
          />
          {!show.confirmNewPassword ? (
            <AiOutlineEyeInvisible 
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, confirmNewPassword: true }))} 
            size={20}
            />
          ) : (
            <AiOutlineEye
            className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
            onClick={() => setShow((prevState) => ({ ...prevState, confirmNewPassword: false }))} 
            size={20}
            />
          )
          }
          </div>
          {errors.confirmNewPassword && touched.confirmNewPassword && (
            <span className='text-red-500 pt-2 block'>{errors.confirmNewPassword}</span>
          )}
      </div>
       <h5 onClick={()=> setRoute('Forgot-Password')} className='text-[#2190ff] flex justify-end cursor-pointer pr-2'>Forgot password?</h5>
         <button type='submit' className={`${formStyles.button}`}>
            {isLoading ? 'Loading...' : 'Save' }
         </button>
     <br />
    
    </form>
    <br />
  </div> 
    )
}

export default EditPassword