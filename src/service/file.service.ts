import { FileJson, ChildFileJson } from "../model/file.model";

export async function createFile(name: string, local: string, data: object | object[]) {
    try {
        const file = new FileJson({
            name: name,
            local: local,
            data: data,
        });
        
        return await file.save();
    } catch (e) {
        throw new Error('Can not create file');
    }
}

export async function createChildFile(parentFileId: string, name: string, local: string, data: object | object[]) {
        try {
            const subFile = new ChildFileJson({
                org_file_id: parentFileId,
                name: name,
                local: local,
                data: data
            });

            return await subFile.save();
        } catch (e) {
            throw new Error('Can not create child file');
        }
}

export async function getFiles() {
    try {
        return await FileJson.find();
    } catch (e) {
        throw new Error('Can not find any files');
    }
}

export async function getChildFiles(parentFileId: number) {
    try {
        return await ChildFileJson.find({ org_file_id: parentFileId });
    } catch(e) {
        throw new Error('Can not find any child files by parent\'s ID');
    }
}

export async function updateFile(id: string, name: string, local: string, data: object | object[]) {
    try {
        return await FileJson.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                local: local,
                data: data
            }
        );
    } catch (e) {
        throw new Error('Can not update file');
    }
}

export async function updateChildFile(id: string, name: string, local: string, data: object | object[]) {
    try {
        return await ChildFileJson.findById(
            {_id: id },
            {
                name: name,
                local: local,
                data: data
            }
        );
    } catch (e) {
        throw new Error('Can not update child file');
    }
}

export async function deleteFileById(id: string) {
    try{
        await ChildFileJson.deleteMany({ org_file_id: id});
        return await FileJson.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete file by ID');
    }
}

export async function deleteChildFileJsonById(id: string) {
    try {
        return await ChildFileJson.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Can not delete child file by ID');
    }
}