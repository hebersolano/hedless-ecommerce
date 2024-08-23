function Filter() {
  return (
    <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row">
      <div className="flex flex-wrap gap-6">
        <select
          name="type"
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <input
          type="text"
          name="min"
          placeholder="min price"
          className="w-24 rounded-2xl pl-2 ps-3 text-xs ring-1 ring-secondary"
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="w-24 rounded-2xl pl-2 ps-3 text-xs ring-1 ring-secondary"
        />

        <select
          name="size"
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Size</option>
          <option value="">Size</option>
        </select>
        <select
          name="color"
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Color</option>
          <option value="">Text</option>
        </select>

        <select
          name="ribbon"
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>Category</option>
          <option value="">New Arrival</option>
          <option value="">Popular</option>
        </select>

        <select
          name=""
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium"
        >
          <option>All Filters</option>
        </select>
      </div>
      <div>
        <select
          name=""
          id=""
          className="rounded-2xl bg-secondary px-4 py-2 text-xs font-medium ring-1 ring-secondary"
        >
          <option value="">Sort By</option>
          <option value="">Price (low to hight)</option>
          <option value="">Price (hight to low)</option>
          <option value="">Newest</option>
          <option value="">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
