import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import ProductList from "@/components/common/product-list";
import { getCategories } from "@/data/categories/get";
import {
  getNewlyCreatedProducts,
  getProductsWithVariants,
} from "@/data/products/get";

export default async function Home() {
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <div className="space-y-6">
        <div className="px-5 md:hidden">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="m-auto mb-6 hidden max-w-[900px] px-5 md:block">
          <Image
            src="/banner-desk-1.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5 lg:hidden">
          <CategorySelector categories={categories} />
        </div>

        <div className="lg:flex lg:flex-row-reverse lg:items-end lg:justify-end">
          <div className="mb-5 px-5 md:hidden">
            <Image
              src="/banner-02.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="hidden w-full max-w-[800px] px-5 md:m-auto md:block lg:m-0">
            <Image
              src="/banner-desk-2.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>

          <ProductList
            textContainerClassName="lg:h-[550px] lg:flex-col"
            products={newlyCreatedProducts}
            title="Novos Produtos"
          />
        </div>
      </div>
    </>
  );
}
