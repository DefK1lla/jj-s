import { User } from "../model/user.model";

export async function saveUser(name: string, password: string) {
  try {
    const isUserExist = await User.findOne({ name: name });
    if (isUserExist !== null) {
      console.dir(isUserExist !== null);
    } //return new Error("userExist") }
    const user = new User({
      name: name,
      password: password,
    });
    return await user.save();
  } catch (e: any) {
    throw e.message;
  }
}

export async function authentication(name: string) {
  const user = await User.findOne({ name: name });

  if (user === null) {
    return null;
  }

  return { id: user.id, username: user.name, password: user.password };
}

export async function authenticationById(id: string) {
  return await User.findById(id);
}
