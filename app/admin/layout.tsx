'use client'
import { useEffect, useState } from "react";
import DashboardHeader from "../components/Admin/DashboardHeader";
import Sidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import Loader from "../components/Loader/Loader";


export default function AdminLayout({children}:any){
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

//   const {user} = useSelector((state:any) => state.auth);

//   const {isLoading,error} = useLoadUserQuery(undefined,{});
  
//   const isAdmin = user?.role === 'admin';

//   useEffect(()=>{
//    if(user ){
//     if(!isAdmin && !isLoading){
//         redirect('/');
//     }
//     if(error){
//         redirect('/')
//     }
//    }
// },[user,isAdmin,error])
   

   return(
    <div >
    <AdminProtected>
     <Heading 
          title='ELearning - Admin' 
          description="ELearning is a platform for students to learn and get help from teachers" 
          keywords="Programming,MERN,Redux,Machine Learning" />

      <div className="flex min-h-[100vh]">
        <div className={`${isCollapsed ? 'w-[5%]' : 'w-[16%]'}`}>
         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
        </div>
        <div className={`${isCollapsed ? 'w-[94%]' : 'w-[84%]'}`}>
          <DashboardHeader open={open} setOpen={setOpen} />
          {children}
        </div>
      </div>

     </AdminProtected>
        
    </div>
   )
}