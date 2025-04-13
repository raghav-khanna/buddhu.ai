// src/models/JournalEntry.ts
import mongoose, { Schema, Document } from 'mongoose';

// --- Subdocument Interface for Metadata (Matching image) ---
interface IJournalMetadata {
  tags?: string; // Comma-separated string
  category?: string;
  mood?: string;
  description?: string;
  date?: string; // String date "YYYY-MM-DD"
  username?: string; // Duplicated username
}
// --- End Subdocument Interface ---

// --- Main Document Interface ---
export interface IJournalEntry extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  date: string; // --- Changed to String ---
  journal: string[]; // --- Changed name to 'journal' and type to [String] ---
  metadata?: IJournalMetadata; // Metadata object is optional
  createdAt?: Date; // Added by timestamps: true
  updatedAt?: Date; // Added by timestamps: true
}
// --- End Main Document Interface ---

// --- Subdocument Schema for Metadata ---
const JournalMetadataSchema: Schema = new Schema(
  {
    tags: { type: String },
    category: { type: String },
    mood: { type: String },
    description: { type: String },
    date: { type: String }, // Storing as String
    username: { type: String }
  },
  { _id: false }
);
// --- End Subdocument Schema ---

// --- Main Schema ---
const JournalEntrySchema: Schema = new Schema(
  {
    username: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true }, // --- Changed to String ---
    journal: { type: [String], required: true }, // --- Changed field name and type ---
    metadata: { type: JournalMetadataSchema, required: false } // Optional metadata object
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    collection: 'journal' // --- Explicitly naming the collection 'journal' ---
  }
);

// --- Indexes ---
JournalEntrySchema.index({ username: 1, date: -1 }); // Index for fetching by user, sorted by date (lexicographical sort due to String type)

// --- Model Export ---
const JournalEntry = mongoose.model<IJournalEntry>('JournalEntry', JournalEntrySchema);
export default JournalEntry;
