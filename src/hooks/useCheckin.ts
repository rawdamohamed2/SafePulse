import { useMutation } from "@tanstack/react-query";
import { confirmCheckin } from "@/api/checkin.api.ts";

export const useCheckin = () => {
  return useMutation({
    mutationFn: confirmCheckin,
  });
};
