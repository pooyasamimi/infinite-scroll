import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

export default function useInfiniteProducts() {
  const limitPerPage: number = 20;
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      ProductRes,
      Error,
      ProductModel[],
      ["infiniteProducts"],
      number
    >({
      queryKey: ["infiniteProducts"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }): Promise<ProductRes> => {
        const { data } = await axios.get<ProductRes>(
          `https://fakestoreapi.in/api/products?limit=${limitPerPage}&page=${pageParam}`
        );
        return data;
      },
      getNextPageParam: (lastPage, pages) => {
        if (
          !lastPage ||
          !lastPage.products ||
          lastPage.products.length < limitPerPage
        ) {
          return undefined;
        }
        return pages.length + 1;
      },
      select: useCallback((data: Data) => {
        console.log("Getting data");

        return data.pages.flatMap((page) => page.products);
      }, []),
    });

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isPending,
  };
}
