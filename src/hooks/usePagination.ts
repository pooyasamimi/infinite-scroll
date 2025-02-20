import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePagination = (pageParams: PageParams) => {
    
  const { data, isPending } = useQuery<ProductModel[] | undefined>({
    queryKey: ["pagination", pageParams],
    queryFn: async () => {
      const result = await axios.get(
        'https://fakestoreapi.in/api/products?limit=150'
      );
      console.log(result.data.products);

      return result.data.products;
    },
    select:(products:ProductModel[]|undefined) => {
        if (pageParams.filter!=='all') {
            return products?.filter((product) => product.category==pageParams.filter)||undefined
        }else return products
    }
  });
  
  return { data, isPending };
};
export default usePagination;
