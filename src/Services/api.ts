import Config from '@/Config'
import Logger from '@/Utils/Logger'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.getEP('twilio'),
})

const baseQueryWithInterceptor = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status == 401) {
    // deal with 401 Unauthorized client Err
  }
  return result
}
// let baseHeader = { 'Content-Type': 'application/json' }

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder: any) => ({
    getToken: builder.query({
      query: (passcode: string) => ({
        url: '/',
        body: { passcode },
        method: 'POST',
        // headers: baseHeader,
      }),
      // bodyUsed: true,
    }),
  }),
})

export const { useLazyGetTokenQuery } = api
