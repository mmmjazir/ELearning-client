import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import {HomeOutlined, InfoOutlined, PolicyOutlined,LiveHelpOutlined,AccountCircleOutlined,StickyNote2Outlined} from '@mui/icons-material';
import avatar from '../../public/assets/avatar.png'


import Link from 'next/link';
import React,{FC} from 'react'
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const navItemsData =[
    {
        name: "Home",
        url: '/',
        icon:<HomeOutlined />,
    },
    {
      name: "Courses",
      url: "/courses",
      icon:<StickyNote2Outlined />,
    },
    {
        name: 'About',
        url: '/about',
        icon:<InfoOutlined />,
    },
    {
        name: "Policy",
        url: "/policy",
        icon:<PolicyOutlined/>,
    },
    {
        name: 'FAQ',
        url: '/faq',
        icon:<LiveHelpOutlined/>,
    },
]

interface Props{
  activeItem: number;
  isMobile: boolean;
  setOpen: (open:boolean) => void;
}

const NavItems: FC<Props> = ({activeItem,isMobile,setOpen}) => {
  const {user} = useSelector((state:any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined,{});
  const{data} = useSession();


  return (
    <>
        <div className='max-md:hidden flex'>
           {
            navItemsData && navItemsData.map((i,index)=> (
                <Link href={i.url} key={index} passHref>
                   <span className={`${activeItem === index ? 'dark:text-[#37a39a] text-[crimson]' : 'dark:text-white text-black'} text-[18px] px-6 font-Poppins font-[400]`}>
                    {i.name}
                   </span>
                </Link>
            ))
           }
        </div>
        { 
        isMobile && (
 
 <div className='md:hidden mt-5'>
           <div className='w-full text-center flex flex-col py-6'>
           <Link href={'/'} className='text-2xl font-Poppins font-[500] text-black dark:text-white '>
                 Elearning
              </Link>
              <br />
        <List>
        {navItemsData && navItemsData.map((i, index) => (
          <ListItem key={index} > 
          <Link href={i.url} className='dark:hover:bg-slate-800 rounded-lg w-full'>
            <ListItemButton className='rounded-lg '>
               <ListItemIcon className='text-black dark:text-white'>
                {i.icon}
              </ListItemIcon>
           
           
              <span className={`${
                activeItem === index
                 ? "dark:text-[#37a39a] text-[crimson]" 
                 : "dark:text-white text-black"
                 } block py-3 text-[18px] font-Poppins font-[400]`} >{i.name}</span>

            </ListItemButton> 
             </Link>
          </ListItem>
        ))}
  {user ? (
   
 <ListItem> 
   <Link href="/profile" className='dark:hover:bg-slate-800 rounded-lg w-full'>
  
     <ListItemButton className='rounded-lg'>
     <ListItemIcon className='text-black dark:text-white'>
     <Image
            src={userData?.user.avatar ? userData.user.avatar.url : avatar}
            alt=""
            width={120}
            height={120}
            className="w-[30px] h-[30px] rounded-full cursor-pointer"
            style={{border: activeItem === 5 ? "2px solid #37a39a" : "none"}}
      />
      </ListItemIcon>  
      <span className={`${
                activeItem === 5
                 ? "dark:text-[#37a39a] text-[crimson]" 
                 : "dark:text-white text-black"
                 } block py-3 text-[18px] font-Poppins font-[400]`} >
                  {user.name}
                  </span>  
      </ListItemButton>
    </Link>
   </ListItem> 
     
    
    ) : (
        <ListItem>
          <div onClick={()=>setOpen(true)}  className='dark:hover:bg-slate-800 rounded-lg w-full'>
        <ListItemButton className='rounded-lg'>
        <ListItemIcon className='text-black dark:text-white'>
          {isLoading ? (
      <Skeleton className='dark:bg-white' variant="circular" width={25} height={25} />
    ) : (
       <AccountCircleOutlined/>
     )}

         </ListItemIcon>    
            <span className='py-3 text-[18px] font-Poppins font-[400]' >Login</span>
        </ListItemButton>
        </div>
        </ListItem>
      
      ) }
      </List>
   </div>
   </div>
        )
        }
    </>
  )
}

export default NavItems