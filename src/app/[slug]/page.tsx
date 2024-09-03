import Add from "@/app/[slug]/_lib/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/app/[slug]/_lib/ProductImages";
import { SingleProductProvider } from "@/app/[slug]/_lib/SingleProductContext";
import getProductBySlug from "@/lib/data-access/getProductBySlug";
import { notFound } from "next/navigation";
import SingleProductInfo from "./_lib/SingleProductInfo";
import { getDefaultProductOptions, hasProductVariants } from "./_lib/helpers";

async function SinglePage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.visible) notFound();
  const isProductVariants = hasProductVariants(product);
  const defaultOptions = getDefaultProductOptions(isProductVariants, product);

  console.log(product);
  // console.log(isProductVariants);
  return (
    <div className="relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      <SingleProductProvider product={product} defaultOptions={defaultOptions}>
        {/* img */}
        <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
          <ProductImages productImages={product.media?.items!} />
        </div>

        {/* texts */}
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <SingleProductInfo
            product={product}
            isProductVariants={isProductVariants}
          />

          <div className="bg h-[2px] bg-secondary" />

          {product.additionalInfoSections?.map((section) => {
            if (section.title === "short-description") return null;

            return (
              <div key={section.title} className="text-sm">
                <h4 className="mb-4 font-medium">{section.title}</h4>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            );
          })}
        </div>
      </SingleProductProvider>
    </div>
  );
}

export default SinglePage;
