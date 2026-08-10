import { Card, CardContent } from "@/components/ui/Card.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { Edit2, Phone, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex items-center gap-">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-slate-600"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-danger-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px] my-3" />

            <Skeleton className="flex items-center gap-2 my-3 text-sm text-slate-600 mb-4 bg-slate-50 px-3 py-2 rounded-lg">
              <Phone className="h-4 w-4 text-slate-400 shrink-0" />
            </Skeleton>

            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoadingCard;
