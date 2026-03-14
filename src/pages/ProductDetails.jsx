import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"




  
const ProductDetails = () => {

  const {id} = useParams()

  const [product,setProduct] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{

    const fetchProduct = async()=>{

      try{

        const res = await fetch(`https://dummyjson.com/products/${id}`)

        if(!res.ok) throw new Error("Error")

        const data = await res.json()

        setProduct(data)

      }catch(err){
        setError("Failed to load product")
      }finally{
        setLoading(false)
      }

    }

    fetchProduct()

  },[id])

  if(loading) return <p className="text-center mt-10">Loading...</p>

  if(error) return <p className="text-center mt-10">{error}</p>

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col border-2 mt-12">
        
   <button
      onClick={()=>window.history.back()}
      className="text-black hover:underline mb-4"
      >
        &larr; Back
      </button>

      <img
      src={product.thumbnail}
      className="w-90 h-60 items-center"
      />

      <h1 className="text-3xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="text-gray-900 font-bold mt-2">
        {product.category}
      </p>

<p className="mt-4">
        {product.description}
      </p>


      <p className="text-xl font-semibold mt-2">
        ${product.price}
      </p>
      <p className="text-gray-800 mt-2" >
        Discount {product.discountPercentage}%
      </p>

      

      <p className="text-yellow-500 mt-2">
        Rating {product.rating}
      </p>

    </div>
  )
}

export default ProductDetails