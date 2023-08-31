import { Admin, User } from "../model/user.model";

export async function saveUser(name: string, password: string) {
    try{
        const isUserExist = await User.findOne({ name: name });
        if (isUserExist !== null)  {return isUserExist}
        const user = new User({
            name: name,
            password: password
        });
        return await user.save();
        
    } catch (e: any) {
        console.log(e)
        throw e
    }
}

export async function authentication(name: string) {
    const user = await User.findOne({ name: name });
    
    if (user === null) { return null }

    return { id: user.id, username: user.name, password: user.password };
}

export async function authenticationById(id: string) {
    const user = await User.findById(id)
    
    return {
        id: user?.id,
        username: user?.name,
        admin: false
    }
}

export async function ResetPassword(id: string, password: string) {
    try {
        return await User.findByIdAndUpdate(id , {
            password: password
        })

    } catch (e: any) {
        console.log(e);
        throw e
    }
}

export async function saveAdmin(name: string, password: string) {
    try{
        const isUserExist = await Admin.findOne({ name: name });
        if (isUserExist !== null)  {return isUserExist}
        const user = new Admin({
            name: name,
            password: password
        });
        return await user.save();
        
    } catch (e: any) {
        console.log(e)
        throw e
    }
}

export async function adminAuthentication(name: string) {
    const user = await Admin.findOne({ name: name });
    
    if (user === null) { return null }

    return { id: user.id, username: user.name, password: user.password, admin: false };
}


export async function ResetPasswordAdmin(id: string, password: string) {
    try {
        return await Admin.findByIdAndUpdate(id , {
            password: password
        })

    } catch (e: any) {
        console.log(e);
        throw e
    }
}