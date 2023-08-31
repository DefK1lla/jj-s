import mongoose from "mongoose";

interface IUser {
    name: string;
    password: string;
    admin?: boolean
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('userAuthentication', userSchema);
export const Admin = mongoose.model<IUser>('adminAuthentication', userSchema);