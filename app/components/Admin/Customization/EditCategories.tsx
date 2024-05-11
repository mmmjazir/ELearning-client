'use client'
import {
    useCreateLayoutMutation,
    useEditLayoutMutation,
    useGetHeroDataQuery,
  } from "@/redux/features/layout/layoutApi";
  import React, { useEffect, useState } from "react";
  import Loader from "../../Loader/Loader";
  import { AiOutlineDelete } from "react-icons/ai";
  import { IoMdAddCircleOutline } from "react-icons/io";
  import { toast } from "react-hot-toast";
  import { formStyles } from "@/app/styles/styles";
  

  
  const EditCategories = () => {
    const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", {
      refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isSuccess: layoutSuccess, error }] =
      useEditLayoutMutation();
    const [createLayout, {isSuccess:createLayoutSuccess, error:createLayoutError}] = 
    useCreateLayoutMutation();

    const [categoriesForCreate, setCategoriesForCreate] = useState<any>([{title: ""}]);

    const [categories, setCategories] = useState<any>([]);
  
    useEffect(()=>{
    if (data?.layout?.categories) {
        setCategories(data.layout.categories);
     }
    },[data?.layout?.categories])

    
    useEffect(() => {
     
        if (createLayoutSuccess) {
            refetch();
          toast.success("Categories created successfully");
        }
    
        if (createLayoutError) {
          if ("data" in createLayoutError) {
            const errorData = createLayoutError as any;
            toast.error(errorData?.data?.message);
          }
        }
      }, [createLayoutSuccess, createLayoutError]);
    
    useEffect(() => {
     
      if (layoutSuccess) {
          refetch();
        toast.success("Categories updated successfully");
      }
  
      if (error) {
        if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData?.data?.message);
        }
      }
    }, [layoutSuccess, error]);


    const isArrayEmpty = (questions: any[])=>{
        if(questions.length === 0){
          return true;
        }
      }

    const handleCategoriesAddForCreate = (id: any, value: string) => {
        setCategoriesForCreate((prevCategory: any) =>
          prevCategory.map((i: any,index:number) => (index === id ? {...i, title: value } : i))
        );
      };

      const newCategoriesHandlerForCreate = () => {
        if (categoriesForCreate.some((c:any)=> c.title === '')) {
          toast.error("Category title cannot be empty");
        } else {
         setCategoriesForCreate((prevCategory: any) => [...prevCategory, { title: "" }]);
        }
      };  

      const createCategoriesHandler = async () => {
        if (
          !isAnyCategoryTitleEmpty(categoriesForCreate)
          && !isArrayEmpty(categoriesForCreate)
        ) {
          await createLayout({
            type: "Categories",
            categories:categoriesForCreate,
          });
        }
      };


  
    const handleCategoriesAdd = (id: any, value: string) => {
      setCategories((prevCategory: any) =>
        prevCategory.map((i: any,index:number) => (index === id ? {...i, title: value } : i))
      );
    };
  
    const newCategoriesHandler = () => {
      if (categories.some((c:any)=> c.title === '')) {
        toast.error("Category title cannot be empty");
      } else {
        setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
      }
    };
  
    const areCategoriesUnchanged = (
      originalCategories: any[],
      newCategories: any[]
    ) => {
      return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };
  
    const isAnyCategoryTitleEmpty = (categories: any[]) => {
      return categories.some((q) => q.title === "");
    };
  
    const editCategoriesHandler = async () => {
      if (
        !areCategoriesUnchanged(data.layout.categories, categories) &&
        !isAnyCategoryTitleEmpty(categories) && !isArrayEmpty(categories)
      ) {
        await editLayout({
          type: "Categories",
          categories,
        });
      }
    };
  
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-[120px] text-center">
            <h1 className={`${formStyles.title}`}>All Categories</h1>
            {data?.layout?.categories ? (
              categories.map((item: any, index: number) => {
                return (
                  <div className="p-3" key={index}>
                    <div className="flex items-center w-full justify-center">
                      <input
                        className={`${formStyles.input} !w-[unset] !border-none !text-[20px]`}
                        value={item.title}
                        onChange={(e) =>
                          handleCategoriesAdd(index, e.target.value)
                        }
                        placeholder="Enter category title..."
                      />
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setCategories((prevCategory: any) =>
                            prevCategory.filter((c: any,i:number) => i !== index)
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })
              ) :  (
                categoriesForCreate.map((item: any, index: number) => {
                    return (
                      <div className="p-3" key={index}>
                        <div className="flex items-center w-full justify-center">
                          <input
                            className={`${formStyles.input} !w-[unset] !border-none !text-[20px]`}
                            value={item.title}
                            onChange={(e) =>
                                handleCategoriesAddForCreate(index, e.target.value)
                            }
                            placeholder="Enter category title..."
                          />
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() => {
                              setCategoriesForCreate((prevCategory: any) =>
                               prevCategory.filter((c: any,i:number) => i !== index)
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
              )}
            <br />
            <br />
            {data?.layout?.categories ? (
            <>
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[25px] cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
            <div
              className={`${
                formStyles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              ${
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories) || isArrayEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }
              !rounded absolute bottom-12 right-12`}
              onClick={
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories) || isArrayEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save
            </div>
            </>
            ) : (
                <>
                <div className="w-full flex justify-center">
                  <IoMdAddCircleOutline
                    className="dark:text-white text-black text-[25px] cursor-pointer"
                    onClick={newCategoriesHandlerForCreate}
                  />
                </div>
                <div
                  className={`${
                    formStyles.button
                  } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                  ${
                    isAnyCategoryTitleEmpty(categoriesForCreate) || isArrayEmpty(categoriesForCreate)
                      ? "!cursor-not-allowed"
                      : "!cursor-pointer !bg-[#42d383]"
                  }
                  !rounded absolute bottom-12 right-12`}
                  onClick={
                    isAnyCategoryTitleEmpty(categoriesForCreate) || isArrayEmpty(categoriesForCreate)
                      ? () => null
                      : createCategoriesHandler
                  }
                >
                  Create
                </div>
                </>
            )}
          </div>
        )}
      </>
    );
  };
  
  export default EditCategories;