import { formStyles } from '@/app/styles/styles';
import React, { FC } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface Props {
 benefits: {title:string}[];
 setBenefits:(benefits:{title:string}[]) => void;
 prerequisites:{title: string}[];
 setPrerequisites: (prerequisites: {title:string}[]) => void;
 active: number;
 setActive: (active:number) => void;
}

const CourseData:FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}) => {

 const handleBenefitChange=(index:number,value: any)=>{
   const updatedBenefits = [...benefits]
   updatedBenefits[index] = { title: value };;
   setBenefits(updatedBenefits)
 };

 const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
 };

 const handleRemoveBenefit = (e:any) => {
    if (benefits.length > 1) {
        const updatedBenefits = [...benefits];
        updatedBenefits.pop();
        setBenefits(updatedBenefits);
    }
 };

 const handlePrerequisiteChange=(index:number,value: any)=>{
    const updatedPrerequisites = [...prerequisites]
    updatedPrerequisites[index] = { title: value };
    setPrerequisites(updatedPrerequisites)
  };
 
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
 
  const handleRemovePrerequisite = (e:any) => {
     if (prerequisites.length > 1) {
         const updatedPrerequisites = [...prerequisites];
         updatedPrerequisites.pop();
         setPrerequisites(updatedPrerequisites);
     }
  };

  const prevButton = () => {
    setActive(active - 1);
  }

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else{
        toast.error("Please fill the fields for go to next!")
    }
  };

   return (
    <div className='w-[80%] m-auto mt-10 mb-10'>
        <div>
            <label className={`${formStyles.label} text-[20px]`} htmlFor="">
                What are the benefits for students in this course?
            </label>
            {benefits.map((benefit:any,index:number) =>(
                <input 
                type="text"
                key={index}
                name='benefit'
                placeholder='You will be able to build a full stack LMS Platform...'
                required
                className={`${formStyles.input} my-2`}
                value={benefit.title}
                onChange={(e)=> handleBenefitChange(index, e.target.value)}
                 />
            ))}
            <div className='flex'>
            <AiOutlinePlusCircle 
              className='my-[10px] cursor-pointer w-[30px]'
              size={25}
              onClick={handleAddBenefit}
            />
          {benefits.length > 1 && (
            <AiOutlineMinusCircle
             className={`my-[10px] cursor-pointer w-[30px] `}
             size={25}
             onClick={handleRemoveBenefit}
            />
            )}
            </div>
        </div>

        <div>
            <label className={`${formStyles.label} text-[20px]`} htmlFor="">
              What are the prerequisites for starting this course?
            </label>
            {prerequisites.map((prerequisite:any,index:number) =>(
                <input 
                type="text"
                key={index}
                name='prerequisite'
                placeholder='You need basic knowledge of MERN stack'
                required
                className={`${formStyles.input} my-2`}
                value={prerequisite.title}
                onChange={(e)=> handlePrerequisiteChange(index, e.target.value)}
                 />
            ))}
            <div className='flex'>
            <AiOutlinePlusCircle 
              className='my-[10px] cursor-pointer w-[30px]'
              size={25}
              onClick={handleAddPrerequisite}
            />
          {prerequisites.length > 1 && (
            <AiOutlineMinusCircle
             className={`my-[10px] cursor-pointer w-[30px] `}
             size={25}
             onClick={handleRemovePrerequisite}
            />
            )}
            </div>
        </div>

        <div className='w-full mt-8 flex items-center justify-between'>
            <div 
             className='px-12 py-2 bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer'
             onClick={()=> prevButton()}
            >
              Prev
            </div>

         <div 
            onClick={() => handleOptions()}
            className='px-12 py-2 bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer'>
             Next
            </div>
        </div>
    </div>
  )
}

export default CourseData