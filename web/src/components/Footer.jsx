import Image from "next/image"
import Link from "next/link"

const Footer = () => (
  <footer className=" bg-primary-blue p-4 flex justify-between">
    <ul className="flex gap-2 font-semibold">
      <li>
      <Link href="/CGU" legacyBehavior>
          <a className="font-semibold">CGU</a>
        </Link>
      </li>
      <li>-</li>
      <li>
      <Link href="/mentionlegales" legacyBehavior>
          <a className="font-semibold">Mention légales</a>
        </Link>
      </li>
      <li>-</li>
      <li>
        <Link href="/contact" legacyBehavior>
          <a className="font-semibold">Contact</a>
        </Link>
    </li>
    </ul>
    <ul className="flex gap-2">
      <li>
        <Image
          src="/instagram_logo.svg"
          alt="Instagram"
          height={24}
          width={24}
        />
      </li>
      <li>
        <Link href="https://www.linkedin.com">
          <Image
            src="/linkedin_logo.svg"
            alt="Linkedin"
            height={24}
            width={24}
          />
        </Link>
      </li>
    </ul>
  </footer>
)

export default Footer
