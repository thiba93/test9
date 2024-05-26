/* eslint-disable max-lines-per-function */
import { useState } from "react"
import axios from "axios"
import Layout from "@/components/Layout"

const ContactPage = () => {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await axios.post("/api/contact", { email, subject, message })
      setStatus("Le message a bien été envoyé. Merci !")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      setStatus("Il y a eu une erreur lors de l'envoi du message. Merci de réessayer.")
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h1>
        {status && <p className="mb-4 text-center">{status}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sujet :</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Envoyer
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
