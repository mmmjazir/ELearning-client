import { redirect } from "next/navigation";
import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import Loader from "../components/Loader/Loader";

interface AdminProtectedProps{
    children: React.ReactNode
}

export default function AdminProtected ({children}: AdminProtectedProps){
  const { isLoading } = useLoadUserQuery(undefined, {});
  const {user} = useSelector((state:any) => state.auth);

  const isAdmin = user?.role === 'admin';

  if(isLoading){
  return <Loader/>
  }

  if (!isLoading && !isAdmin ) {
    redirect('/');
  }
 if(isAdmin && !isLoading){
  return children;
 }

}