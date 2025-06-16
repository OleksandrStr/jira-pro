import {UserData} from "./user.types";

export interface JiraIssue {
    key: string;
    summary: string;
    assignee: string;
    status: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    created: string;
    parent: string;
    originalEstimate: string;
    timeSpent: string;
    remainingTime: string;
    // Raw seconds for calculations
    originalEstimateSeconds: number;
    timeSpentSeconds: number;
    remainingTimeSeconds: number;
}

export interface JiraState {
    users: Record<string, UserData>;
    loading: Record<string, boolean>;
    error: string | null;
}

export type ProjectType = 'all' | 'KRUIDVAT' | 'MRN20' | 'TPS20' | 'EE20';
