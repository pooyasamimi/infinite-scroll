import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }: { product: ProductModel }) {
  const [imgErr, setImgErr] = useState<boolean>(false);
  //vase inke agar tasvir load nashod hazf she
  if (imgErr) {
    return null;
  }
  return (
    <div className="group space-y-4 shadow-xl p-3">
      <figure className="group-hover:opacity-90">
        <img
          className="w-full rounded-lg aspect-square object-cover drop-shadow-lg"
          src={product.image}
          alt={product.title}
          onError={() => setImgErr(true)}
        />
      </figure>
      <div className="flex flex-col">
        <div className="">
          <h3 className="text-lg line-clamp-1">
            <a href="#">
              <span aria-hidden="true" className="" />
              {product.title}
            </a>
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <p className="text-lg font-semibold">{product.price}$</p>
      </div>
      <div className="flex justify-between">
        <Button className="flex-shrink-0">
          <HeartIcon className="size-4" />
        </Button>
        <Button>
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
