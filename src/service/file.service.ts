import fs from "fs";

import { FileJson } from "../model/file.model";

export async function createFile(author_id: string, parentFolderId: string, name: string, local: string, data: string) {
        try {
            const subFile = new FileJson({
                folder_id: parentFolderId,
                name: name,
                local: local,
                author_id: author_id
            });
            if (data) {
                let result = await subFile.save();
                fs.access('./src/files', (err) => {
                    if (err) {
                        fs.mkdirSync('./src/files');
                    } else {
                        fs.writeFileSync(`./src/files/${result.id}_${result.name}_original.json`, data);
                        fs.writeFileSync(`./src/files/${result.id}_${result.name}_translate.json`, data);
                    }
                })
            } else {
                throw "file validation failed: data: Path `data` is required."
            }


        } catch (e: any) {
            console.log(e)
            throw e
        }
}
export async function setTranslate(id: string, translate: string) {
    try {
        const result = await FileJson.findById(id);
        const translateFile = fs.writeFileSync(`./src/files/${id}_${result?.name}_translate.json`, translate);

        return translateFile;
    } catch (e) {
        console.log(e)
        throw e
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
                folder_id: item.folder_id
            }
        })
    } catch(e) {
        console.log(e)
        throw e
    }
}

export async function getFile(id: string) {
    try {
        const file = await FileJson.findById(id);

        const original = fs.readFileSync(`./src/files/${id}_${file!.name}_original.json`, "utf-8").toString();
        const translate = fs.readFileSync(`./src/files/${id}_${file!.name}_translate.json`, "utf-8").toString();

        return {
            id: id,
            name: file?.name,
            local: file?.local,
            data: original,
            translate: translate,
            folder_id: file?.folder_id
        }

    } catch(e) {
        console.log(e)
        throw e
    }
}

export async function updateFile(id: string, name: string, local: string, data: object | object[]) {
    try {
        const file = await FileJson.findById(id);
        const result = await FileJson.findByIdAndUpdate(
            {_id: id },
            {
                name: name,
                local: local,
            }
        );
        const original = fs.readFileSync(`./src/files/${id}_${file!.name}_original.json`, "utf-8").toString();
        const translate = fs.readFileSync(`./src/files/${id}_${file!.name}_translate.json`, "utf-8").toString();

        fs.unlinkSync(`./src/files/${id}_${file!.name}_original.json`);
        fs.unlinkSync(`./src/files/${id}_${file!.name}_translate.json`);

        fs.writeFileSync(`./src/files/${id}_${name}_original.json`, original);
        fs.writeFileSync(`./src/files/${id}_${name}_translate.json`, translate);
        return {
            id: result?.id,
            name: result?.name,
            local: result?.local,
            folder_id: result?.folder_id,
            data: original,
            translate: translate
        };

    } catch (e) {
        console.log(e)
        throw e
    }
}


export async function deleteFileJsonById(id: string) {
    try {
        const file = await FileJson.findById(id);

        fs.unlinkSync(`./src/files/${id}_${file!.name}_original.json`);
        fs.unlinkSync(`./src/files/${id}_${file!.name}_translate.json`);
        return await FileJson.findByIdAndRemove(id);
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function getNewFiles(authorId: string) {
    try {
        const result = await FileJson.find({ author_id: authorId }).sort({ createdAt: -1}).limit(4);
        return result.map((item) => {
            return {
                id: item.id,
                name: item.name,
                local: item.local
            }
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function getFilesByAuhtorId(authorId: string) {
    try { 
        const result = await FileJson.find({ author_id: authorId});
        return result.map((file) => {   
            const translate = fs.readFileSync(`./src/files/${file.id}_${file!.name}_translate.json`, "utf-8").toString();
            return {
                name: file.name,
                local: file.local,
                translate: translate,
            }
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}
