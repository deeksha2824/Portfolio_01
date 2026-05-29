import { Router } from 'express';
import { getAnalyticsSummary, trackResumeDownload, trackVisit } from '../controllers/analyticsController.js';

export const analyticsRouter = Router();

analyticsRouter.post('/visit', trackVisit);
analyticsRouter.post('/resume-download', trackResumeDownload);
analyticsRouter.get('/summary', getAnalyticsSummary);
