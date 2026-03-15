import { communityService } from "@/src/features/Communities/services/CommunityService";
import Heading from "@/src/shared/components/typography/Heading";

export default async function EditcommunityPage(props: PageProps<'/dashboard/communities/[id]/edit'>) {

  const {id} = await props.params

  const community = await communityService.getCommunity(id)


  return (
    <>
    <Heading>Editar Comunidad</Heading>

    </>
)
}
