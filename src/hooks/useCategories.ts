import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const { data, isPending } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.in/api/products/category");
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const result = await res.json();
      result.categories.push('all')
      return result.categories;
    },
  });
  return { data, isPending };
};

export default useCategories;
