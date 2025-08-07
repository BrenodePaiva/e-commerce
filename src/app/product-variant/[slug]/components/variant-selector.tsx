import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  selectVariantSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectVariantSlug === variant.slug
              ? "border-primary rounded-xl border border-solid"
              : "rounded-xl border border-solid"
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl.replace(/["{}]/g, "")}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
