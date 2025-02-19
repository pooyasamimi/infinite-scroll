import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PageParams = {
    filter? : string,
    page:number
}

const usePagination = (pageParams: PageParams) => {
  const { data, isPending } = useQuery({
    queryKey: ["pagination",pageParams],
    queryFn: async () => {
      const result = await axios.get(
        `https://fakestoreapi.in/api/products?page=${page}&limit=20/category?type=${filter}`
      );
      console.log(result)
      
      return result
    },
  });
  return {data, isPending};
};
export default usePagination;
