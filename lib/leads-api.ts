import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Lead } from "@/lib/types";

export const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/leads" }),
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => "",
      providesTags: ["Leads"],
    }),
    getLead: builder.query<Lead, number | string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Leads", id }],
    }),
    addLead: builder.mutation<Lead, Partial<Lead>>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    updateLead: builder.mutation<
      Lead,
      { id: number | string; body: Partial<Lead> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Leads", id }],
    }),
    deleteLead: builder.mutation<{ success: boolean }, number | string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Leads", id }],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadQuery,
  useAddLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi;
