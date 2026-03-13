import { User } from "better-auth";
import { SelectCommunity } from "../Communities/types/community.types";

export class CommuntyPolicy {
    static isAdmin(user: User, community: SelectCommunity) : boolean {
        return user.id === community.createdBy

    }
    static canEdit(user: User, community: SelectCommunity) : boolean {
        return this.isAdmin(user, community)
    }

     static canDelete(user: User, community: SelectCommunity) : boolean {
        return this.isAdmin(user, community)
    }

     static canViewMembers(user: User, community: SelectCommunity) : boolean {
        return this.isAdmin(user, community)
    }
   
}