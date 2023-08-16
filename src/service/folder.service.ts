import { Folder } from "../model/folder.model";
import { FileJson } from "../model/file.model";

export async function createFolder(name: string, local: string, data: object | object[], img?: string) {
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
            local: local,
            data: data,
            img: buffer
        });
        
        return await file.save();
    } catch (e) {
        throw new Error('Can not create the folder');
    }
}

export async function getFolders() {
    try {
        return await Folder.find();
    } catch (e) {
        throw new Error('Can not find any folders');
    }
}

export async function updateFolder(id: string, name: string, local: string, data: object | object[], img?: string) {
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
                local: local,
                data: data,
                img: buffer
            }
        );
    } catch (e) {
        throw new Error('Can not update the folder');
    }
}

export async function deleteFileById(id: string) {
    try{
        await FileJson.deleteMany({ org_file_id: id});
        return await Folder.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete the folder by ID');
    }
}