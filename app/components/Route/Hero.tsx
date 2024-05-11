'use client'
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  
const {data,isLoading, refetch} = useGetHeroDataQuery("Banner");
const [search,setSearch] = useState("");
const router = useRouter();

const handleSearch = () => {
  if(search === ""){
   return
  }else{
   router.push(`/courses?title=${search}`);
  }
 }

  return (   
      <div className="w-full lg:flex items-center">
      <div className="absolute top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] lg:left-8 2xl:left-14"></div>
      <div className="lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:pt-[0] z-10">
        {!isLoading && (
        <Image
          src={data?.layout?.banner?.image?.url}
          width={400}
          height={400}
          alt=""
          className="lg:max-w-[90%] w-[90%] 2xl:max-w-[85%] h-[auto] z-[10]"
        />
        )}
      </div>
      <div className="lg:w-[60%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full lg:text-[70px] font-[600] font-Josefin py-2 lg:leading-[75px] 2xl:w-[60%] lg:w-[78%]">
          {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 2xl:!w-[55%] lg:!w-[74%]">
        {data?.layout?.banner?.subTitle}
        </p>
        <br />
        <br />
        <div className="2xl:w-[55%] lg:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]" 
          onClick={handleSearch}
          >
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
        <Image
            src={require("../../../public/assets/client-1.jpg")}
            alt=""
            className="rounded-full"
          />
          <Image
            src={require("../../../public/assets/client-2.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={require("../../../public/assets/client-3.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>{" "}
          </p>
        </div>
        <br />
      </div>
    </div>
    
  );
};

export default Hero;