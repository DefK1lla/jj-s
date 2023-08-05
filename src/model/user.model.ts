import mongoose from "mongoose";
interface IUser {
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('userAuthentication', userSchema);