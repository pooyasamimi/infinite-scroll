import ProductCard from "./Product";
import { Skeleton } from "./ui/skeleton";
import { ModeToggle } from "./ModeToggle";

import useInfiniteProducts from "@/hooks/useInfiniteQuery";
import { useEffect, useRef } from "react";
const ProductsContainer = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: products,
    isPending: isProductPending,
  } = useInfiniteProducts();

  const loadingTarget = useRef(null);

  useEffect(() => {
    const target = loadingTarget.current;
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
          observer.unobserve(target);
        }
      },
      {
        threshold: 1,
        rootMargin: "10px",
      }
    );
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="container text-center">
        <div className="text-center my-10">
          <ModeToggle />
        </div>
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
        {isFetchingNextPage && (
          <span className="block mx-auto w-12 h-12 my-12 border-8 border-blue-700 rounded-full border-t-transparent animate-spin"></span>
        )}
        <div className="h-20 w-full" ref={loadingTarget}></div>
      </div>
    </>
  );
};

export default ProductsContainer;
