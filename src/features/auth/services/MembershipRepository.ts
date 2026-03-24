import { db } from "@/src/db"
import { CommunityMembers } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"


export interface IMembershipRepository {
    addMember(communityId: string, userId: string): Promise<void>
    removeMember(communityId: string, userId: string): Promise<void>
    isMember(communityId: string, userId: string): Promise<boolean>

}

class MembershipRepository implements IMembershipRepository {
    async addMember(communityId: string, userId: string): Promise<void> {
        await db.insert(CommunityMembers).values({
            communityId,
            userId
        })
    }
    async removeMember(communityId: string, userId: string): Promise<void> {
        await db.delete(CommunityMembers)
            .where(
                and(
                    eq(CommunityMembers.communityId, communityId),
                    eq(CommunityMembers.userId, userId)
                )
            )
    }
    async isMember(communityId: string, userId: string) {
        const [result] = await db
            .select()
            .from(CommunityMembers)
            .where(
                and(
                    eq(CommunityMembers.communityId, communityId),
                    eq(CommunityMembers.userId, userId)
                ))
            .limit(1)
        return !!result

    }

}

export const membershipRepository = new MembershipRepository()