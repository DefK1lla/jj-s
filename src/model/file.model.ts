import mongoose from "mongoose";

interface IFileJson {
    org_file_id: string,
    name: string,
    data?: string,
    local: string[],
}

const fileJson = new mongoose.Schema<IFileJson>({
    org_file_id: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: String, required: true },
    local: { type: [String], required: true },
});

export const FileJson = mongoose.model('file', fileJson)