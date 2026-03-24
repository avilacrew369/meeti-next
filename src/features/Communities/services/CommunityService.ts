import { success, User } from "better-auth";
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository} from "./CommunityRepository";
import { CommuntyPolicy } from "../../policies/CommunityPolicy";
import { MembersihpPolicy } from "../../policies/MembershipPolicy";
import { notFound } from "next/navigation";
import { checkPassword } from "@/src/shared/utils/auth";
import { error } from "console";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";
import { IMembershipRepository, membershipRepository } from "../../auth/services/MembershipRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository,
        private membershipRepository: IMembershipRepository
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
        const community = await this.communityRepository.findById(communityId)
        if (!community) notFound()
        return community
    }
    
    async getCommunityDetails(communityId: string, user?: User) {
        const community = await this.getCommunity(communityId)

        if(!user) {
            return {
                data: community,
                context: null,
                permissions: null
            }
        }
        const isMember = await this.membershipRepository.isMember(community.id, user.id)
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

    }

    async updateCommunity(data: CommunityInput, communityId: string, user: User) {
        const community = await this.getCommunity(communityId)

        if(!CommuntyPolicy.canEdit(user, community)) {
            throw new Error('No tienes permisos para editar esta comunidas')
        }

        await this.communityRepository.update(data, community.id)

    }

    async deleteCommunity(communityId: string, password: string, user: User) {
        // Obtener comunidad
        const community = await this.getCommunity(communityId)

        // Revisar Permisos
        if(!CommuntyPolicy.canDelete(user, community)) {
            throw new Error('No tienes permisos para eliminar esta comunidad')

        }
        // Verificar password 
        const isValidPassword = await checkPassword(password)
        if(!isValidPassword) {
            return {
                error: 'El password es incorrecto',
                success: ''
            }
        }
        // Eliminar
        await this.communityRepository.delete(communityId)
        await deleteUTFiles(community.image)
        return {
            error: '',
            success: 'Comunidad eliminada correctamente'
        }

    }

    
}

export const communityService = new CommunityService(communityRepository, membershipRepository)
