// src/services/dataService.ts
import crypto from 'crypto';
import UserChatHistory, { IChatEntry } from '../models/chatSession'; // Correct model import
import JournalEntry, { IJournalEntry } from '../models/journalEntry';
import Logger from '../utils/logger';
import { startOfMonth, endOfMonth, format } from 'date-fns'; // Keep format
import mongoose from 'mongoose';

interface IFetchedChat {
  // For single chat fetch
  chatid: string;
  chats: any[];
}

interface IChatSessionInfo {
  chatId: string;
  title: string;
  date: string; // Date is stored as string in DB
}

export const generateNewChatIdService = (): string => {
  const newChatId = crypto.randomUUID();
  Logger.info(`[DataService] Generated new chat ID: ${newChatId}`);
  return newChatId;
};

export const fetchChatSessionById = async (
  username: string,
  chatId: string
): Promise<IFetchedChat | null> => {
  // Return type remains the desired transformed object
  try {
    const query = { username };
    Logger.debug(
      `[DataService] Fetching user chat history doc with query: ${JSON.stringify(query)}`
    );
    // Fetch the lean document (plain JS object)
    const userHistoryDoc = await UserChatHistory.findOne(query).lean();

    // --- Access chat data using chatId as a dynamic key ---
    // Check if user doc exists AND if the specific chatId key exists on it
    if (userHistoryDoc && typeof userHistoryDoc === 'object' && userHistoryDoc[chatId]) {
      // --- Cast the found entry to IChatEntry for potential type hints (not enforced) ---
      const chatEntry = userHistoryDoc[chatId] as IChatEntry;
      // --- End Cast ---

      // Ensure the nested 'chat' array exists before returning
      if (chatEntry && Array.isArray(chatEntry.chat)) {
        Logger.info(
          `[DataService] Found chat entry for user ${username}, chatId ${chatId}. Transforming output.`
        );
        // --- Transform to desired output format ---
        return {
          chatid: chatId, // Use the requested lowercase key 'chatid'
          chats: chatEntry.chat // Use the requested key 'chats' for the array
        };
        // --- End Transformation ---
      } else {
        Logger.warn(
          `[DataService] Chat entry found for ${username}/${chatId}, but 'chat' array is missing or invalid.`
        );
        return null; // Or handle as error? Returning null as entry is incomplete.
      }
    } else {
      Logger.warn(`[DataService] No chat entry found for user ${username}, chatId ${chatId}`);
      return null;
    }
    // --- End Access Logic ---
  } catch (error: any) {
    Logger.error(
      `[DataService] Error fetching chat entry for ${username}/${chatId}: ${error.message}`
    );
    throw new Error(`Database error fetching chat entry: ${error.message}`);
  }
};

export const fetchJournalDatesForMonthStreak = async (
  // --- Renamed function ---
  username: string
): Promise<string[] | null> => {
  // Return type is string[] | null
  try {
    const query = { username };
    Logger.debug(
      `[DataService] Fetching user history doc for current month chat dates: ${JSON.stringify(
        query
      )}`
    );
    // Fetch the user document containing all chats
    const userHistoryDoc = await UserChatHistory.findOne(query).lean();

    if (!userHistoryDoc) {
      Logger.warn(
        `[DataService] No user history document found for user ${username} while fetching chat dates.`
      );
      return null; // User not found
    }

    // --- Determine current month boundaries ---
    const now = new Date();
    const startDate = startOfMonth(now);
    const endDate = endOfMonth(now);
    // Format boundaries for string comparison (safe for YYYY-MM-DD)
    const startDateString = format(startDate, 'yyyy-MM-dd');
    const endDateString = format(endDate, 'yyyy-MM-dd');
    // --- End Date Boundaries ---

    const datesInMonth: string[] = [];
    const knownKeys = ['_id', 'username', 'createdAt', 'updatedAt', '__v']; // Keys to ignore

    // --- Iterate over the dynamic chatID keys in the document ---
    for (const key in userHistoryDoc) {
      // Skip prototype properties and known static fields
      if (!Object.prototype.hasOwnProperty.call(userHistoryDoc, key) || knownKeys.includes(key)) {
        continue;
      }

      // Assume the key is a chatId, get the chat entry object
      const entry = userHistoryDoc[key] as IChatEntry;

      // --- Check if entry date exists and falls within the current month ---
      if (entry && typeof entry.date === 'string') {
        // Direct string comparison works for YYYY-MM-DD format
        if (entry.date >= startDateString && entry.date <= endDateString) {
          datesInMonth.push(entry.date);
        }
      }
      // --- End Date Check ---
    }
    // --- End Iteration ---

    // Optional: Sort dates if needed
    // datesInMonth.sort();

    Logger.info(
      `[DataService] Found ${datesInMonth.length} chat dates (strings) for user ${username} in current month`
    );
    return datesInMonth;
  } catch (error: any) {
    Logger.error(
      `[DataService] Error fetching chat dates for current month for ${username}: ${error.message}`
    );
    throw new Error(`Database error fetching chat dates for current month: ${error.message}`);
  }
};

