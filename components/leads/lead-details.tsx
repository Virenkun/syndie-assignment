"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Lead } from "@/lib/types";
import { Mail, Linkedin, Building2, CalendarDays, Clock } from "lucide-react";

interface LeadDetailsProps {
  lead: Lead;
}

export function LeadDetails({ lead }: LeadDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Card */}
        <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
              Email
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 break-all">
              {lead.email}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-100/60 dark:bg-blue-900/60 backdrop-blur p-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </span>
              <span className="text-muted-foreground">Contact Email</span>
            </div>
          </CardFooter>
        </Card>

        {/* LinkedIn Card */}
        <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
              LinkedIn
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {lead.linkedin ? (
                <a
                  href={
                    lead.linkedin.startsWith("http")
                      ? lead.linkedin
                      : `https://${lead.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition"
                >
                  View Profile
                </a>
              ) : (
                <span className="text-muted-foreground">Not provided</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-100/60 dark:bg-blue-900/60 backdrop-blur p-2">
                <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </span>
              <span className="text-muted-foreground">
                Professional Profile
              </span>
            </div>
          </CardFooter>
        </Card>

        {/* Company Card */}
        <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
              Company
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {lead.company}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-green-100/60 dark:bg-green-900/60 backdrop-blur p-2">
                <Building2 className="h-4 w-4 text-green-600 dark:text-green-300" />
              </span>
              <span className="text-muted-foreground">Organization</span>
            </div>
          </CardFooter>
        </Card>

        {/* Created Card */}
        <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
              Created
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatDate(lead.createdAt).split(",")[0]}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-purple-100/60 dark:bg-purple-900/60 backdrop-blur p-2">
                <CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </span>
              <span className="text-muted-foreground">
                {formatDate(lead.createdAt).split(",")[1]}
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Last Updated Card */}
      <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
            Last Updated
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatDate(lead.updatedAt).split(",")[0]}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full bg-yellow-100/60 dark:bg-yellow-900/60 backdrop-blur p-2">
              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
            </span>
            <span className="text-muted-foreground">
              {formatDate(lead.updatedAt).split(",")[1]}
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Notes Card */}
      <Card className="rounded-xl shadow-md border border-white/30 dark:border-zinc-700/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition hover:shadow-lg">
        <CardHeader>
          <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground font-semibold">
            Notes
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pt-2 pb-4">
          <div className="rounded-lg bg-white/40 dark:bg-zinc-800/40 backdrop-blur px-4 py-3 min-h-[56px] border border-white/20 dark:border-zinc-700/30">
            {lead.notes ? (
              <p className="whitespace-pre-line text-zinc-800 dark:text-zinc-100">
                {lead.notes}
              </p>
            ) : (
              <span className="text-muted-foreground">No notes added yet</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
