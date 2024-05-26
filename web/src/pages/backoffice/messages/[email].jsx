
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "@/components/Layout"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"

const UserMessagesPage = () => {
  const router = useRouter()
  const { email } = router.query
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (email) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/backoffice/messages/${email}`)
          setMessages(response.data)
        } catch (error) {
          toast("Error fetching user messages", error)
        }
      }
      fetchMessages()
    }
  }, [email])

  const formatDate = (dateString) => format(new Date(dateString), "Pp", { locale: fr })

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tous les messages venant de : {email}
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li key={message.id} className="px-4 py-4">
                <p className="mt-1 text-sm text-gray-500">{message.subject}</p>
                <p className="mt-1 text-sm text-gray-500">{message.message}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {formatDate(message.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default UserMessagesPage
