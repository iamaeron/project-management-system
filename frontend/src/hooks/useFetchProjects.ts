import { getData } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getData("/projects");
      console.log(res);
      return res.data;
    },
  });
};
