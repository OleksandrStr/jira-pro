import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import './utils/env-setup'
import jiraRoutes from './routes/jiraRoutes';
import { errorHandler } from './middleware/errorHandler';
import { corsOptions } from './middleware/cors';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());


app.use('/api/jira', jiraRoutes);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
    console.log(`🚀 Jira Proxy Server running on port ${SERVER_PORT}`);
});
