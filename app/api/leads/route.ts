import { NextRequest, NextResponse } from "next/server";
import { getLeads, createLead } from "@/lib/leads-service";

export async function GET() {
  const leads = await getLeads();
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const lead = await createLead(data);
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead: " + error },
      { status: 400 }
    );
  }
}
