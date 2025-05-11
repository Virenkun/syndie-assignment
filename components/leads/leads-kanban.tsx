"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Lead } from "@/lib/types";
import Link from "next/link";
import { useGetLeadsQuery, useUpdateLeadMutation } from "@/lib/leads-api";

type StageColumn = {
  id: string;
  title: string;
  leadIds: string[];
};

export function LeadsKanban() {
  const stageOrder = ["New", "Contacted", "Converted", "Lost"];
  const { data: leads = [], isLoading } = useGetLeadsQuery();
  const [updateLead] = useUpdateLeadMutation();

  const columns = stageOrder.reduce((acc, stage) => {
    acc[stage] = {
      id: stage,
      title: stage,
      leadIds: leads
        .filter((lead) => lead.stage === stage)
        .map((lead) => String(lead.id)),
    };
    return acc;
  }, {} as Record<string, StageColumn>);

  const leadsById = leads.reduce((acc, lead) => {
    acc[String(lead.id)] = lead;
    return acc;
  }, {} as Record<string, Lead>);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (startColumn.id !== endColumn.id) {
      await updateLead({ id: draggableId, body: { stage: endColumn.id } });
    }
  };

  const getColumnBackgroundColor = (columnId: string) => {
    switch (columnId) {
      case "New":
        return "bg-blue-50";
      case "Contacted":
        return "bg-yellow-50";
      case "Converted":
        return "bg-green-50";
      case "Lost":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getColumnHeaderColor = (columnId: string) => {
    switch (columnId) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100";
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading leads...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stageOrder.map((columnId) => {
          const column = columns[columnId];
          const columnLeads = column.leadIds.map((leadId) => leadsById[leadId]);

          return (
            <div
              key={column.id}
              className={`rounded-md border ${getColumnBackgroundColor(
                column.id
              )} p-2`}
            >
              <div
                className={`rounded-md p-2 mb-3 font-medium ${getColumnHeaderColor(
                  column.id
                )}`}
              >
                <div className="flex justify-between items-center">
                  <h3>{column.title}</h3>
                  <Badge variant="outline">{columnLeads.length}</Badge>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 min-h-[200px]"
                  >
                    {columnLeads.map((lead, index) => (
                      <Draggable
                        key={lead.id}
                        draggableId={String(lead.id)}
                        index={index}
                      >
                        {(provided) => (
                          <Link href={`/leads/${lead.id}`} className="block">
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="cursor-pointer hover:shadow-md transition-shadow"
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {lead.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {lead.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {lead.company}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {lead.tags.slice(0, 2).map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                  {lead.tags.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{lead.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
