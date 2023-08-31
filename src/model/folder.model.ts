import mongoose from "mongoose";

interface IFolder {
    game_id: string;
    name: string;
}


const folderJson = new mongoose.Schema<IFolder>({
    game_id: { type: String, required: true },
    name: { type: String, required: true },

});

export const Folder = mongoose.model<IFolder>("folder", folderJson);