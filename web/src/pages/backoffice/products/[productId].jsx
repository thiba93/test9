/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"

const fetchProduct = async ({ queryKey }) => {
  const [, productId] = queryKey

  if (!productId) {
    return null
  }

  try {
    const response = await axios.get(`/api/products/${productId}`)

    return response.data
  } catch (error) {
    if (error.response) {
      toast.error(`Failed to fetch product: ${error.response.statusText}`)
    } else if (error.request) {
      toast.error("No response was received for the product request")
    } else {
      toast.error(`Error setting up product request: ${error.message}`)
    }

    return null
  }
}
const DetailProduct = () => {
  const router = useRouter()
  const { productId } = router.query
  const queryResult = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
    enabled: Boolean(productId),
  })
  const { isLoading } = queryResult
  const { isError } = queryResult
  const { error } = queryResult
  const product = queryResult.data

  if (isLoading) {
    toast.loading("Loading product...")
  }

  if (isError) {
    toast.error(`Failed to get product: ${error.message}`)
  }

  const handleBackClick = () => {
    router.push("/backoffice")
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">Détail du produit</h1>
      <div className="max-w-md mx-auto">
        <div>
          <span className="text-gray-700">Nom du produit:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={product ? product.name : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Prix:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={product ? product.price : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Description:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
            value={product ? product.description : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Categorie:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
            value={product ? product.category.uniqueSlug : ""}
            readOnly
          />
        </div>
        <button
          onClick={handleBackClick}
          className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
      </div>
    </Layout>
  )
}

export default DetailProduct
