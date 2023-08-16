import mongoose from "mongoose";

interface IGames {
    author_id: string;
    name: string;
    img?: Buffer;
}

export const game = new mongoose.Schema<IGames>({
    author_id: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: Buffer, required: false }
});