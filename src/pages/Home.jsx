
import { useEffect, useState } from "react"
import { fetchProducts } from "../services/api"
import ProductCard from "../components/ProductCard"
import Navbar from "../components/Navbar"

const Home = () => {

  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("all")
  const [sort,setSort] = useState("")
  const [page,setPage] = useState(1)

  const itemsPerPage = 8

  useEffect(()=>{
    const getProducts = async()=>{
      try{
        const data = await fetchProducts()
        setProducts(data)
      }catch(err){
        setError(err.message)
      }finally{
        setLoading(false)
      }
    }
    getProducts()
  },[])


  useEffect(()=>{
    setPage(1)
  },[search,category,sort])

  const categories = ["All",...new Set(products.map(p=>p.category))]


  const cleanSearch = search.trim().toLowerCase()

  let filtered = products.filter(p=>{
    return (
      (p.title.toLowerCase().includes(cleanSearch) ||
      p.category.toLowerCase().includes(cleanSearch)) &&
      (category==="all" || p.category===category)
    )
  })


  if(sort==="priceLow") filtered.sort((a,b)=>a.price-b.price)
  if(sort==="priceHigh") filtered.sort((a,b)=>b.price-a.price)
  if(sort==="az") filtered.sort((a,b)=>a.title.localeCompare(b.title))
  if(sort==="za") filtered.sort((a,b)=>b.title.localeCompare(a.title))

  const totalPages = Math.ceil(filtered.length/itemsPerPage)

  const start = (page-1)*itemsPerPage
  const currentProducts = filtered.slice(start,start+itemsPerPage)

  if(loading) return <p className="text-center mt-10">Loading...</p>
  if(error) return <p className="text-center mt-10">{error}</p>

  return (
    <div className="max-w-6xl mx-auto p-4">

      <Navbar search={search} setSearch={setSearch}/>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:flex-wrap">

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="w-full sm:w-auto border px-3 py-2"
        >
          {categories.map(cat=>(
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
          className="w-full sm:w-auto border px-3 py-2"
        >
          <option value="">Sort</option>
          <option value="az">A To Z</option>
          <option value="za">Z To A</option>
          <option value="priceLow">Price Low to High</option>
          <option value="priceHigh">Price High to Low</option>
        </select>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map(product=>(
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {Array.from({length:totalPages},(_,i)=>(
          <button
            key={i}
            onClick={()=>setPage(i+1)}
            className={`px-3 py-1 border ${page===i+1 ? "bg-black text-white":"bg-white"}`}
          >
            {i+1}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Home

