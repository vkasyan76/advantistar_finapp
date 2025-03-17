import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoaderCard({ title }: { title: string }) {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[120px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
}
