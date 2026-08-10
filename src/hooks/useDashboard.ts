import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/api/dashboard.api.ts";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};
