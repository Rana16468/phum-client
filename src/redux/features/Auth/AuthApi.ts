import { baseApi } from "../../api/baseApi";

const AuthApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({

        login:builder.mutation({
           query:(userInfo)=>({
            url:"/login-user/",
            method:'POST',
            body:userInfo
           })

        })
    }),
    //.....
    





});
export const {useLoginMutation}=AuthApi