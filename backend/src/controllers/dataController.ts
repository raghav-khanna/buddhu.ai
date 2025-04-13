// src/controllers/dataController.ts
import { Request, Response } from 'express';
import * as dataService from '../services/dataService';
import Logger from '../utils/logger';

// Error handler remains the same
const handleControllerError = (
  res: Response,
  error: any,
  defaultMessage: string,
  defaultStatus: number = 500
) => {
  const message = error instanceof Error ? error.message : defaultMessage;
  const status =
    error.message?.includes('Invalid date format') || error.message?.includes('Invalid journal ID')
      ? 400
      : error.message?.includes('not found')
      ? 404
      : defaultStatus;
  Logger.error(`[DataController] Error: ${message}`);
  res.status(status).json({ success: false, message });
};

// --- Controller Functions ---

// 1. :username/new-chat (No change)
export const generateNewChatId = (req: Request, res: Response): void => {
  const { username } = req.params;
  Logger.info(
    `[DataController] Request received to generate new chat ID for potential user: ${username}`
  );
  try {
    const newChatId = dataService.generateNewChatIdService();
    res.status(200).json({ success: true, chatId: newChatId }); // Still using camelCase chatId here for consistency maybe? Or match desired output? Let's stick to chatId for the key name in the response for now.
  } catch (error: any) {
    handleControllerError(res, error, 'Failed to generate new chat ID', 500);
  }
};

// 2. :username/:chatId (Updated response logic)
export const getChatSession = async (req: Request, res: Response) => {
  const { username, chatId } = req.params;
  Logger.info(
    `[DataController] Request received for chat entry for user: ${username}, chatId: ${chatId}`
  );
  try {
    const chatData = await dataService.fetchChatSessionById(username, chatId); // Service returns {chatid, chats} or null
    if (!chatData) {
      return res
        .status(404)
        .json({ success: false, message: `Chat entry not found for chatId ${chatId}` });
    }
    res.status(200).json({ success: true, data: chatData }); // Return the transformed object
  } catch (error: any) {
    handleControllerError(res, error, `Failed to fetch chat entry ${chatId} for ${username}`);
  }
};

// 3. :username/chat-streak (Updated response logic for string dates)
export const getJournalStreakDates = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  Logger.info(`[DataController] Request received for chat streak dates for user: ${username}`);
  try {
    // --- Service now returns string[] ---
    const dateStrings = await dataService.fetchJournalDatesForMonthStreak(username);
    // --- End Service Call ---
    res.status(200).json({ success: true, count: dateStrings?.length, data: dateStrings });
  } catch (error: any) {
    handleControllerError(res, error, `Failed to fetch journal streak dates for ${username}`);
  }
};

// 4. :username/moods (No change needed)
export const getLatestMoods = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  Logger.info(`[DataController] Request received for latest moods for user: ${username}`);
  try {
    const moods = await dataService.fetchLatestMoods(username);
    res.status(200).json({ success: true, count: moods.length, data: moods });
  } catch (error: any) {
    handleControllerError(res, error, `Failed to fetch latest moods for ${username}`);
  }
};

// 5. :username/journal/:journalId (No change needed)
export const getJournalEntry = async (req: Request, res: Response) => {
  const { username, journalId } = req.params;
  Logger.info(
    `[DataController] Request received for journal entry ID: ${journalId} (user: ${username})`
  );
  try {
    const entry = await dataService.fetchJournalEntryById(journalId);
    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: `Journal entry not found with ID ${journalId}` });
    }
    if (entry.username !== username) {
      Logger.warn(
        `[DataController] User ${username} attempted to access journal entry ${journalId} belonging to ${entry.username}`
      );
      return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
    }
    res.status(200).json({ success: true, data: entry });
  } catch (error: any) {
    handleControllerError(res, error, `Failed to fetch journal entry ${journalId}`);
  }
};

export const getAllChatSessions = async (req: Request, res: Response) => {
  const { username } = req.params;
  Logger.info(`[DataController] Request received for all chat session info for user: ${username}`);
  try {
    // --- Service now returns array of IChatSessionInfo or null ---
    const chatSessionInfos = await dataService.fetchAllChatSessionsByUsername(username);
    // --- End Service Call ---

    if (chatSessionInfos === null) {
      // Check explicitly for null (user doc not found)
      return res
        .status(200)
        .json({ success: false, message: `User chat history not found for ${username}` });
    }
    // --- Return the array of chat session info objects ---
    res.status(200).json({ success: true, count: chatSessionInfos.length, data: chatSessionInfos });
    // --- End Return Logic ---
  } catch (error: any) {
    handleControllerError(res, error, `Failed to fetch all chat session info for ${username}`);
  }
};
