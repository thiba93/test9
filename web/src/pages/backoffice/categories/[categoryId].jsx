/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"

const fetchCategory = async ({ queryKey }) => {
  const [, categoryId] = queryKey

  if (!categoryId) {
    return null
  }

  try {
    const response = await axios.get(
      `/api/categories/${parseInt(categoryId, 10)}`,
    )

    return response.data
  } catch (error) {
    if (error.response) {
      toast.error(`Failed to fetch category: ${error.response.statusText}`)
    } else if (error.request) {
      toast.error("No response was received for the category request")
    } else {
      toast.error(`Error setting up category request: ${error.message}`)
    }

    return null
  }
}
const DetailCategory = () => {
  const router = useRouter()
  const { categoryId } = router.query
  const queryResult = useQuery({
    queryKey: ["category", categoryId],
    queryFn: fetchCategory,
    enabled: Boolean(categoryId),
  })
  const { isLoading } = queryResult
  const { isError } = queryResult
  const { error } = queryResult
  const category = queryResult.data

  if (isLoading) {
    toast.loading("Loading category...")
  }

  if (isError) {
    toast.error(`Failed to get category: ${error.message}`)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Détail de la catégorie
      </h1>
      <div className="max-w-md mx-auto">
        <div>
          <span className="text-gray-700">Nom:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={category ? category.displayName : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Identifiant:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={category ? category.uniqueSlug : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">N° Affichage:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
            value={category ? category.displayRank : ""}
            readOnly
          />
        </div>
        <button
          onClick={() => router.push("/backoffice/categories")}
          className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
      </div>
    </Layout>
  )
}

export default DetailCategory
