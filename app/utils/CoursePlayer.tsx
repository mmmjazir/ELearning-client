import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'

interface Props {
    videoUrl: string;
}

const CoursePlayer:FC<Props> = ({videoUrl}) => {
  const [videoData,setVideoData] = useState({
    otp: '',
    playbackInfo: "",
  });
  
 useEffect(()=>{
   
  axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`,{
      videoId:videoUrl,
    }).then((res:any)=> {
      setVideoData(res.data)
    })
    
  },[videoUrl])

  return (
    <div className='pt-[56%] relative overflow-hidden'>
       {videoData.otp && videoData.playbackInfo !== "" ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=ndccdvDLJb6BKuxV`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "90%",
            border: 0
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      ): (
      <h4 className='absolute top-0 left-0 w-full h-[90%] flex justify-center items-center bg-black text-white'>Video not found</h4>
      )}
    </div>
  )
}

export default CoursePlayer