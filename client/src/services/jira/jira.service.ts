// services/jira.ts
import {UserData, ProjectType} from "@/types";
import {CONFIG, USERS} from "@/constants";

class JiraService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = CONFIG.BEApiUrl || '';
    }

    async getUserData(userId: string, project: ProjectType = 'all'): Promise<UserData> {
        const actualUserId = USERS[userId];

        // Build the URL with project parameter
        let url = `${this.baseUrl}/jira/user/${actualUserId}`;

        // Add project parameter if not 'all'
        if (project !== 'all') {
            url += `?project=${project}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
}

export const jiraService = new JiraService();
