import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/product-list";
import { getLikelyProducts, getProductVariant } from "@/data/products/get";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await getProductVariant(slug);
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await getLikelyProducts(
    productVariant.product.categoryId,
  );
  return (
    <>
      <div className="flex flex-col space-y-5 md:flex-row md:p-5 lg:justify-center lg:gap-5">
        <div>
          <div className="relative aspect-square w-full md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
            <Image
              src={productVariant.imageUrl.replace(/["{}]/g, "")}
              alt={productVariant.name}
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </div>

        <div>
          <div className="md:flex md:flex-col-reverse">
            <div className="my-5 px-5">
              <VariantSelector
                selectVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="px-5">
              <h2 className="text-xl font-semibold">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>
              <h3 className="mt-3 text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <div className="my-3 px-5">
            <p className="text-sm">{productVariant.product.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-7">
        <ProductList title="Talvez você goste" products={likelyProducts} />
      </div>
    </>
  );
};

export default ProductVariantPage;
