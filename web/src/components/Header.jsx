import { useRouter } from "next/router"
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline"
import { isAuthenticated, removeToken } from "../utils/auth" 

const Header = () => {
  const router = useRouter()
  const handleLogout = () => {
    removeToken()  
    router.push("/sign-up")  
  }

  return (
    <header className="bg-primary-blue p-4 flex justify-between items-center">
      <p className="font-semibold">AIRNEIS</p>
      <ul className="flex gap-4 items-center">
        <li>
          <MagnifyingGlassIcon className="h-6 w-6" />
        </li>
        <li>
          <ShoppingCartIcon className="h-6 w-6" />
        </li>
        <li>
          <Bars3Icon className="h-6 w-6" />
        </li>
        {isAuthenticated() && (
          <li>
            {/* Logout Text Button */}
            <button onClick={handleLogout} className="text-white font-semibold">
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Header
