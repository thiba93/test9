import React, { useState } from "react"
import Link from "next/link"
import { isAuthenticated, removeToken } from "@/utils/auth"
import { useRouter } from "next/router"
import { Bars3Icon } from "@heroicons/react/24/outline"

const AuthenticatedMenuItems = ({ handleLogout }) => (
  <>
    <li className="border-b">
      <Link href="/updateInfo" className="block p-2">Mettre à jour les infos</Link>
    </li>
    <li className="border-b">
      <Link href="/CGU" className="block p-2">CGU</Link>
    </li>
    <li className="border-b">
      <Link href="/contact" className="block p-2">Contact</Link>
    </li>
    <li className="border-b">
      <Link href="/backoffice" className="block p-2">Backoffice</Link>
    </li>
    <li>
    <Link href="/history" className="block p-2">Histoire d&apos;Airneis </Link>
    </li>
    <li className="border-b">
      <button onClick={handleLogout} className="block p-2">Déconnexion</button>
    </li>
  </>
)
const UnauthenticatedMenuItems = () => (
  <>
    <li className="border-b">
      <Link href="/sign-in" className="block p-2">Se connecter</Link>
    </li>
    <li className="border-b">
      <Link href="/sign-up" className="block p-2">Inscription</Link>
    </li>
    <li className="border-b">
      <Link href="/CGU" className="block p-2">CGU</Link>
    </li>
    <li>
      <Link href="/contact" className="block p-2">Contact</Link>
    </li>
    <li>
    <Link href="/history" className="block p-2">Airneis History</Link>
    </li>
  </>
)
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [auth, setAuth] = useState(isAuthenticated())
  const router = useRouter()
  const handleLogout = () => {
    removeToken()
    setAuth(false)
    router.push("/sign-up")
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="h-6 w-6">
        <Bars3Icon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul>
            {auth ? <AuthenticatedMenuItems handleLogout={handleLogout} /> : <UnauthenticatedMenuItems />}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
