// src/models/ChatSession.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for the structure WITHIN a specific chatId key
export interface IChatEntry {
  chat: any[]; // Array like [{ you: "..."}, { mirror_you: "..."}]
  date: string; // Stored as string "YYYY-MM-DD"
  title: string;
}

// Interface for the main User Chat History document
export interface IUserChatHistory extends Document {
  _id: Types.ObjectId;
  username: string;
  // Represents the object containing dynamic chatId keys: { "123": IChatEntry, "456": IChatEntry }
  chats: Record<string, IChatEntry>;
  createdAt?: Date;
  updatedAt?: Date;
  // Index signature to acknowledge dynamic keys
  [key: string]: any;
}

// Main Schema for the 'chatHistory' collection (one doc per user)
const UserChatHistorySchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true }
    // We DON'T define fields for the dynamic chatId keys here.
  },
  {
    timestamps: true,
    collection: 'chatHistory', // --- Updated collection name ---
    strict: false // Allow dynamic top-level keys NOT defined in schema
  }
);

// Model Export
// Model represents documents in the 'chatHistory' collection
const UserChatHistory = mongoose.model<IUserChatHistory>('UserChatHistory', UserChatHistorySchema);
export default UserChatHistory;
