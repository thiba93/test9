/* eslint-disable max-lines-per-function */
import { useRouter } from "next/router"
import Link from "next/link"
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import { isAuthenticated, removeToken } from "../utils/auth"
import { useEffect, useState } from "react"

const Header = () => {
  const router = useRouter()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    setAuth(isAuthenticated())
  }, [])

  const handleLogout = () => {
    removeToken()
    router.push("/sign-up")
  }

  return (
    <header className="bg-primary-blue p-4 flex justify-between items-center">
      <Link href="/" legacyBehavior>
        <a className="font-semibold">AIRNEIS</a>
      </Link>
      <ul className="flex gap-4 items-center">
        <li>
          <MagnifyingGlassIcon className="h-6 w-6" />
        </li>
        <li>
          <Link href="/cart" legacyBehavior>
            <a>
              <ShoppingCartIcon className="h-6 w-6" />
            </a>
          </Link>
        </li>
        <li>
          <Bars3Icon className="h-6 w-6" />
        </li>
        {auth ? (
          <>
            <li>
              <button
                onClick={handleLogout}
                className="text-white font-semibold"
              >
                Déconnexion
              </button>
            </li>
            <li>
              <Link href="/backoffice" legacyBehavior>
                <a className="font-semibold">backoffice</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in" legacyBehavior>
              <a className="font-semibold">Se connecter</a>
            </Link>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Header
