import { Link } from "react-router-dom"

const ProductCard = ({product}) => {

  return (
    <Link to={`/product/${product.id}`} className="border rounded-lg p-4 shadow hover:shadow-lg">

      <img
      src={product.thumbnail}
      className="w-full h-40 object-cover"
      />

      <h2 className="font-semibold mt-2">
        {product.title}
      </h2>

      <p className="text-gray-500">
        ${product.price}
      </p>
     

      
    </Link>
  )
}

export default ProductCard