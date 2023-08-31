import mongoose from "mongoose";

interface IGames {
    author_id: string;
    name: string;
}

const game = new mongoose.Schema<IGames>({
    author_id: { type: String, required: true },
    name: { type: String, required: true },
});

export const Game = mongoose.model<IGames>("game", game);