import { User } from "better-auth";

class MembershipService {
    async toggleMembership(communitiId: string, user: User) {
        console.log('MembershipService Panther')
    }
}

export const membershipService = new MembershipService()