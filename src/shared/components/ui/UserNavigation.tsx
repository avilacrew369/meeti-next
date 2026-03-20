import Link from "next/link";

export default function UserNavigation() {
  return (
    <nav className="flex justify-center items-center mt-5 md:mt-0">
        <Link 
            href={'/dashboard'}
            className="font-bold text-sm px-4 py-3  bg-pink-600 text-white block w-full text-center"
        
        >Panel de Administracion</Link>

    </nav>
  )
}
