import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import logo from '../public/logo.svg'

export default function Nav() {
  return(
    <div className="flex gap-2 justify-between p-6">
      <div className="text-3xl flex gap-3">
        <Image src={logo.src} alt="Logo" width="50" height="50"/>
        Campaign Manager
      </div>
      <AuthButton/>
    </div>
  )
}