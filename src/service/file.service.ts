import { FileJson } from "../model/file.model";

export async function createFile(parentFolderId: string, name: string, local: string, data: object | object[]) {
        try {
            const subFile = new FileJson({
                org_file_id: parentFolderId,
                name: name,
                local: local,
                data: data,
            });

            return await subFile.save();
        } catch (e) {
            throw new Error('Can not create the file');
        }
}

export async function getFiles(parentFileId: number) {
    try {
        return await FileJson.find({ org_file_id: parentFileId });
    } catch(e) {
        throw new Error('Can not find any files by parent\'s ID');
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


export async function deleteChildFileJsonById(id: string) {
    try {
        return await FileJson.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete the file by ID');
    }
}