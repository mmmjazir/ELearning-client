import React, { FC, useEffect, useState } from 'react'
import { DataGrid,GridColDef, GridFooterContainer  } from '@mui/x-data-grid';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { formStyles } from '@/app/styles/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';

interface Props {
isTeam: boolean;
}

const AllUsers:FC<Props> = ({isTeam}) => {
  const {theme, setTheme} = useTheme();
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {isLoading,data,refetch} = useGetAllUsersQuery({ page: currentPage }, { refetchOnMountOrArgChange: true });
  const [deleteUser,{isSuccess:deleteUserSuccess,error:deleteUserError}] = useDeleteUserMutation();
  const [updateUserRole, {isSuccess:updateRoleSuccess,error:updateRoleError}] = useUpdateUserRoleMutation();

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'super-app-theme--header', },
    {
      field: 'name',
      headerName: 'Name',
      flex:0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex:0.8,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'role',
      headerName: 'Role',
      flex:0.4,
      headerClassName: 'super-app-theme--header',
    },
    {
        field: 'courses',
        headerName: 'Purchased Courses',
        flex:0.3,
        headerClassName: 'super-app-theme--header',
      },
    {
      field: 'created_at',
      headerName: 'Created At',
      flex:0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
        field: "delete",
        headerName: "Delete",
        flex: 0.2,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: any) => {
          return (
            <>
              <Button
                onClick={() => {
                  setOpen(!open);
                  setUserId(params.row.id);
                }}
              >
                <AiOutlineDelete
                  className="dark:text-white text-black flex mr-3"
                  size={20}
                />
              </Button>
            </>
          );
        },
      },
      {
        field: "sendemail",
        headerName: "Send Email",
        flex: 0.2,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: any) => {
          return (
            <>
              <a
               href={`mailto:${params.row.email}`}
               className='flex justify-center items-center py-4'
              >
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            </>
          );
        },
      },

  ];

  const rows: any = [];

if(isTeam){
    const newData = data && data.users.filter((item:any) => item.role === 'admin')
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
}else{
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
}


  
  useEffect(() => {

    if(updateRoleSuccess){
        refetch();
        toast.success("User role updated successfully")
        setActive(false); 
        setEmail('')
    }

    if(updateRoleError){
        if("data" in updateRoleError){
            const errorMessage = updateRoleError as any;
            toast.error(errorMessage.data.message)
        }
    }

    if (deleteUserSuccess) {
      setOpen(false);
      refetch();
      toast.success("User Deleted Successfully");
    }
    if (deleteUserError) {
      if ("data" in deleteUserError) {
        const errorMessage = deleteUserError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteUserSuccess,deleteUserError,updateRoleSuccess,updateRoleError]);

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

const handlePageChange =(e:any,page:number)=>{
  setCurrentPage(page)
  refetch()
}

  return (
    <div className={`mt-[${isTeam ? '80px' : '120px'}]`}>
    {isLoading ? (
      <Loader />
    ) : (
        <Box m="20px">
            {isTeam && (
                <div className='flex justify-end'>
                    <div 
                    className={`${formStyles.button} !w-[200px] !rounded-[10px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                    onClick={()=> setActive((prev)=> !prev)}
                    >
                         Add New Member
                    </div>
                </div>
            )}
        <Box
          m="40px 0 0 0"
          height="80vh"
          className={` rounded-lg bg-white dark:bg-slate-900`}
          sx={{
            "& .MuiDataGrid-root": {
              border:  theme === 'dark' ? "none": '1px solid lightgrey',
              outline: "none",
            },

            '& .super-app-theme--header': {
              backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC",
              color: theme === 'dark' ? 'white' : 'black',
            },
            "& .MuiDataGrid-columnHeaderTitleContainer":{
                backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC",
            },
            "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiSvgIcon-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
          }}
       >
          <DataGrid
           className='dark:text-white text-black'
           checkboxSelection 
           rows={rows}
           columns={columns}
           hideFooterPagination
          />
          <div className="relative flex bottom-[58px] justify-end px-10">
           <Box sx={{ 
      marginTop: 2,
      "& .MuiPaginationItem-root": {
        color: theme === "dark" ? "#fff" : "#000", 
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        backgroundColor: theme === "dark" ? "darkblue" : "#fff",
      },
      "& .MuiPaginationItem-outlined": {
        borderColor: theme === "dark" ? "#fff" : "#000",
      },
   }}>
            <Stack spacing={2}>
              <div className=''>
              <Pagination 
              count={data.totalPages} 
              variant="outlined" 
              shape="rounded"
              onChange={handlePageChange}
              />
              </div>
            </Stack>
          </Box>
          </div>
        </Box>
        {active && (
            <Modal
             open={active}
             onClose={()=> setActive((prev)=> !prev)}

            >
     <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${formStyles.title}`}>Add New Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${formStyles.input}`}
                  />
                  <Select
                    name=""
                    id=""
                    className={`${formStyles.input} !mt-6`}
                    onChange={(e: any) => setRole(e.target.value)}
                    value={role}
                  >
               
                    {/* <option className='text-black ' value="admin">Admin</option>
                    <option className='text-black p-2' value="user">User</option> */}
                    <MenuItem value='admin'>Admin</MenuItem>
          <MenuItem value='user'>User</MenuItem>
                  </Select>
  



                  <br />
                  <div
                    className={`${formStyles.button} my-6 !h-[30px]`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
        )}
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${formStyles.title}`}>
                Are you sure you want to delete this user?
              </h1>
              <div className="flex w-full items-center justify-between mb-6 mt-4">
                <div
                  className={`${formStyles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </div>
                <div
                  className={`${formStyles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </Box>
    )}
  </div>
  );
}

export default AllUsers