'use client'

import { useState } from "react";
import Header from "../components/Header";
import Protected from "../hooks/useProtected";

export default function ProfileLayout({children}:any){
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
   
  return(
    <div>
    <Header
    open={open}
    setOpen={setOpen}
    activeItem={5}
    setRoute={setRoute}
    route={route}
    />
  <Protected>
    {children}
  </Protected>
   </div>
    )
}