import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import logo from '../public/logo.svg'
import Link from "next/link";

export default function Nav() {
  return(
    <div className="flex gap-2 justify-between p-6 bg-brown-100">
      <Link href="/" className="text-3xl flex items-center gap-3 font-regular">
        <Image src={logo.src} alt="Logo" width="50" height="50"/>
        Campaign Manager
      </Link>
      <AuthButton/>
    </div>
  )
}