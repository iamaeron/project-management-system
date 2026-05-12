import { getData } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchSingleProject = (id: string) => {
  return useQuery({
    queryKey: ["single_project"],
    queryFn: async () => {
      const res = await getData(`/projects/${id}`);
      console.log(res);
      return res.data;
    },
  });
};
