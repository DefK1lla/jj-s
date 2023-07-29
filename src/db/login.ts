//import { Schema, model } from "mongoose";
import mongoose from "mongoose";
interface IUser {
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model<IUser>('userAuthentication', userSchema);

export async function setLogin(username: string, password: string) {
    try{
        const isUserExist = await User.findOne({ username: username });
        
        if (isUserExist) { return new Error("userExist") }
        const user = new User({
            username: username,
            password: password
        });
        return await user.save();
        
    } catch (e) {
        throw e;
    }
}

export async function getLogin(username: string) {
    const user = await User.findOne({ username: username });

    if (user === null) { return null }

    return { id: user.id, username: user.username, password: user.password };
}

export async function getLoginById(id: string) {
    return await User.findById(id)
}