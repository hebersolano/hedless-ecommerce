function CartItemSkeleton() {
  return (
    <div className="flex animate-pulse gap-4">
      <div
        id="imageSkeleton"
        className="h-[96px] w-[72px] rounded-md bg-gray-300"
      ></div>

      <div className="flex w-full flex-col justify-between">
        {/* top */}
        <div className="space-y-1">
          {/* title */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 rounded-md bg-gray-300"></div>
            <div className="h-4 w-12 rounded-md bg-gray-300"></div>
          </div>
          {/* desc */}
          <div className="h-4 w-12 rounded-md bg-gray-300"></div>
        </div>

        {/* bottom */}
        <div className="flex justify-between text-sm">
          <div className="h-4 w-12 rounded-md bg-gray-300"></div>
          <div className="h-4 w-12 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default CartItemSkeleton;
