declare global {
  type ProductModel = {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    image: string;
    onSale?: boolean;
    popular?: boolean;
  };

  type Categories =
    | "tv"
    | "audio"
    | "laptop"
    | "mobile"
    | "gaming"
    | "appliances"
    | "all";

  // type CategoriesRes = {
  //   status : string;
  //   message : string;
  //   categories : categories[];
  // }

  type Theme = "dark" | "light" | "system";
}

export {};
