import { Schema, Document, model } from "mongoose";

// Define the schema for the PageId
interface IPageId extends Document {
    id: string;
    editorValue: string;
    language: string;
}

const PageIdSchema = new Schema<IPageId>({
    id: { type: String, required: true },
    editorValue: { type: String, required: true },
    language: { type: String, required: true },
});

// Create the PageId model
export const PageId = model<IPageId>("PageId", PageIdSchema);
