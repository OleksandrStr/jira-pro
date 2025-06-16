import https from 'https';
import { IncomingMessage } from 'http';
import {JiraStatus} from "../types";

export class JiraProxyService {
    private jiraServer: string;
    private username: string;
    private apiToken: string;
    private auth: string;

    constructor() {
        this.jiraServer = process.env.REACT_APP_JIRA_SERVER || '';
        this.username = process.env.JIRA_USERNAME || '';
        this.apiToken = process.env.JIRA_API_TOKEN || '';
        this.auth = Buffer.from(`${this.username}:${this.apiToken}`).toString('base64');
    }

    private async makeJiraRequest(endpoint: string, method: string = 'GET', body?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: new URL(this.jiraServer).hostname,
                port: 443,
                path: endpoint,
                method: method,
                headers: {
                    'Authorization': `Basic ${this.auth}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            const req = https.request(options, (res: IncomingMessage) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve(jsonData);
                    } catch (error) {
                        reject(new Error('Invalid JSON response'));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (body) {
                req.write(body);
            }

            req.end();
        });
    }

    async searchIssues(jql: string): Promise<any> {
        const allIssues: any[] = [];
        let startAt = 0;
        const maxResults = 100;
        let total = 0;

        do {
            const endpoint = `/rest/api/3/search?jql=${encodeURIComponent(jql)}&fields=key,summary,assignee,status,timetracking,priority,created,parent&startAt=${startAt}&maxResults=${maxResults}`;
            const response = await this.makeJiraRequest(endpoint);

            allIssues.push(...response.issues);

            total = response.total;
            startAt += maxResults;

        } while (allIssues.length < total);

        console.log(`Successfully fetched all ${allIssues.length} issues`);
        return this.transformIssues(allIssues);
    }

    private async getUserSubtasks(userId: string, project: string): Promise<any> {
        const projectJql = `project = ${project} AND `;
        const subtaskJql = `${project ? projectJql : ''} type IN (Sub-Task-BE, Sub-Task-FE) AND assignee = "${userId}" ORDER BY created DESC`

        return await this.searchIssues(subtaskJql);
    }

    private async getTasksStories(storiesKeys: any): Promise<any> {
        const storiesJql = `key in (${storiesKeys.join(',')}) ORDER BY created DESC`;

        return await this.searchIssues(storiesJql);
    }

    private async getDefectsStories(storiesKeys: any): Promise<any> {
        const defectsJql = `parent in (${storiesKeys.join(',')}) AND issuetype = Defect ORDER BY created DESC`;

        return await this.searchIssues(defectsJql);
    }

    async getUserData(userId: string, project: string) {
        const subtasks = await this.getUserSubtasks(userId, project);
        const tasksInToDo = subtasks.filter((issue: any) => issue.status === JiraStatus.TO_DO || issue.status === JiraStatus.READY_FOR_DEVELOPMENT);
        const tasksInProgress = subtasks.filter((issue: any) => issue.status === JiraStatus.IN_PROGRESS);
        const tasksDone = subtasks.filter((issue: any) => issue.status === JiraStatus.DONE);

        const storiesKeys = subtasks
            .map((issue: any) => issue.parent);


        const stories = await this.getTasksStories(storiesKeys);

        const storiesToMove = stories.filter((story: any) => story.status === JiraStatus.DEVELOPMENT_DONE || story.status === JiraStatus.EARLY_TESTING);
        const storiesInQA = stories.filter((story: any) => story.status === JiraStatus.QA_TEST);
        const devValidationBlocked = stories.filter((story: any) => story.status === JiraStatus.DEV_VALIDATION_BLOCKED);

        const defects = await this.getDefectsStories(storiesKeys);

        return {
            tasksInToDo,
            tasksInProgress,
            tasksDone,
            storiesToMove,
            storiesInQA,
            devValidationBlocked,
            defects
        };
    }


    private transformIssues(issues: any[]): any[] {
        return issues.map((issue: any) => {
            const timeTracking = issue.fields.timetracking || {};
            const originalEstimate = timeTracking.originalEstimateSeconds || 0;
            const timeSpent = timeTracking.timeSpentSeconds || 0;
            const remainingEstimate = timeTracking.remainingEstimateSeconds || 0;

            const actualRemaining = remainingEstimate > 0 ? remainingEstimate : Math.max(0, originalEstimate - timeSpent);

            return {
                key: issue.key,
                summary: issue.fields.summary,
                assignee: issue.fields.assignee?.displayName,
                status: issue.fields.status.name,
                priority: issue.fields.priority?.name,
                created: new Date(issue.fields.created).toLocaleDateString(),
                parent: issue.fields.parent?.key,
                originalEstimate: this.formatTimeDaysHours(originalEstimate),
                timeSpent: this.formatTimeDaysHours(timeSpent),
                remainingTime: this.formatTimeDaysHours(actualRemaining),
                originalEstimateSeconds: originalEstimate,
                timeSpentSeconds: timeSpent,
                remainingTimeSeconds: actualRemaining,
            };
        });
    }

    private formatTimeDaysHours(seconds: number): string {
        if (!seconds || seconds === 0) return '0';

        const dayInSeconds = 8 * 3600;
        const days = Math.floor(seconds / dayInSeconds);
        const hours = Math.floor((seconds % dayInSeconds) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) {
            if (hours > 0) return `${days}d ${hours}h`;
            if (minutes > 0) return `${days}d ${minutes}m`;
            return `${days}d`;
        } else if (hours > 0) {
            return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    }

}
