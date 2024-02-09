import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import {  TQueryParam, TResponseRedux } from "../../../types/globalErrorHandelar";
import { baseApi } from "../../api/baseApi";



const academicManagmentApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({

       getAllAcademicSemester:builder.query({
           query:(args)=>{
            const params= new URLSearchParams();

            args.forEach((item:TQueryParam)=>{
                params.append(item.name,item.value as string);
            })
        

            return{
                
                    url:"/academic-semester/",
                    method:'GET',
                    params:params          
            }
           },
           transformResponse:(response:TResponseRedux<TAcademicSemester[]>)=>{
            return {data:response?.data,  meta: response?.meta};
           },
           providesTags:['phum']
        }),
        // add academic semester
        addAcademicSemester:builder.mutation({
            query:(data)=>({
                url:'/academic-semester/create-academic-semester',
                method:"POST",
                body:data
            }),
            invalidatesTags:['phum']
        }),
        // add Academic Faculty 
        addAcademicFaculty:builder.mutation({
            query:(data)=>({
                url:'/academic-faculty/create-AcademicFaculty',
                method:"POST",
                body:data
            }),
            invalidatesTags:['phum']
        }),
        //... find all Academic Faculty
        getAllAcademicFaculty:builder.query({
            query:()=>{
                return {
                    url:"/academic-faculty/all-AcademicFaculty",
                    method:"GET"
                }  
            },
            transformResponse:(response:TResponseRedux<TAcademicFaculty[]>)=>{
         
                return {data:response?.data,  meta: response?.meta};

               },
            providesTags:['phum']
        }),
        //....add Academic Department
        addAcademicDepartment:builder.mutation({
            query:(data)=>{
                return {
                    url:"/academic-department/create-AcademicDepartment",
                    method:"POST",
                    body:data
                }
            },
            invalidatesTags:['phum']
        }),
        // get all Academic department 
        getAllAcademicDepartment:builder.query({
            query:()=>{
                return{
                    url:"/academic-department/all-AcademicDepartment",
                    method:"GET"
                }
            },
            transformResponse:(response:TResponseRedux<TAcademicDepartment[]>)=>{

                return {data:response?.data,  meta: response?.meta};
            },
            providesTags:['phum']

        })
    
}),
});

export const  {useGetAllAcademicSemesterQuery,useAddAcademicSemesterMutation,
useAddAcademicFacultyMutation,useGetAllAcademicFacultyQuery,
useAddAcademicDepartmentMutation,useGetAllAcademicDepartmentQuery
}=academicManagmentApi;

