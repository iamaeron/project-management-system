import { getData } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await getData("/clients");
      console.log(res);
      return res.data;
    },
  });
};
