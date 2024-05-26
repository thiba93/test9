/* eslint-disable max-lines-per-function */
import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "@/components/Layout"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"
import { toast } from "sonner"

const MessagesPage = () => {
  const [messages, setMessages] = useState([])
  const [sortOrder, setSortOrder] = useState("recent")
  const [sortByUser, setSortByUser] = useState("asc")

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/backoffice/messages")
        setMessages(response.data)
      } catch (error) {
        toast("Error fetching messages", error)
      }
    }
    fetchMessages()
  }, [])

  const formatDate = (dateString) =>
    format(new Date(dateString), "Pp", { locale: fr })
  const sortedMessages = [...messages].sort((a, b) => {
    const userComparison =
      sortByUser === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email)

    if (userComparison !== 0) {
      return userComparison
    }

    return sortOrder === "recent"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  })

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Message de nos utilisateurs
        </h1>
        <div className="flex justify-between mb-4">
          <button
            onClick={() =>
              setSortOrder(sortOrder === "recent" ? "oldest" : "recent")
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Triez par date ({sortOrder === "recent" ? "Recent" : "Ancien"})
          </button>
          <button
            onClick={() => setSortByUser(sortByUser === "asc" ? "desc" : "asc")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Triez par utilisateur ({sortByUser === "asc" ? "A-Z" : "Z-A"})
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {sortedMessages.map((message) => (
              <li key={message.id} className="px-4 py-4">
                <Link
                  href={`/backoffice/messages/${message.email}`}
                  legacyBehavior
                >
                  <a className="text-sm font-medium text-gray-900 hover:underline">
                    {message.email}
                  </a>
                </Link>
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

export default MessagesPage
