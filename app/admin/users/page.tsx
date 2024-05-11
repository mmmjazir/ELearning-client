'use client'
import AllUsers from "@/app/components/Admin/Users/AllUsers"


const page = () => {
  return (
    <div>
        <AllUsers isTeam={false}/>
    </div>
  )
}

export default page