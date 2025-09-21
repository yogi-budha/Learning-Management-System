import React from "react";
// Shadcn/ui Card components are used for structure — adjust import path to your project
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function CardSkeleton({ variant = "default", className = "" }) {
  if (variant === "compact") {
    return (
      <Card className={`p-3 w-full max-w-sm ${className}`}>
        <CardContent className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full animate-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="flex-1">
            <div className="h-3 w-3/4 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700 mb-2" />
            <div className="h-2 w-1/2 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="w-full h-44 bg-slate-200 dark:bg-slate-700 animate-pulse" />

      <CardContent>
        <CardHeader className="p-0 mb-3">
          <CardTitle className="p-0">
            <div className="h-4 w-1/2 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700 mb-2" />
          </CardTitle>
        </CardHeader>

        <div className="space-y-2">
          <div className="h-3 w-full rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-5/6 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-2/3 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <div className="flex items-center justify-between w-full">
          <div className="h-8 w-24 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-10 rounded-md animate-pulse bg-slate-200 dark:bg-slate-700" />
        </div>
      </CardFooter>
    </Card>
  );
}


