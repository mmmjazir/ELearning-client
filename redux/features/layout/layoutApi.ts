import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query: (type)=> ({
               url: `get-layout/${type}`,
               method: 'GET',
               credentials: 'include' as const   
            })
        }),
        createLayout: builder.mutation({
            query:(data)=> ({
                url: 'create-layout',
                method: 'POST',
                body: data,
                credentials: 'include' as const
            })
        }),
        editLayout: builder.mutation({
            query:(data)=> ({
                url: `edit-layout`,
                method: 'PUT',
                body: data,
                credentials: 'include' as const
            })
        })
    })
})

export const {useGetHeroDataQuery,useEditLayoutMutation,useCreateLayoutMutation} = layoutApi;