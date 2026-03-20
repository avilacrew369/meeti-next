"use client"

import { useState } from "react"
import { CommunityPermissions } from "../types/community.types"
import { toggleMembershipAction } from "../../auth/actions/membership-actions"


type Props = {
  permissions: CommunityPermissions
  communityId: string
}

export default function CommunityMembership({permissions, communityId} : Props) {
  const [canJoin, setCanJoin] = useState(permissions.canJoin)
  const [canLeave, setCanLeave] = useState(permissions.canLeave)

  const handleClick = async () => {
    await toggleMembershipAction(communityId)
  }

  return (
    <>
    { canJoin && (

      <button className="font-bold text-lg  lg:w-auto px-5 py-2 text-wite cursor-pointer bg-orange-400"
      onClick={handleClick}
      >Inscribirme a esta comunidad
     </button>
    )}

    {canLeave && (

      <button className="font-bold text-lg lg:w-auto  px-5 py-2 text-wite cursor-pointer bg-red-500"
      onClick={handleClick}
      >Abandonar Comunidad
     </button>
      )}
    </>
  )
}
