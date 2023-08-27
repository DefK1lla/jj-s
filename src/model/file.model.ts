import mongoose from "mongoose";

interface IFileJson {
    folder_id: string,
    name: string,
    data: string,
    translate?: string,
    local: string,
}

const fileJson = new mongoose.Schema<IFileJson>({
    folder_id: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: String, required: true },
    translate: { type: String, required: false},
    local: { type: String, required: true },
});

export const FileJson = mongoose.model<IFileJson>('file', fileJson)