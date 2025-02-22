import ProductCard from "./Product";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ModeToggle } from "./ModeToggle";

import useInfiniteProducts from "@/hooks/useInfiniteQuery";

const ProductsContainer = () => {
  // const [filter, setFilter] = useState<Categories | null>("all");
  // const { data: products, isPending: isProductPending } = useProduct({
  //   filter,
  // });
  // const [pageParam, setPageParam] = useState<PageParams>({
  //   page: 1,
  //   filter: "all",
  // });
  // const { data: products, isPending: isProductPending } =
  //   usePagination(pageParam);

  // const { data: categories, isPending: isCategoriesPending } = useCategories();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: products,
    isPending: isProductPending,
  } = useInfiniteProducts();

  

  return (
    <div className="container text-center">
      <div className="text-center mt-12">
        <ModeToggle />
      </div>
      {/* <div className="flex gap-4 justify-center my-8 flex-wrap">
        {isCategoriesPending
          ? Array.from({ length: categories?.length ?? 7 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-10 w-12 px-4 py-2 rounded-md"
              />
            ))
          : categories?.map((category) => (
              <Button
                disabled={pageParam.filter === category}
                className={`${
                  pageParam.filter === category ? "bg-blue-800" : ""
                } disabled:opacity-80 `}
                key={category}
                onClick={() => setPageParam({ ...pageParam, filter: category })}
              >
                {category}
              </Button>
            ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isProductPending
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      <Button
        className="my-8"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};

export default ProductsContainer;
