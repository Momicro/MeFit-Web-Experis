import { Goal } from "./goal.model";
import { Profile } from "./profile.model";

export enum Role {
    User = 'User',
    Contributor = 'Contributor',
    Admin = 'Admin',
}

export interface User {
    id: number;
	email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    profile: Profile;
    activeGoal: Goal;
}