import { Interpreter } from "../model/interpreter.model";

export async function createInterpreter(
    user_id: string, 
    name: string, 
    recent_translated: string[], 
    scored_text: { text_id: number, is_score_positive: boolean | undefined }, 
    ) {
        try {
            const isDataExist = Interpreter.findOne({ user_id: user_id });

            if(isDataExist === null) {
                return new Error('Interpreter exist and it have to be unique');
            }

            const interpreter = new Interpreter({
                user_id: user_id,
                name: name,
                recent_translated: recent_translated,
                scored_text: scored_text,
            });
            
            return await interpreter.save();
        } catch (e) {
            throw new Error('Can not save Interpreter');
        }
}

export async function updateInterpreter(
    user_id: string,
    name: string, 
    recent_translated: string[], 
    scored_text: { text_id: number, is_score_positive: boolean | undefined }
    ) {
    try {
        return await Interpreter.findOneAndUpdate({ user_id: user_id }, {
            name: name,
            recent_translated: recent_translated,
            scored_text: scored_text
         });
    } catch (e) {
        throw new Error('Can not update Interpreter');
    }
}

export async function getInterpreter(user_id: string) {
    try {
        return await Interpreter.findOne({user_id: user_id});
    } catch (e) {
        throw new Error('Can not find Interpreter');
    }
}

export async function deleteInterpreter(id: string) {
    try {
        return await Interpreter.findByIdAndDelete(id);
    } catch (e) {
        throw new Error('Can not delete Interpreter');
    }
}