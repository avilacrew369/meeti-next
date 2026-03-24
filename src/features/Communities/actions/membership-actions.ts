import { requireAuth } from "@/src/lib/auth-server";
import { membershipService } from "../../auth/services/MembershipService";

export async function toggleMembershipAction(communityId: string) {
    const { session } =  await  requireAuth()
    if(!session) throw new Error('Usuario mo autenticado')
       const response = await membershipService.toggleMembership(communityId, session.user)
    return response
}