import { redirect } from "next/navigation";
import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader/Loader";

interface ProtectedProps{
    children: React.ReactNode
}

export default function Protected ({children}: ProtectedProps){
  const { isLoading } = useLoadUserQuery(undefined, {});
  const {user} = useSelector((state:any) => state.auth);
  const{data} = useSession();

  
  if(isLoading){
    return <Loader/>
   }

  if (!isLoading && !user && !data) {
    redirect('/');
  }
 if(user || data && !isLoading){
  return children;
 }

}