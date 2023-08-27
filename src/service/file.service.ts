import { FileJson } from "../model/file.model";

export async function createFile(parentFolderId: string, name: string, local: string, data: string) {
        try {
            const subFile = new FileJson({
                folder_id: parentFolderId,
                name: name,
                local: local,
                data: data,
                translate: data
            });

            return await subFile.save();
        } catch (e) {
            throw new Error('Can not create the file');
        }
}
export async function setTranslate(id: string, translate: string) {
    try {
        return await FileJson.findByIdAndUpdate(id, {
            translate: translate
        });
    } catch (e) {
        console.log(e);
        throw new Error('Can not create the translation file');
    }
}

export async function getFiles(folderId: string) {
    try {
        const data = await FileJson.find({ folder_id: folderId });
        return data.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                local: item.local,
                data: item.data,
                translate: item.translate,
                folder_id: item.folder_id
            }
        })
    } catch(e) {
        throw new Error('Can not find any files by parent\'s ID');
    }
}

export async function getFile(id: string) {
    try {
        return await FileJson.findById(id);
    } catch(e) {
        throw new Error('Can not find any files by ID');
    }
}

export async function updateFile(id: string, name: string, local: string, data: object | object[]) {
    try {
        return await FileJson.findByIdAndUpdate(
            {_id: id },
            {
                name: name,
                local: local,
                data: data,
            }
        );
    } catch (e) {
        throw new Error('Can not update the file');
    }
}


export async function deleteFileJsonById(id: string) {
    try {
        return await FileJson.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete the file by ID');
    }
}