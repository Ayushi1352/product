const Navbar = ({search,setSearch}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <input
      type="text"
      placeholder="Search product"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="border px-3 py-2 rounded"
      />
    </div>
  )
}

export default Navbar