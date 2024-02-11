import { TQueryParam, TResponseRedux } from "../../../types/globalErrorHandelar";
import { TEnrolledCourses } from "../../../types/myEnrolledCourse.type";
import { baseApi } from "../../api/baseApi";



const facultyCoursesManagement=baseApi.injectEndpoints({
    endpoints:(builder)=>({

     
        //...get all semester
       getAllFacultyCourses:builder.query({

        
            query:(args)=>{
                const params= new URLSearchParams();

                args.forEach((item:TQueryParam)=>{
                    params.append(item.name,item.value as string);
                })
                return {
                    url:"/enrolled-courses/",
                    method:"GET",
                    params:params
                }
            },

           transformResponse:(response:TResponseRedux<TEnrolledCourses[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
            providesTags:['phum']
        }),
        // added markes 
        addMarks:builder.mutation({
            query:(data)=>({
                url:"/enrolled-courses/update-enrolled-course-marks",
                method:"PATCH",
                body:data

            }),
            invalidatesTags:['phum']
        })

})
});

export const {useGetAllFacultyCoursesQuery,useAddMarksMutation}=facultyCoursesManagement