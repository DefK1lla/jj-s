import fs from "fs";

import { Game } from "../model/game.model";
import { Folder } from "../model/folder.model";
import { FileJson } from "../model/file.model";

export async function createGame(author_id: string, name: string, img: string) {
    try {
        const game = new Game({
            author_id: author_id,
            name: name,
        });

        const data = await game.save();
        fs.access("./src/img", (err) => {
            if (err) {
                fs.mkdirSync('./src/imgs');
            } else {
                fs.writeFileSync(`./src/imgs/${data.id}`, img);
            }
        })
    } catch (e: any) {
        console.log(e)
        throw e
    }
}

export async function getGameById(id: string) {
    try {
        
        const game = await Game.findById(id);
        
        if(game !== null){
            const img = fs.readFileSync(`./src/imgs/${game.id}`).toString();
            return {
                name: game.name,
                id: game._id,
                author_id: game?.author_id,
                img: img
            }
        } else {
            return {};
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function getGames() {
    try {
        const game = await Game.find();
        return game.map((item) => {
            const img = fs.readFileSync(`./src/imgs/${item.id}`).toString();
            return {
                name: item.name,
                id: item._id,
                author_id: item.author_id,
                img: img
            }
        })
    } catch (e: any) {
        console.log(e)
        throw e
    }
}

export async function updateGame(id: string, name: string, img: string) {
    try {
        return await Game.findByIdAndUpdate({ _id: id }, {
            name: name,
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function deleteGame(id: string) {
    try {
        const game = await Game.findById(id);
        const folders = await Folder.find({ game_id: game!.id });
        folders.forEach(async (folder) => {
            const files = await FileJson.find({ folder_id: folder.id});
            files.forEach(async (file) => {
                fs.unlinkSync(`./src/imgs/${file.id}`)
            })

            await FileJson.deleteMany({ folder_id: folder.id });
            fs.unlinkSync(`./src/imgs/${folder.id}`);
        })
        
        fs.unlinkSync(`./src/imgs/${id}`);
        
        await Game.findByIdAndDelete(id);
        
    } catch (e) {
        console.log(e)
        throw e
    }
}