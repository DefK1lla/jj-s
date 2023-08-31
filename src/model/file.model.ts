import mongoose from "mongoose";

interface IFileJson {
    folder_id: string,
    name: string,
    local: string,
    author_id: string
}

const fileJson = new mongoose.Schema<IFileJson>({
    folder_id: { type: String, required: true },
    name: { type: String, required: true },
    local: { type: String, required: true },
    author_id: { type: String, required: true}
}, { timestamps: true });

export const FileJson = mongoose.model<IFileJson>('file', fileJson)
