'use client'

import { 
  BarChart,
  Bar, 
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList
} from "recharts"
import Loader from "../../Loader/Loader"
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { formStyles } from "@/app/styles/styles";

const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

    
  return (
   <>
   {isLoading ? (
    <Loader/>
   ) : (
     <div >
          <div className="mt-[50px] max-md:flex max-md:flex-col max-md:items-center">
            <h1 className={`${formStyles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${formStyles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className="w-full flex items-center mt-[15vh] h-[70vh] justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[0, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
   </>
  )
}

export default CourseAnalytics