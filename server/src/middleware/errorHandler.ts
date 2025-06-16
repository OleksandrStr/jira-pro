import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', error);

    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        res.status(503).json({
            error: 'Service temporarily unavailable. Please try again later.',
        });
        return;
    }

    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        res.status(401).json({
            error: 'Invalid Jira credentials',
        });
        return;
    }

    res.status(500).json({
        error: 'Internal server error',
    });
};
