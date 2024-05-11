import { apiSlice } from "../api/apiSlice";
import { userChangeEmail } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: ({avatar}) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateName: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-name",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    sendNewEmailOtp: builder.mutation({
     query: ({ newEmail }) => ({
       url: 'change-user-email',
       method: 'POST',
       body: {
        newEmail
       },
       credentials: 'include' as const,
     }),

     async onQueryStarted(arg,{queryFulfilled,dispatch}){
       try {
        const result = await queryFulfilled;
        dispatch(
          userChangeEmail({
            updateEmailToken: result.data.updateEmailToken
          })
        )
       } catch (error: any) {
        console.log(error);
       }
     }
    }),

   updateEmail: builder.mutation({
     query: (data) => ({
      url: 'update-user-email',
      method: 'PUT',
      body: data,
      credentials: "include" as const,
     }),

     async onQueryStarted(arg,{queryFulfilled,dispatch}){
      try {
       await queryFulfilled;
       dispatch(
         userChangeEmail({
           updateEmailToken: ''
         })
       )
      } catch (error: any) {
       console.log(error);
      }
    }
   }),
   
   updatePassword: builder.mutation({
     query: (data)=> ({
      url: 'update-user-password',
      method: 'PUT',
      body: data,
      credentials: 'include' as const
     }),
   }),
   getAllUsers:  builder.query({
    query: ({page})=> ({
      url: `get-users?page=${page}`,
      method:'GET',
      credentials: "include" as const
    })
   }),
   updateUserRole: builder.mutation({
    query: ({email, role})=> ({
      url: 'update-user',
      method:'PUT',
      body:{email, role},
      credentials:'include' as const
    })
   }),
   deleteUser: builder.mutation({
    query:(id)=> ({
      url: `delete-user/${id}`,
      method: 'DELETE',
      credentials: 'include' as const
    })
   })

  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateNameMutation,
  useSendNewEmailOtpMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;