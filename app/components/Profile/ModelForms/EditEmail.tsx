import { formStyles } from '@/app/styles/styles'
import React, { FC, useEffect, useState } from 'react'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { useSendNewEmailOtpMutation, useUpdateEmailMutation } from '@/redux/features/user/userApi';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';


interface Props {
  setOpen:(open:boolean) => void;
}

const schema = Yup.object().shape({
    currentEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address').required("Please enter your email!"),
    newEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address').required("Please enter your email!"),
    verificationCode: Yup.string().min(4).max(4).required('Please enter your verification code!') ,
    password: Yup.string().required("Please enter your password!").min(6)
  });

  
const EditEmail:FC<Props> = ({setOpen}) => {

  const {updateEmailToken} = useSelector((state:any) => state.auth)

  const [sendNewEmailOtp,{isSuccess:EmailOtpSendSuccess,data,isLoading:EmailOtpSendLoading,error:EmailOtpSendError}] = useSendNewEmailOtpMutation();
 
  const [updateEmail, {isSuccess,isLoading,error}] = useUpdateEmailMutation();

  const { refetch } = useLoadUserQuery(undefined,{});

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60); // Set countdown to 60 seconds
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1); 
    }, 1000);
    setTimeout(() => {
      clearInterval(interval); 
    }, 60000);
  };
  
useEffect(()=>{
 
    if(EmailOtpSendSuccess && data){ 
      startCountdown();
      const message = data?.message;
      toast.success(message);
     }
     if(EmailOtpSendError){
       if("data" in EmailOtpSendError){
         const errorData = EmailOtpSendError as any ;
         toast.error(errorData.data.message);
       }
      }
},[EmailOtpSendSuccess,EmailOtpSendError])

  useEffect(()=>{
    if(isSuccess){
     refetch();
     toast.success('Email updated successfully');
     setOpen(false);
    }
    if(error){
      if("data" in error){
        const errorData = error as any ;
        toast.error(errorData.data.message);
      }
     }
    }, [isSuccess,error]);


  const formik = useFormik({
    initialValues: {currentEmail:'',newEmail:'',verificationCode:'',password:''},
    validationSchema: schema,
    onSubmit: async({currentEmail,newEmail,verificationCode,password})=>{
      const data = {
        currentEmail,newEmail,updateEmail_Otp:verificationCode,password,updateEmail_Token:updateEmailToken
      };
      await updateEmail(data);
    }
  })

  const {errors,touched,values,handleChange,handleSubmit} = formik

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmailValue = e.target.value;
    handleChange(e);
    Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
      .isValid(newEmailValue) 
      .then(valid => setIsEmailValid(valid)); 
  };

  const handleSendEmailOtp = async(e:any) =>{
      e.preventDefault()
      const newEmail = values.newEmail;
      await sendNewEmailOtp({ newEmail });
  }
  
  const isFormFilled = Object.values(values).every(val => val !== '');

  return (
    <div className='w-full'>
    <h1 className={`${formStyles.title}`}>
    Edit Email Address
    </h1>
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
    <label 
      className={`${formStyles.label}`}
      htmlFor='currentEmail'
      >
       Current Email Address:
      </label>
      <input 
          type="text" 
          name='currentEmail' 
          value={values.currentEmail} 
          onChange={handleChange} 
          id='currentEmail' 
          placeholder='loginmail@gmail.com' 
          className={`${errors.currentEmail && touched.currentEmail && 'border-red-500'} 
          ${formStyles.input}
          `}
          />
          {errors.currentEmail && touched.currentEmail && (
            <span className='text-red-500 pt-2 block'>{errors.currentEmail}</span>
          )}
          </div>
          <div className='mb-3'>
      <label 
      className={`${formStyles.label}`}
      htmlFor='newEmail'
      >
       New Email Address:
      </label>
      <input 
          type="text" 
          name='newEmail' 
          value={values.newEmail} 
          onChange={handleEmailChange}
          id='newEmail' 
          placeholder='loginmail@gmail.com' 
          className={`${errors.newEmail && touched.newEmail && 'border-red-500'} 
          ${formStyles.input}
          `}
          />
         
          {errors.newEmail && touched.newEmail && (
            <span className='text-red-500 pt-2 block'>{errors.newEmail}</span>
          )}
         </div>
          <div className='mb-3'>

            <label 
              className={`${formStyles.label}`}
              htmlFor='email-otp'
             >
              Verification Code:
            </label>
            <div className='flex gap-4 items-center'>
            <input 
                type="text" 
                name='verificationCode' 
                value={values.verificationCode} 
                onChange={handleChange} 
                id='email-otp' 
                className={`${errors.verificationCode && touched.verificationCode && 'border-red-500'} 
                flex-grow text-black dark:text-white bg-transparent font-Poppins h-[40px] mt-[10px] px-2 outline-none border rounded
                `}
                />
              
              <button onClick={handleSendEmailOtp} disabled={!isEmailValid || countdown > 0  } className={`mt-2 flex w-[30%] justify-center items-center py-3 px-6 rounded-[6px]  min-h-[45px] text-[16px] font-Poppins font-semibold  ${isEmailValid && countdown <= 0 ? 'bg-[#2190ff] cursor-pointer' : 'bg-gray-400'}`}>
                 {EmailOtpSendLoading ?<CircularProgress size={20} color="inherit" />: (countdown <= 0 ? 'Send' : `Send ${countdown}s`)}
              </button>
           </div>
          {errors.verificationCode && touched.verificationCode && (
                  <span className='text-red-500 pt-2 block'>{errors.verificationCode}</span>
                )}
          </div>

          <div className='mt-5 relative mb-1'>
          <label 
          className={`${formStyles.label}`}
          htmlFor='password'
         >
       Enter your password
      </label>
      <div className='relative'>
      <input 
          type='text'
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
          </div>
          {errors.password && touched.password && (
            <span className='text-red-500 pt-2 block'>{errors.password}</span>
          )}
      </div>

          <input type="submit" disabled={!isFormFilled} value={isLoading ?'Loading...':'Save'} className={`${formStyles.button} ${!isFormFilled && 'bg-gray-400 cursor-default'}`} />
     <br />
    
    </form>
    <br />
  </div>
  )
}

export default EditEmail