export const fetchLatestMoods = async (
  username: string
): Promise<(string | undefined | null)[]> => {
  try {
    // --- Corrected Query ---
    const query = {
      username: username,
      'metadata.mood': {
        $exists: true, // Ensure the mood field exists
        $nin: [null, ''] // Use $nin (not in) to exclude both null and empty string
      }
    };
    // --- End Correction ---
    Logger.debug(`[DataService] Fetching latest moods with query: ${JSON.stringify(query)}`);

    const entries = await JournalEntry.find(query)
      .sort({ date: -1 }) // Sort by date string (descending)
      .limit(7)
      .select('metadata.mood date')
      .lean();

    const moods = entries.map((entry) => entry.metadata?.mood);
    Logger.info(`[DataService] Found ${moods.length} latest moods for user ${username}`);
    return moods;
  } catch (error: any) {
    Logger.error(`[DataService] Error fetching latest moods for ${username}: ${error.message}`);
    throw new Error(`Database error fetching latest moods: ${error.message}`);
  }
};

export const fetchJournalEntryById = async (journalId: string): Promise<IJournalEntry | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(journalId)) {
      Logger.warn(`[DataService] Invalid journal ID format received: ${journalId}`);
      return null;
    }
    Logger.debug(`[DataService] Fetching journal entry with ID: ${journalId}`);
    const entry = await JournalEntry.findById(journalId).lean();
    if (entry) {
      Logger.info(`[DataService] Found journal entry with ID: ${journalId}`);
    } else {
      Logger.warn(`[DataService] No journal entry found with ID: ${journalId}`);
    }
    return entry;
  } catch (error: any) {
    Logger.error(`[DataService] Error fetching journal entry by ID ${journalId}: ${error.message}`);
    throw new Error(`Database error fetching journal entry by ID: ${error.message}`);
  }
};

export const fetchAllChatSessionsByUsername = async (
  username: string
): Promise<IChatSessionInfo[] | null> => {
  // --- Return type changed ---
  try {
    const query = { username };
    Logger.debug(
      `[DataService] Fetching user history doc for all chat info: ${JSON.stringify(query)}`
    );
    // Fetch the lean document (plain JS object)
    const userHistoryDoc = await UserChatHistory.findOne(query).lean();

    if (userHistoryDoc && typeof userHistoryDoc === 'object') {
      // --- Extract keys and filter out known/Mongoose fields ---
      const knownKeys = ['_id', 'username', 'createdAt', 'updatedAt', '__v'];
      const chatIds = Object.keys(userHistoryDoc).filter((key) => !knownKeys.includes(key));
      // --- End Key Extraction ---

      // --- Map chatIds to the desired output format ---
      const chatSessionInfos: IChatSessionInfo[] = chatIds.map((id) => {
        // Access the data under the dynamic key (chatId)
        const entry = userHistoryDoc[id] as IChatEntry; // Cast to IChatEntry for type hint
        return {
          chatId: id, // Use the key as chatId
          // Use nullish coalescing or default values in case fields are missing in some entries
          title: entry?.title ?? 'Untitled',
          date: entry?.date ?? 'Unknown Date'
        };
      });

      Logger.info(
        `[DataService] Found and formatted info for ${chatSessionInfos.length} chat sessions for user ${username}`
      );
      return chatSessionInfos; // Return the array of info objects
    } else {
      Logger.warn(`[DataService] No user history document found for user ${username}`);
      return null; // Return null if the user document itself doesn't exist
    }
  } catch (error: any) {
    Logger.error(
      `[DataService] Error fetching all chat session info for ${username}: ${error.message}`
    );
    throw new Error(`Database error fetching all chat session info`);
  }
};
