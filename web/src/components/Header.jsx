import Link from "next/link"
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import BurgerMenu from "./ui/BurgerMenu"

const Header = () => (
    <header className="bg-primary-blue p-4 flex justify-between items-center">
      <Link href="/" legacyBehavior>
        <a className="font-semibold">AIRNEIS</a>
      </Link>

      <ul className="flex gap-4 items-center">
      <li>
        <Link href="/updateInfo">Mettre à jour les infos</Link>
      </li>
  <li>
        <Link href="/history">Histoire</Link>
      </li>
  
        <li>
        <Link href="/search" legacyBehavior>
            <a>
              <MagnifyingGlassIcon className="h-6 w-6" />
            </a>
          </Link>
        </li>
        <li>
        <Link href="/cart" legacyBehavior>
            <a>
              <ShoppingCartIcon className="h-6 w-6" />
            </a>
          </Link>
        </li>
        <li>
          <BurgerMenu />
        </li>
      </ul>
    </header>
  )

export default Header

