import { useQuery } from "@tanstack/react-query";

const useProduct = ({ filter }: { filter: Categories | null }) => {
  const { data, isPending } = useQuery<ProductModel[] | undefined>({
    queryKey: ["products", filter],
    queryFn: async () => {
      const res = await fetch(
        filter&&filter!='all'
          ? `https://fakestoreapi.in/api/products/category?type=${filter}`
          : "https://fakestoreapi.in/api/products"
      );
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const result = await res.json();

      if (
        !result ||
        typeof result !== "object" ||
        !Array.isArray(result.products)
      ) {
        throw new Error("invalid data format");
      }
      return result.products;
    },
  });

  return { data, isPending };
};

export default useProduct;
