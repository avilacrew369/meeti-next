import { User } from "better-auth";
import { SelectCommunity } from "../Communities/types/community.types";

export class MembersihpPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean) : boolean {
        if(isMember) return false

        // el admin no se puede unir
        if(community.createdBy === user.id) return false

        return true
    }
    static canLeave(user: User, community: SelectCommunity, isMember: boolean) : boolean {
        // owner no se puede salir
        if(community.createdBy === user.id) return false

        return isMember
    }
}