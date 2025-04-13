import express, { Request, Response } from 'express';
import logger from '../utils/logger';
import {
  generateNewChatId,
  getChatSession,
  getJournalStreakDates,
  getLatestMoods,
  getJournalEntry,
  getAllChatSessions
} from '../controllers/dataController';
// import { healthCheck } from '../handler/healthCheck';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response) => {
  logger.info('Home page accessed');
  res.send('Home Page');
});

router.get('/:username/new-chat', generateNewChatId);

router.get('/:username/all-chats', getAllChatSessions);

router.get('/:username/chat-streak', getJournalStreakDates);

router.get('/:username/moods', getLatestMoods);

router.get('/:username/journal/:journalId', getJournalEntry);

router.get('/:username/:chatId', getChatSession);

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default router;
