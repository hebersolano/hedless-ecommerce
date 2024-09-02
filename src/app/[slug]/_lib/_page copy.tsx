import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { SingleProductProvider } from "@/app/[slug]/_lib/SingleProductContext";
import getProductBySlug from "@/lib/data-access/getProductBySlug";
import { notFound } from "next/navigation";

async function SinglePage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.visible) notFound();
  const isProductVariants =
    product.variants &&
    product.variants.length > 1 &&
    product.productOptions &&
    product.productOptions.length > 0;

  console.log(product);
  console.log(isProductVariants);
  return (
    <div className="relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      <SingleProductProvider>
        {/* img */}
        <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
          <ProductImages images={product.media?.items!} />
        </div>

        {/* texts */}
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="bg h-[2px] bg-secondary" />

          <div className="flex items-center gap-4">
            {product.priceData?.price !==
              product.priceData?.discountedPrice && (
              <h3 className="text-xl text-muted-foreground">
                {product.priceData?.formatted?.discountedPrice}
              </h3>
            )}
            <h2 className="text-2xl font-medium">
              {product.priceData?.formatted?.price}
            </h2>
          </div>
          <div className="bg h-[2px] bg-secondary" />

          {isProductVariants && (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants!}
              productOptions={product.productOptions!}
            />
          )}
          <Add />

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
