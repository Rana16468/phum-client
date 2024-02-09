

import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/Auth/AuthSlice';
import { toast } from 'sonner';
//credentials:"include" means cookes access first point 
//Token Access process --->https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#prepareheaders
const baseQuery=fetchBaseQuery({baseUrl:"http://localhost:3005/api/v1",
credentials:"include",
prepareHeaders:(headers, { getState })=>{

    const token = (getState() as RootState).auth.token;
    if (token) {
        headers.set('authorization',`${token}`)
      }
      return headers
}

});
// base query with refresh token 
//https://redux-toolkit.js.org/rtk-query/api/createApi#baseQuery(Type SetUrl)
//https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-custom-basequery
const baseQueryWithRefreshToken:BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType>= async(args,api,extraOptions):Promise<any>=>{


    let result=await baseQuery(args,api,extraOptions);
    
    if(result?.error?.status===404)
    {
        toast.error("User Not Founded")
    }
   // console.log(result);
    if(result?.error?.status===401)
    {
        const res=await fetch('http://localhost:3005/api/v1/login-user/refresh-token/',{
            method:"POST",
            credentials:"include"
        });
        const data=await res.json();

        if(data?.data?.accessToken)
        {

            const user=(api.getState() as RootState).auth.user;
            api.dispatch(setUser({
            user,
            token:data?.data?.accessToken
        }))
            result=await baseQuery(args,api,extraOptions)
        }
        else{
            api.dispatch(logout());
        }

       
        

    }
    return result;


}
export const baseApi=createApi({
    reducerPath: 'baseApi',
    baseQuery:baseQueryWithRefreshToken,
    tagTypes:["phum"],
    
    endpoints:()=>({})
  
})

