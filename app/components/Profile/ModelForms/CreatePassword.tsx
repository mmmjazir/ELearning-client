// import { formStyles } from '@/app/styles/styles';
// import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
// import { useFormik } from 'formik';
// import React, { FC, useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

// interface Props {

// }

// const CreatePassword:FC<Props> = () => {
//     const [show,setShow] = useState({
//         currentPassword: false,
//         newPassword: false,
//         confirmNewPassword: false
//       })
      
//        const [updatePassword,{isLoading,isSuccess,error}] = useUpdatePasswordMutation();
    
//         const formik = useFormik({
//             initialValues: {currentPassword:"",password:"",confirmPassword:""},
//             validationSchema: schema,
//             onSubmit: async({currentPassword,password,confirmPassword})=>{
//              const data = {currentPassword,password,confirmPassword};
//              await updatePassword(data);
//             }
//           })
        
//          useEffect(() => {
//            if(isSuccess){
//              toast.success('Password updated Successful');
//              setOpen(false);
//            }
//            if(error){
//             if("data" in error){
//               const errorData = error as any ;
//               toast.error(errorData.data.message);
//             }
//            }
//          }, [isSuccess,error])
         
        
//     const {errors,touched,values,handleChange,handleSubmit} = formik
        

//   return (
//     <div className='w-full'>
//     <h1 className={`${formStyles.title}`}>
//       You dont have a password Create One First
//     </h1>
//     <form onSubmit={handleSubmit}>
    
//      <div className='relative mb-1'>
//           <label 
//           className={`${formStyles.label}`}
//           htmlFor='newPassword'
//          >
//        Password
//       </label>
//       <div className='relative'>
//       <input 
//           type={!show.password ? 'password' : 'text'}
//           name='newPassword' 
//           value={values.password} 
//           onChange={handleChange} 
//           id='newPassword' 
//           autoComplete="new-password"
//           placeholder='password!@%' 
//           className={`${errors.password && touched.password && 'border-red-500'} 
//           ${formStyles.input}
//           `}
//           />
//           {!show.password ? (
//             <AiOutlineEyeInvisible 
//             className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//             onClick={() => setShow((prevState) => ({ ...prevState, newPassword: true }))} 
//             size={20}
//             />
//           ) : (
//             <AiOutlineEye
//             className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//             onClick={() => setShow((prevState) => ({ ...prevState, newPassword: false }))} 
//             size={20}
//             />
//           )
//           }
//           </div>
//           {errors.password && touched.password && (
//             <span className='text-red-500 pt-2 block'>{errors.password}</span>
//           )}
//       </div>
//       <div className='mt-5 relative mb-1'>
//           <label 
//           className={`${formStyles.label}`}
//           htmlFor='newPassword'
//          >
//        Confirm New Password
//       </label>
//       <div className='relative'>
//       <input 
//           type={!show.confirmPassword ? 'password' : 'text'}
//           name='confirmNewPassword' 
//           value={values.confirmPassword} 
//           onChange={handleChange} 
//           id='confirmNewPassword' 
//           autoComplete="newPassword"
//           placeholder='password!@%' 
//           className={`${errors.confirmPassword && touched.confirmPassword && 'border-red-500'} 
//           ${formStyles.input}
//           `}
//           />
//           {!show.confirmPassword ? (
//             <AiOutlineEyeInvisible 
//             className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//             onClick={() => setShow((prevState) => ({ ...prevState, confirmPassword: true }))} 
//             size={20}
//             />
//           ) : (
//             <AiOutlineEye
//             className='absolute cursor-pointer right-2 top-[60%] -translate-y-1/2'
//             onClick={() => setShow((prevState) => ({ ...prevState, confirmPassword: false }))} 
//             size={20}
//             />
//           )
//           }
//           </div>
//           {errors.confirmPassword && touched.confirmPassword && (
//             <span className='text-red-500 pt-2 block'>{errors.confirmPassword}</span>
//           )}
//       </div>
//        <h5 onClick={()=> setRoute('Forgot-Password')} className='text-[#2190ff] flex justify-end cursor-pointer pr-2'>Forgot password?</h5>
//          <button type='submit' className={`${formStyles.button}`}>
//             {isLoading ? 'Loading...' : 'Save' }
//          </button>
//      <br />
    
//     </form>
//     <br />
//   </div> 
//   )
// }

// export default CreatePassword