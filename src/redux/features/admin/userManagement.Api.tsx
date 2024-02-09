import { TFaculty } from "../../../types/academicFaculty.type";
import { TQueryParam, TResponseRedux } from "../../../types/globalErrorHandelar";
import { TStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagement=baseApi.injectEndpoints({
    endpoints:(builder)=>({

        addStudent:builder.mutation({
            query:(data)=>({
                url:'/user/create-student',
                method:"POST",
                body:data
            }),
            invalidatesTags:['phum']
        }),
        // get All Student

        getAllStudents:builder.query({
            
            query:(args)=>{
                const params= new URLSearchParams();

            args.forEach((item:TQueryParam)=>{
                params.append(item.name,item.value as string);
            })
                return {
                    url:"/students/getAllStudent",
                    method:"GET",
                    params:params
                }
            },
            transformResponse:(response:TResponseRedux<TStudent[]>)=>{
                return {data:response?.data,  meta: response?.meta};
            },
            providesTags:['phum']
        }),
        // get specific student by Id
        getStudentById:builder.query({
            query:(studentId)=>{
                return{
                    url:`/students/specificStuden/${studentId}`,
                    method:"GET"
                }
            },
            providesTags:["phum"]
        }),

        // update Student Information
        updateStudent:builder.mutation({
            query:(studentUpdate)=>{
                return{
                    url:`/students/update-student/${studentUpdate.id}`,
                    method:"PATCH",
                    body:studentUpdate?.modifyStudent
                }
            },
            invalidatesTags:['phum']
        }),
        // academic faculty
        getAllFaculty:builder.query({
            query:()=>{
                return {
                    url:"/faculty/",
                    method:"GET"
                }
            },
            transformResponse:(response:TResponseRedux<TFaculty[]>)=>{
                return {data:response?.data,  meta: response?.meta};
            },
            providesTags:['phum']
        })
    })

});
export const  {useAddStudentMutation,useGetAllStudentsQuery,useGetStudentByIdQuery,
    useUpdateStudentMutation,useGetAllFacultyQuery}=userManagement;
