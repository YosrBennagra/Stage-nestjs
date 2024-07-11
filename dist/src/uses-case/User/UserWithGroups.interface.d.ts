import { Group } from "src/Schema/Group.Schema";
import { User } from "src/Schema/User.Schema";
export interface UserWithGroups extends User {
    groups: Group[];
}
