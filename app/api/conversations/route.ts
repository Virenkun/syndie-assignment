import { NextRequest, NextResponse } from "next/server";
import {
  getConversations,
  createConversation,
  formatConversation,
} from "@/lib/leads-service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get("leadId");
    const type = searchParams.get("type");

    // Define type for filters
    interface ConversationFilters {
      leadId?: number;
      type?: string;
    }

    // Build filter object based on query parameters
    const filters: ConversationFilters = {};

    if (leadId) {
      filters.leadId = parseInt(leadId);
    }

    if (type) {
      filters.type = type;
    }

    // Fetch conversations using the service layer
    const conversations = await getConversations(filters);

    // Map database objects to API type using the format helper
    const formattedConversations = conversations.map((conversation) => {
      // Ensure each conversation has the required lead property
      return formatConversation(
        conversation as typeof conversation & { lead: { name: string } }
      );
    });

    return NextResponse.json({ conversations: formattedConversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.leadId || !data.type || !data.content) {
      return NextResponse.json(
        { error: "leadId, type, and content are required fields" },
        { status: 400 }
      );
    }

    // Prepare data for the service
    const conversationData = {
      leadId: parseInt(data.leadId),
      type: data.type,
      content: data.content,
      timestamp: new Date(),
      followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
    };

    // Create a new conversation using the service layer
    const newConversation = await createConversation(conversationData);

    // Format the response
    const formattedConversation = formatConversation(
      newConversation as typeof newConversation & { lead: { name: string } }
    );

    return NextResponse.json({ conversation: formattedConversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}
