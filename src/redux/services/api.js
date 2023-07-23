'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'db/music_db.json',
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '' }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
});

export const {
  useGetTopChartsQuery,
} = coreApi;
