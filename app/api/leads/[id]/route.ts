import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead, deleteLead } from "@/lib/leads-service";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = Number(params.id);
  const lead = await getLeadById(id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json(lead);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = Number(params.id);
  const data = await req.json();
  try {
    const lead = await updateLead(id, data);
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lead: " + error },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const id = Number(params.id);
  try {
    const lead = await deleteLead(id);
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete lead: " + error },
      { status: 400 }
    );
  }
}
