import { TCourse, TSemetser } from "../../../types/courseManagement.type";
import { TQueryParam, TResponseRedux } from "../../../types/globalErrorHandelar";
import { baseApi } from "../../api/baseApi";

const courseManagement=baseApi.injectEndpoints({
    endpoints:(builder)=>({

        addSemester:builder.mutation({
            query:(data)=>({
                url:'/semester-registration/',
                method:"POST",
                body:data
            }),
            invalidatesTags:['phum']
        }),
        //...get all semester
        getAllSemester:builder.query({
            query:(args)=>{

                const params= new URLSearchParams();

            args.forEach((item:TQueryParam)=>{
                params.append(item.name,item.value as string);
            })
                return {
                    url:"/semester-registration/",
                    method:"GET",
                    params:params
                }
            },

           transformResponse:(response:TResponseRedux<TSemetser[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
            providesTags:['phum']
        }),
        // update semester statud
        updateSemesterStatus:builder.mutation({
            query:(data)=>{
                return {
                    url:`/semester-registration/${data.id}`,
                    method:"PATCH",
                    body:data?.data
                }
            },
            invalidatesTags:["phum"]
        }),
        // get All Courses
        getAllCourse:builder.query({
         
            query:()=>{
                return {
                    url:"/courses/",
                    method:"GET"
                }
            },
            
           transformResponse:(response:TResponseRedux<TCourse[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
            providesTags:['phum']

        }),
        // addCourses
        addCourses:builder.mutation({
            query:(data)=>{
                return{
                    url:'/courses/create-course',
                    method:"POST",
                    body:data
                }
            },
            invalidatesTags:['phum']
        }),
        // add course faculties
        addCourseFaculties:builder.mutation({
            query:(args)=>{
                return{
                    url:`/courses/${args.courseId}/assign-faculties`,
                    method:"PUT",
                    body:args?.data
                }
            },
            invalidatesTags:['phum']
        }),
        //courses/65c4d73b982a2a6fff160483/get-faculty
        // get course with faculties
        getCourseFaculties: builder.query({
            query: (id) => {
              return {
                url: `courses/${id}/get-faculty`,
                method: 'GET',
              };
            },
            providesTags:['phum']
            
          }),
    })

});

export const{useAddSemesterMutation,useGetAllSemesterQuery,
    useUpdateSemesterStatusMutation,useGetAllCourseQuery,
    useAddCoursesMutation,useAddCourseFacultiesMutation,useGetCourseFacultiesQuery}=courseManagement