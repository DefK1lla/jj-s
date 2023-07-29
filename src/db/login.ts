import { Schema, model } from "mongoose";

interface IUser {
    username: string;
    password: Buffer;
    salt: Buffer;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: Buffer, required: true },
    salt: { type: Buffer, required: true}
});

const User = model<IUser>('userAuthentication', userSchema);

export async function setLogin(username: string, password: Buffer, salt: Buffer) {
    try{
        const user = new User({
            username: username,
            password: password,
            salt: salt
        });

        await user.save();
    } catch (e) {
        throw e;
    }
}

export async function getLogin(username: string) {
    const User = model<IUser>('userAuthentication', userSchema);

    const user = await User.findOne({ username: username });

    if (user === null) { return null }

    return { id: user.id, username: user.username, password: user.password, salt: user.salt };

}