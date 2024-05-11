import { formStyles } from "@/app/styles/styles";
import { title } from "process";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Props {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: any;
}

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);


  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links.some((link:{title:string,url:string}) => (
        link.title === "" || link.url === ""
      )) ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };


  const addNewSection = () => {
    if (
      courseContentData.some((item:any) => (
        item.title === "" ||
        item.description === "" ||
        item.videoUrl === "" ||
        item.links.some((link:{title:string,url:string}) => (
          link.title === "" || link.url === ""
        )) ||
        item.videoLength === ""
      ))
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection((prev)=> prev + 1)
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      courseContentData.some((item:any) => (
        item.title === "" ||
        item.description === "" ||
        item.videoUrl === "" ||
        item.links.some((link:{title:string,url:string}) => (
          link.title === "" || link.url === ""
        ))
      ))
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-20 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
                key={index}
              >

               {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } focus:border-b-2 border-gray-400 font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] ={ ...updatedData[index],videoSection: e.target.value};
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}


                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] && item.title && (
                    <p className="font-Poppins w-full flex dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  )}

                  {/* arrow button for collapsed video content */}
                  <div className="w-full flex justify-end items-center">
                   {index > 0 && (
                    <AiOutlineDelete
                      className={`dark:text-white text-black text-[20px] mr-2 
                  ${index > 0 ? "cursor-pointer" : "cursor-no-drop"} 
                    `}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                          setActiveSection((prev)=> prev-1)
                        }
                      }}
                    />
                    )}
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className={`dark:text-white text-black ${
                        isCollapsed[index] ? "rotate-180" : "rotate-0"
                      }`}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                  <div className="my-3">
                     <label className={formStyles.label}>Video Title</label>
                      <input 
                      type="text"
                      placeholder="Project Plan..."
                      className={`${formStyles.input}`}
                      value={item.title}
                      onChange={(e)=> {
                        const updatedData= [...courseContentData];
                        updatedData[index] ={ ...updatedData[index],title: e.target.value};
                        setCourseContentData(updatedData);
                      }}
                      />
                  </div>

                  <div className="mb-3">
                     <label className={formStyles.label}>Video Url</label>
                      <input 
                      type="text"
                      placeholder="jdssdh"
                      className={`${formStyles.input}`}
                      value={item.videoUrl}
                      onChange={(e)=> {
                        const updatedData= [...courseContentData];
                        updatedData[index] ={ ...updatedData[index],videoUrl: e.target.value};
                        setCourseContentData(updatedData);
                      }}
                      />
                  </div>

                 
                    <div className="mb-3">
                      <label className={formStyles.label}>Video Length (in minutes)</label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${formStyles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] ={ ...updatedData[index],videoLength: e.target.value};
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                  <div className="mb-3">
                     <label className={formStyles.label}>Video Description</label>
                      <textarea 
                      rows={8}
                      cols={30}
                      placeholder="jdssdh"
                      className={`${formStyles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e)=> {
                        const updatedData= [...courseContentData];
                        updatedData[index] ={ ...updatedData[index],description: e.target.value};

                        setCourseContentData(updatedData);
                      }}
                      />
                      <br />
                  </div>
                  
                  {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={formStyles.label}>
                            Link {linkIndex + 1}
                          </label>
                          {linkIndex > 0 && (
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${formStyles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                           updatedData[index] = {
                            ...updatedData[index],
                            links: updatedData[index].links.map((linkItem:any,i:number)=>{
                              if(i === linkIndex){
                                return {
                                  ...linkItem,
                                  title:e.target.value
                                };  
                              }
                              return linkItem
                            })
                           }
                              
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${formStyles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: updatedData[index].links.map((linkItem:any,i:number)=>{
                                if(i === linkIndex){
                                  return {
                                    ...linkItem,
                                    url:e.target.value
                                  };  
                                }
                                return linkItem
                              })
                             }
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                  {/* add new content */}
                  {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>     
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
