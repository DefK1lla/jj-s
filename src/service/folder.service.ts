import { Folder } from "../model/folder.model";
import { FileJson } from "../model/file.model";

export async function createFolder(name: string, game_id: string, img?: string) {
    try {
        let datas = "";
        let buffer;
        if(img){
            [, datas] = img.split(",");
            buffer = Buffer.from(datas, "base64");
        } else {
            buffer = undefined
        }
        const file = new Folder({
            name: name,
            game_id: game_id,
            img: buffer
        });
        
        return await file.save();
    } catch (e) {
        throw new Error('Can not create the folder');
    }
}

export async function getFolders(id: string) {
    try {
        const folders = await Folder.find({game_id: id});
        return folders.map((item) => ({
            name: item.name,
            img: item.img?.toString("base64"),
            id: item._id,
            game_id: item.game_id
        }))
    } catch (e) {
        throw new Error('Can not find any folders');
    }
}

export async function getFolderById(id: string) {
    try {
        const folder = await Folder.findById(id);
        return {
            id: folder?.id,
            img: folder!.img!.toString("base64"),
            name: folder?.name,
            game_id: folder?.game_id
        }
    } catch (e) {
        throw new Error('Can not find the folder by id');
    }
}

export async function updateFolder(id: string, name: string, data: object | object[], img?: string) {
    try {
        let datas = "";
        let buffer;
        if(img){
            [, datas] = img.split(",");
            buffer = Buffer.from(datas, "base64");
        } else {
            buffer = undefined
        }
        return await Folder.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                data: data,
                img: buffer
            }
        );
    } catch (e) {
        throw new Error('Can not update the folder');
    }
}

export async function deleteFolderById(id: string) {
    try{
        await FileJson.deleteMany({ org_file_id: id});
        return await Folder.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete the folder by ID');
    }
}