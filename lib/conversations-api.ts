import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Conversation } from "./types";

// Define the conversations API
export const conversationsApi = createApi({
  reducerPath: "conversationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    getConversations: builder.query<
      { conversations: Conversation[] },
      { leadId?: string; type?: string }
    >({
      query: ({ leadId, type }) => {
        let url = "/conversations";
        const params = new URLSearchParams();
        if (leadId) params.append("leadId", leadId);
        if (type) params.append("type", type);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.conversations.map(({ id }) => ({
                type: "Conversation" as const,
                id,
              })),
              { type: "Conversation", id: "LIST" },
            ]
          : [{ type: "Conversation", id: "LIST" }],
    }),

    getConversation: builder.query<{ conversation: Conversation }, string>({
      query: (id) => `/conversations/${id}`,
      providesTags: (result, error, id) => [{ type: "Conversation", id }],
    }),

    addConversation: builder.mutation<
      { conversation: Conversation },
      Partial<Conversation>
    >({
      query: (body) => ({
        url: "/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Conversation", id: "LIST" }],
    }),

    updateConversation: builder.mutation<
      { conversation: Conversation },
      { id: string; body: Partial<Conversation> }
    >({
      query: ({ id, body }) => ({
        url: `/conversations/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Conversation", id },
      ],
    }),

    deleteConversation: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Conversation", id }],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
} = conversationsApi;
