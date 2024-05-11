import React, { FC, useState,useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { formStyles } from '../../../app/styles/styles';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) =>  void;
  refetch: any;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
})

const Login:FC<Props> = ({setRoute,setOpen,refetch}) => {
  const [show,setShow] = useState(false);
  const [login,{isSuccess,error}] = useLoginMutation();

  const formik = useFormik({
    initialValues: {email:"",password:""},
    validationSchema: schema,
    onSubmit: async({email,password})=>{
     await login({email,password})
    }
  })

 useEffect(() => {
   if(isSuccess){
     toast.success('Login Successful');
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
 

  const {errors,touched,values,handleChange,handleSubmit} = formik

  return (
    <div className='w-full'>
      <h1 className={`${formStyles.title}`}>
        Login with ELearning
      </h1>
      <form onSubmit={handleSubmit}>
        <label 
        className={`${formStyles.label}`}
        htmlFor='email'
        >
         Enter your Email
        </label>
        <input 
            type="text" 
            name='' 
            value={values.email} 
            onChange={handleChange} 
            id='email' 
            placeholder='loginmail@gmail.com' 
            className={`${errors.email && touched.email && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {errors.email && touched.email && (
              <span className='text-red-500 pt-2 block'>{errors.email}</span>
            )}
            <div className='mt-5 relative mb-1'>
            <label 
            className={`${formStyles.label}`}
            htmlFor='password'
           >
         Enter your password
        </label>
        <div className='relative'>
        <input 
            type={!show ? 'password' : 'text'}
            name='password' 
            value={values.password} 
            onChange={handleChange} 
            id='password' 
            autoComplete="new-password"
            placeholder='password!@%' 
            className={`${errors.password && touched.password && 'border-red-500'} 
            ${formStyles.input}
            `}
            />
            {!show ? (
              <AiOutlineEyeInvisible 
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow(true)} 
              size={20}
              />
            ) : (
              <AiOutlineEye
              className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
              onClick={() => setShow(false)} 
              size={20}
              />
            )
            }
            </div>
            {errors.password && touched.password && (
              <span className='text-red-500 pt-2 block'>{errors.password}</span>
            )}
        </div>
         <h5 onClick={()=> setRoute('Forgot-Password')} className='text-[#2190ff] flex justify-end cursor-pointer pr-2'>Forgot password?</h5>
            <input type="submit" value='Login' className={`${formStyles.button}`} />
       <br />
       <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
        Or join with
       </h5>
       <div className='flex items-center justify-center my-3'>
        <FcGoogle size={30} className='cursor-pointer mr-2' 
         onClick={() => signIn('google')}
        />
        <AiFillGithub size={30} className='cursor-pointer ml-2' 
        onClick={() => signIn('github')}
        />
       </div>
       <h5 className='text-center pt-4 font-Poppins text-[14px]'>
        Not have any account?{" "}
        <span 
          className='text-blue-500 pl-1 cursor-pointer'
          onClick={()=> setRoute('Sign-Up')}
          >
          Sign up
        </span>
       </h5>
      </form>
      <br />
    </div>
  )
}

export default Login