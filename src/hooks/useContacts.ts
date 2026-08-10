import {
  createContact,
  deleteContact,
  getContacts,
} from "@/api/contacts.api.ts";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};
