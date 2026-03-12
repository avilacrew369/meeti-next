import { Metadata } from "next"
import Link from "next/link"
import Heading from "@/src/shared/components/typography/Heading"
import { generatePageTitle } from "@/src/shared/utils/metadata"
import CreateCommunity from "@/src/features/Communities/components/CreateCommunity"

const title = 'Crear Comunidad'

export const metadata: Metadata = {
    title: generatePageTitle(title)
}
export default function CreateCommunityPage() {
    return (
        <>
            <Heading>{title}</Heading>

            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a mis Comunidades</Link>

            <CreateCommunity />
        </>
    )
}
