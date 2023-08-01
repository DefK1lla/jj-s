import { User } from "../model/user.model";

export async function saveUser(username: string, password: string) {
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

export async function authentication(username: string) {
    const user = await User.findOne({ username: username });

    if (user === null) { return null }

    return { id: user.id, username: user.username, password: user.password };
}

export async function authenticationById(id: string) {
    return await User.findById(id)
}