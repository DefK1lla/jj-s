import fs from "fs";

import { Folder } from "../model/folder.model";
import { FileJson } from "../model/file.model";

export async function createFolder(name: string, game_id: string, img: string) {
    try {
        const file = new Folder({
            name: name,
            game_id: game_id,
        });
        
        const data = await file.save();
        fs.access('./src/imgs', (err) => {
            if (err) {
                fs.mkdirSync('./src/imgs');
            } else {
                fs.writeFileSync(`./src/imgs/${data.id}`, img);
            }
        })
        return 'success'
    } catch (e: any) {
        console.log(e)
        throw e
    }
}

export async function getFolders(id: string) {
    try {
        const folders = await Folder.find({game_id: id});
        return folders.map((item) => {
            const img = fs.readFileSync(`./src/imgs/${item.id}`).toString();
            return {
                name: item.name,
                id: item._id,
                game_id: item.game_id,
                img: img
            }
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function getFolderById(id: string) {
    try {
        const folder = await Folder.findById(id);
        const img = fs.readFileSync(`./src/imgs/${folder?.id}`).toString();
        return {
            id: folder?.id,
            name: folder?.name,
            game_id: folder?.game_id,
            img: img
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function updateFolder(id: string, name: string, data: object | object[], img?: string) {
    try {
        return await Folder.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                data: data,
            }
        );
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function deleteFolderById(id: string) {
    try{
        const files = await FileJson.find({ org_file_id: id });
        files.forEach((file) => {
            fs.unlinkSync(`./src/imgs/${file.id}`);
        })
        
        fs.unlinkSync(`./src/imgs/${id}`);

        await FileJson.deleteMany({ org_file_id: id });
        return await Folder.findByIdAndRemove(id);
    } catch (e) {
        console.log(e)
        throw e
    }
}