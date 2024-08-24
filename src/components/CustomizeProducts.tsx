function CustomizeProducts() {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a color</h4>
      <ul className="flex items-center gap-3">
        <li className="relative h-8 w-8 cursor-pointer rounded-full bg-destructive ring-1 ring-muted-foreground">
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full ring-2" />
        </li>
        <li className="relative h-8 w-8 cursor-pointer rounded-full bg-blue-500 ring-1 ring-muted-foreground"></li>
        <li className="relative h-8 w-8 cursor-pointer rounded-full bg-green-500 ring-1 ring-muted-foreground">
          <div className="absolute left-1/2 top-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-full bg-red-400" />
        </li>
      </ul>

      <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="cursor-pointer rounded-md px-4 py-1 text-sm text-primary ring-1 ring-primary">
          Small
        </li>
        <li className="cursor-pointer rounded-md bg-lama px-4 py-1 text-sm text-primary-foreground ring-1 ring-primary">
          Medium
        </li>
        <li className="cursor-not-allowed rounded-md bg-primary/40 px-4 py-1 text-sm text-primary-foreground ring-1 ring-primary/40">
          Big
        </li>
      </ul>
    </div>
  );
}

export default CustomizeProducts;
