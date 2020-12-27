import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { connectDatabase } from '../utils/database';
import router from './router';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
connectDatabase();

const app = express();
app.use(express.json());
app.use(router);

export default app;