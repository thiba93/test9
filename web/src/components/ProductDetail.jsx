import Image from "next/image"

const ProductDetails = ({ product }) => (
  <div className="p-4 shadow rounded-lg bg-white">
    <h2 className="text-xl font-bold">{product.name}</h2>
    <p>{product.description}</p>
    {product.imageUrl && (
      <Image
        src={product.imageUrl}
        alt={product.name}
        width="100"
        height="100"
        className="mt-2"
      />
    )}
  </div>
)

export default ProductDetails
