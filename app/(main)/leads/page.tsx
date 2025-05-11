"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TableIcon, Kanban } from "lucide-react";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadsKanban } from "@/components/leads/leads-kanban";
import { LeadFilters } from "@/components/leads/lead-filters";
import { AddLeadDialog } from "@/components/leads/add-lead-dialog";

export default function LeadsPage() {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view") || "table";

  const handleViewChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", value);
    router.push(`/leads?${params.toString()}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Button onClick={() => setIsAddLeadOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <LeadFilters />

      <Tabs value={view} onValueChange={handleViewChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">
            <TableIcon className="h-4 w-4 mr-2" />
            Table View
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <Kanban className="h-4 w-4 mr-2" />
            Kanban View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="space-y-4">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="kanban" className="space-y-4">
          <LeadsKanban />
        </TabsContent>
      </Tabs>

      <AddLeadDialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen} />
    </div>
  );
}
