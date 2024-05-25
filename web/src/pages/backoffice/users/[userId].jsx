/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"

const fetchUser = async ({ queryKey }) => {
  const [, userId] = queryKey

  if (!userId) {
    return null
  }

  try {
    const response = await axios.get(`/api/users/${userId}`)

    return response.data
  } catch (error) {
    if (error.response) {
      toast.error(`Failed to fetch user: ${error.response.statusText}`)
    } else if (error.request) {
      toast.error("No response was received for the user request")
    } else {
      toast.error(`Error setting up user request: ${error.message}`)
    }

    return null
  }
}
const DetailUser = () => {
  const router = useRouter()
  const { userId } = router.query
  const queryResult = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled: Boolean(userId),
  })
  const { isLoading } = queryResult
  const { isError } = queryResult
  const { error } = queryResult
  const user = queryResult.data

  if (isLoading) {
    toast.loading("Loading user...")
  }

  if (isError) {
    toast.error(`Failed to get user: ${error.message}`)
  }

  const handleBackClick = () => {
    router.push("/backoffice/users")
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Détail utilisateur
      </h1>
      <div className="max-w-md mx-auto">
        <div>
          <span className="text-gray-700">E-mail</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={user ? user.email : ""}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Pseudo:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={user ? user.username : ""}
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

export default DetailUser
