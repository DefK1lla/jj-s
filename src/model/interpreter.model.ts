import mongoose from "mongoose";

interface IScore {
    text_id: number;
    is_score_positive: boolean | undefined; 
}

interface IInterpreter {
    user_id: string;
    name: string;
    recent_translated?: string[],
    scored_text: IScore[],
}



const interpreter = new mongoose.Schema<IInterpreter> ({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    recent_translated: { type: [String], required: false }
});


export const Interpreter = mongoose.model('interpreter', interpreter);