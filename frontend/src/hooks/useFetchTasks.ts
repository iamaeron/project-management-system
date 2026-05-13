import { getData } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getData(`/projects/${projectId}/tasks`);
      return res.data;
    },
  });
};
