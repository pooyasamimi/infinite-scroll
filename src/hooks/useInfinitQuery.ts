import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useInfiniteProducts() {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteProducts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const products = await axios.get(
        `https://fakestoreapi.in/api/products?limit=20&page=${pageParam}`
      );
      console.log(products.data.products);
      
      return products.data;
    },
    getNextPageParam: (lastPage,pages) => {
      console.log(lastPage);
      console.log(pages);
      return pages.length + 1;
    },
  });
  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isPending
  };
}
