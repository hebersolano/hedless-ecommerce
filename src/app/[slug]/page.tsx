import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";

function SinglePage() {
  return (
    <div className="relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      {/* img */}
      <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
        <ProductImages />
      </div>

      {/* texts */}
      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          pariatur minima porro! Ipsa adipisci perferendis nulla ut rem. Harum
          esse, veritatis ipsam unde pariatur impedit porro! Laudantium aliquam
          architecto voluptatibus!
        </p>

        <div className="bg h-[2px] bg-secondary" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-muted-foreground line-through">$59</h3>
          <h2 className="text-2xl font-medium">$49</h2>
        </div>
        <div className="bg h-[2px] bg-secondary" />

        <div className="bg h-[2px] bg-secondary" />

        <CustomizeProducts />
        <Add />

        <div className="bg h-[2px] bg-secondary" />

        <div className="text-sm">
          <h4 className="mb-4 font-medium">Title</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A placeat
            explicabo officiis perspiciatis maxime, eveniet aliquam beatae
            dolorum ipsa libero totam nesciunt quaerat corporis laboriosam enim
            et illo ad assumenda?
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-4 font-medium">Title</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A placeat
            explicabo officiis perspiciatis maxime, eveniet aliquam beatae
            dolorum ipsa libero totam nesciunt quaerat corporis laboriosam enim
            et illo ad assumenda?
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-4 font-medium">Title</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A placeat
            explicabo officiis perspiciatis maxime, eveniet aliquam beatae
            dolorum ipsa libero totam nesciunt quaerat corporis laboriosam enim
            et illo ad assumenda?
          </p>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
