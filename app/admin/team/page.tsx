'use client'
import AllUsers from "@/app/components/Admin/Users/AllUsers"

const page = () => {
  return (
    <div>
        <AllUsers isTeam={true}/>
    </div>
  )
}

export default page