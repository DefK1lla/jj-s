import mongoose from "mongoose";

interface IFolder {
    game_id: string;
    name: string;
    img?: Buffer; 
}


const folderJson = new mongoose.Schema<IFolder>({
    game_id: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: Buffer, required: false },

});

export const Folder = mongoose.model<IFolder>("folder", folderJson);