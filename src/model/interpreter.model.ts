import mongoose from "mongoose";

interface IInterpreter {
  user_id: string;
  translated_text_id: number;
  name: string;
  translated_text: string;
  translated_text_score: number;
  who_appreciates_id: string;
}

interface ITranslation {
  data_id: string;
  interpreter: [IInterpreter];
}

const interpreter = new mongoose.Schema<IInterpreter>({
  user_id: { type: String, required: true },
  translated_text_id: { type: Number, required: true },
  name: { type: String, required: true },
  translated_text: { type: String, required: true },
  translated_text_score: { type: Number, default: 0 },
  who_appreciates_id: { type: String, required: false },
});

const translation = new mongoose.Schema<ITranslation>({
  data_id: { type: String, required: true },
  interpreter: [{ type: interpreter, require: true }],
});

export const Translation = mongoose.model("translation", translation);
