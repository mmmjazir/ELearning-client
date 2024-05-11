import React, { FC, useEffect, useState } from 'react'
import { DataGrid,GridColDef, GridFooterContainer  } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { formStyles } from '@/app/styles/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {

}

const AllCourses:FC<Props> = () => {
  const {theme, setTheme} = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {isLoading,data,refetch} = useGetAllCoursesQuery({ page: currentPage },{refetchOnMountOrArgChange: true});
  const [deleteCourse,{isSuccess,error}] = useDeleteCourseMutation();

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'super-app-theme--header', },
    {
      field: 'title',
      headerName: 'Course Title',
      flex:1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex:0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'purchased',
      headerName: 'Purchased',
      flex:0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      flex:0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
        field: "  ",
        headerName: "Edit",
        flex: 0.2,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: any) => {
          return (
            
              <Link href={`/admin/edit-course/${params.row.id}`} className='flex px-1 py-4'>
               
                 <FiEdit2 className="dark:text-white text-black" size={20} />   

              </Link>
          );
        },
    },
    {
        field: " ",
        headerName: "Delete",
        flex: 0.2,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: any) => {
          return (
            <>
              <Button
                onClick={() => {
                  setOpen(!open);
                  setCourseId(params.row.id);
                }}
              >
                <AiOutlineDelete
                  className="dark:text-white text-black"
                  size={20}
                />
              </Button>
            </>
          );
        },
      },

  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }
  
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error,refetch]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

const handlePageChange =(e:any,page:number)=>{
  setCurrentPage(page)
  refetch()
}

  return (
    <div className="mt-[120px]">
    {isLoading ? (
      <Loader />
    ) : (
        <Box  m="20px">
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
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${formStyles.title}`}>
                Are you sure you want to delete this course?
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

export default AllCourses