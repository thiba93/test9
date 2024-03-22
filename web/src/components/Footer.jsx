import Image from "next/image"
import Link from "next/link"

const Footer = () => (
  <footer className=" bg-primary-blue p-4 flex justify-between">
    <ul className="flex gap-2 font-semibold">
      <li>CGU</li>
      <li>-</li>
      <li>Mentions légales</li>
      <li>-</li>
      <li>Contact</li>
    </ul>
    <ul className="flex gap-2">
      <li>
        <Image
          src="instagram_logo.svg"
          alt="Instagram"
          height={24}
          width={24}
        />
      </li>
      <li>
        <Link href="https://www.linkedin.com">
          <Image
            src="linkedin_logo.svg"
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
