import { User } from "better-auth";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";
import { MembersihpPolicy } from "../../policies/MembershipPolicy";
import { communityRepository, ICommunityRepository } from "../../Communities/services/CommunityRepository";

class MembershipService {
    constructor (
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ){}
    async toggleMembership(communityId: string, user : User) {
        // revisar si la comunidad existe
        const community = await this.communityRepository.findById(communityId)
        if(!community) return

        const isMember = await this.membershipRepository.isMember(communityId, user.id)
    
        // si puede unirse
        if(MembersihpPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id)

            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true
                }
            }
          
        }
        // si se puede salir
        if(MembersihpPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id)

                return {
                success: true,
                message: `Has salido de la comunidad ${community.name}`,
                 newPermissions: {
                    canJoin: true,
                    canLeave: false
                }
            }
        }
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository)
