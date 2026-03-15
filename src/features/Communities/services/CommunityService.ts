import { User } from "better-auth";
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository} from "./CommunityRepository";
import { community } from "@/src/db/schema";
import { CommuntyPolicy } from "../../policies/CommunityPolicy";
import { MembersihpPolicy } from "../../policies/MembershipPolicy";
import { notFound } from "next/navigation";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ){}
    async createCommunity(data: CommunityInput, userId: string) {
        const community = await this.communityRepository.create({
            ...data,
            createdBy: userId
        })
        return community
    }
    async getUserCommunities(user: User) {
       const communities = await this.communityRepository.findByUser(user.id)

       const enriched = await Promise.all(communities.map(async (community) => {
        const isMember = true
        const isAdmin = CommuntyPolicy.isAdmin(user, community)
        return {
            data: community,
            context: {
                isMember,
                isAdmin
            },
            permissions: {
                canEdit: CommuntyPolicy.canEdit(user, community),
                canDelete: CommuntyPolicy.canDelete(user, community),
                canJoin: MembersihpPolicy.canJoin(user, community, isMember),
                canLeave: MembersihpPolicy.canLeave(user, community, isMember),
                canViewMembers: CommuntyPolicy.canViewMembers(user, community)

            }
            
        }
       }))
        return enriched
    }

    async getCommunity(communityId: string) {
        const community = this.communityRepository.findById(communityId)
        if(!community) notFound()
        return community

    }
}

export const communityService = new CommunityService(communityRepository)
