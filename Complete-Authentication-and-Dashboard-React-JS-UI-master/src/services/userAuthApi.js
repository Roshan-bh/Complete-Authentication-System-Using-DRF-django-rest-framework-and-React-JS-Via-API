
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
   userRegistration:builder.mutation({
    query:(user)=>{
        return{
            url:'register/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
   }),
   userLogin:builder.mutation({
    query:(user)=>{
        return{
            url:'login/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
   }),
   provileData:builder.query({
    query:(access_token)=>{
        return{
            url:'profile/',
            method:'GET',
            headers:{
                'authorization':`Bearer ${access_token}`,
            }
        }
    }
   }),
   changeUserPassword:builder.mutation({
    query:({realData,access_token})=>{
        return{
            url:'change_password/',
            method:'POST',
            body:realData,
            headers:{
                'authorization': `Bearer ${access_token}`,
            }
        }
    }
   }),
   sendUserPasswordResetMail:builder.mutation({
    query:(user)=>{
        return{
            url:'password_reset_send/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
   }),
   resetUserPassword:builder.mutation({
    query:({realData,id,token})=>{
        return{
            url: `/reset_password/${id}/${token}/`,
            method:'POST',
            body:realData,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
   }),
  }),
})

export const { useUserRegistrationMutation , useUserLoginMutation,
useProvileDataQuery, useChangeUserPasswordMutation,
useSendUserPasswordResetMailMutation,useResetUserPasswordMutation} = userAuthApi