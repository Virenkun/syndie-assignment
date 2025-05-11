import { NextRequest, NextResponse } from "next/server";
import {
  getConversationById,
  updateConversation,
  deleteConversation,
  formatConversation,
} from "@/lib/leads-service";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = params.id;

  try {
    const conversation = await getConversationById(parseInt(id));

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Use the helper function to format the conversation for the API response
    const formattedConversation = formatConversation(conversation);

    return NextResponse.json({ conversation: formattedConversation });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = params.id;

  try {
    const data = await request.json();
    const numericId = parseInt(id);

    // Define type for conversation update data
    interface ConversationUpdateData {
      type?: string;
      content?: string;
      timestamp?: Date;
      followUpDate?: Date | null;
    }

    // Prepare the update data
    const updateData: ConversationUpdateData = {};

    if (data.type) updateData.type = data.type;
    if (data.content) updateData.content = data.content;
    if (data.timestamp) updateData.timestamp = new Date(data.timestamp);
    if (data.followUpDate)
      updateData.followUpDate = new Date(data.followUpDate);
    if (data.followUpDate === null) updateData.followUpDate = null;

    // Update conversation through the service layer
    const updatedConversation = await updateConversation(numericId, updateData);

    // Format the response
    const formattedConversation = formatConversation(updatedConversation);

    return NextResponse.json({ conversation: formattedConversation });
  } catch (error) {
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = params.id;

  try {
    // Delete the conversation through the service layer
    await deleteConversation(parseInt(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
