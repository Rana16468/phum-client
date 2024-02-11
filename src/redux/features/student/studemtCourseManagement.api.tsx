import { TResponseRedux } from "../../../types/globalErrorHandelar";
import { TEnrolledCourses } from "../../../types/myEnrolledCourse.type";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";


const studemtCourseManagement=baseApi.injectEndpoints({
    endpoints:(builder)=>({

     
        //...get all semester
       getAllOfferedCourses:builder.query({
            query:()=>{
                return {
                    url:"/offered-course/my_offered_course",
                    method:"GET"
                }
            },

           transformResponse:(response:TResponseRedux<TOfferedCourse[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
            providesTags:['phum']
        }),
        // enrolledCourses
        enrolledCourses:builder.mutation({
            query:(data)=>({
                url:"/enrolled-courses/create-enrolled-course",
                method:"POST",
                body:data
            }),
            invalidatesTags:['phum']
            
        }),
        // my-course scheduling 
        myCourseSchedule:builder.query({
            query:()=>{
                return {
                    url:"/enrolled-courses/my-enrolled-courses",
                    method:'GET'
                }
            },
           transformResponse:(response:TResponseRedux<TEnrolledCourses[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
            providesTags:['phum']
        })
        
    })

});

export const {useGetAllOfferedCoursesQuery,useEnrolledCoursesMutation,
useMyCourseScheduleQuery}=studemtCourseManagement;