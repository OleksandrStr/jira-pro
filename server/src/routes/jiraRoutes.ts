import { Router } from 'express';
import { getUserData, searchIssues } from '../controllers/jiraController';

const router = Router();

router.get('/user/:userId', getUserData);
router.get('/search', searchIssues);

export default router;
