const Navbar = ({search,setSearch}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <input
      type="text"
      placeholder="Search product"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="w-full sm:w-auto border px-3 py-2 rounded"
      />
    </div>
  )
}

export default Navbar