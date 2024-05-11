'use client'
import {
    useCreateLayoutMutation,
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";
import { formStyles } from "@/app/styles/styles";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess:editLayoutSuccess, error:editLayoutError }] = useEditLayoutMutation();

  const [createLayout, {isSuccess:createLayoutSuccess, error:createLayoutError}] = useCreateLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  const [createQuestions, setCreateQuestions] = useState([{question: "",answer: ""}])

  const [activeQuestionsForCreate, setActiveQuestionForCreate] = useState<Record<string, boolean>>({});

  const [activeQuestions, setActiveQuestions] = useState<Record<string, boolean>>({});


   useEffect(()=>{
    if (data) {
        setQuestions(data.layout?.faq);
        }
    },[data])

useEffect(()=> {
  if(createLayoutSuccess){
        toast.success("FAQ created successfully");
        refetch();
    }

    if(createLayoutError){
        if ("data" in createLayoutError) {
            const errorData = createLayoutError as any;
            toast.error(errorData?.data?.message);
          }
    }
   
},[createLayoutSuccess,createLayoutError])


  useEffect(() => {
  
    if(editLayoutSuccess){
        toast.success("FAQ updated successfully");
        refetch();
    }

    if(editLayoutError){
        if ("data" in editLayoutError) {
            const errorData = editLayoutError as any;
            toast.error(errorData?.data?.message);
          }
    }
  }, [editLayoutSuccess,editLayoutError]);


const toggleQuestion = (index: number) => {
    setActiveQuestions((prevActiveQuestions:any) => ({
      ...prevActiveQuestions,
      [index]: !prevActiveQuestions[index]
    }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q,i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q,i) => (i === index ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // Function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions?.some((q) => q.question === "" || q.answer === "");
  };

  const isArrayEmpty = (questions: any[])=>{
    if(questions?.length === 0){
      return true;
    }
  }

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };



  const toggleQuestionForCreate = (id: number) => {
    setActiveQuestionForCreate((prevActiveQuestions:any) => ({
      ...prevActiveQuestions,
      [id]: !prevActiveQuestions[id]
    }));
  };
  const handleQuestionChangeForCreate = (index:number, value: string) => {
    setCreateQuestions((prevQuestions) =>
      prevQuestions.map((q,i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChangeForCreate = (index: number, value: string) => {
    setCreateQuestions((prevQuestions) =>
      prevQuestions.map((q,i) => (i === index ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandlerForCreate = () => {
    setCreateQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: "",
        answer: "",
        active: false
      },
    ]);
  };

  const isAnyQuestionEmptyForCreate = (createQuestions: any[]) => {
    return createQuestions?.some((q) => q.question === "" || q.answer === "");
  };

  const handleCreate = async () => {
    if (
      !isAnyQuestionEmpty(createQuestions) && !isArrayEmpty(createQuestions)
    ) {
      const data = {
        type: "FAQ",
        faq: createQuestions,
      }     
      await createLayout(data);
    }
  };



  return (
   <>
   {
    isLoading ? (
        <Loader />
    ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
        <div className="mt-12">
          <dl className="space-y-8">
            {questions ? (
            questions.map((q: any, index:number) => (
              <div
                key={index}
                className={`${
                  index !== 0 && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                  >
                    <input
                      className={`${formStyles.input} border-none`}
                      value={q.question}
                      onChange={(e: any) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      placeholder={"Add your question..."}
                    />
  
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestions[index] ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="h-6 w-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestions[index] && (
                  <dd className="mt-2 pr-12">
                    <input
                      className={`${formStyles.input} border-none`}
                      value={q.answer}
                      onChange={(e: any) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      placeholder={"Add your answer..."}
                    />
                    <span className="ml-6 flex-shrink-0">
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setQuestions((prevQuestions) =>
                            prevQuestions.filter((item,i) => i !== index)
                          );
                        }}
                      />
                    </span>
                  </dd>
                )}
              </div>
            ))
            ) : (
                createQuestions.map((q:any,index:number)=> (
                <div
                key={index}
                className={`${
                  index !== 0 && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestionForCreate(index)}
                  >
                    <input
                      className={`${formStyles.input} border-none`}
                      value={q.question}
                      onChange={(e: any) =>
                        handleQuestionChangeForCreate(index, e.target.value)
                      }
                      placeholder={"Add your question..."}
                    />
  
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestionsForCreate[index] ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="h-6 w-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestionsForCreate[index] && (
                  <dd className="mt-2 pr-12">
                    <input
                      className={`${formStyles.input} border-none`}
                      value={q.answer}
                      onChange={(e: any) =>
                        handleAnswerChangeForCreate(index, e.target.value)
                      }
                      placeholder={"Add your answer..."}
                    />
                    <span className="ml-6 flex-shrink-0">
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setCreateQuestions((prevQuestions) =>
                            prevQuestions.filter((item,i) => i !== index)
                          );
                        }}
                      />
                    </span>
                  </dd>
                )}
              </div>
              ))
            )}
          </dl>
          <br />
          <br />
          <IoMdAddCircleOutline
            className="dark:text-white text-black text-[25px] cursor-pointer"
            onClick={data?.layout?.faq ? newFaqHandler : newFaqHandlerForCreate}
          />
        </div>
  
      {data?.layout?.faq ? (  
        <div
          className={`${
            formStyles.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              ${
                areQuestionsUnchanged(data.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions) || isArrayEmpty(questions)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }
              !rounded fixed bottom-12 right-12`}
          onClick={
            areQuestionsUnchanged(data.layout?.faq, questions) ||
            isAnyQuestionEmpty(questions) || isArrayEmpty(questions)
              ? () => null
              : handleEdit
          }
        >
          Save
        </div>
        ) : (
        <div
          className={`${
            formStyles.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              ${
                isAnyQuestionEmptyForCreate(createQuestions) || isArrayEmpty(createQuestions)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }
              !rounded fixed bottom-12 right-12`}
          onClick={
            isAnyQuestionEmptyForCreate(createQuestions) || isArrayEmpty(createQuestions)
              ? () => null
              : handleCreate
          }
        >
          Create
        </div>
        )}
      </div>
    )
   }
   </>
  );
};

export default EditFaq;