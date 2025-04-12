import express, { Request, Response } from 'express';
import logger from '../utils/logger';
// import { healthCheck } from '../handler/healthCheck';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response) => {
  logger.info('Home page accessed');
  res.send('Home Page');
});

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default router;
