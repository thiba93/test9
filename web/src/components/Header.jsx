import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"

const Header = () => (
  <header className="bg-primary-blue p-4 flex justify-between">
    <p className="font-semibold">AIRNEIS</p>
    <ul className="flex gap-4">
      <li>
        <MagnifyingGlassIcon className="h-6 w-6" />
      </li>
      <li>
        <ShoppingCartIcon className="h-6 w-6" />
      </li>
      <li>
        <Bars3Icon className="h-6 w-6" />
      </li>
    </ul>
  </header>
)

export default Header
