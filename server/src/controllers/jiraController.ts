import { Request, Response, NextFunction } from 'express';
import { JiraProxyService } from '../services/jiraProxyService';

const jiraService = new JiraProxyService();

export const getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const { project } = req.query as { project: string };

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const userData = await jiraService.getUserData(userId, project);
        res.json(userData);
    } catch (error) {
        next(error);
    }
};

export const searchIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { jql } = req.query;

        if (!jql || typeof jql !== 'string') {
            res.status(400).json({ error: 'JQL query is required' });
            return;
        }

        const results = await jiraService.searchIssues(jql);
        res.json(results);
    } catch (error) {
        next(error);
    }
};
