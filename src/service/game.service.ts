import { Game } from "../model/game.model";

export async function createGame(author_id: string, name: string, img: string) {
    try {
        let datas = "";
        let buffer;
        if(img){
            [, datas] = img.split(",");
            buffer = Buffer.from(datas, "base64");
        } else {
            buffer = undefined
        }

        const game = new Game({
            author_id: author_id,
            name: name,
            img: buffer
        });

        return await game.save();
    } catch (e) {
        throw new Error("Can not create the game");
    }
}

export async function getGameById(id: string) {
    try {
        
        const game = await Game.findById(id);
        
        if(game !== null){
            return {
                name: game.name,
                img: game.img?.toString("base64"),
                id: game._id,
                author_id: game?.author_id
            }
        } else {
            return {};
        }
    } catch (e) {
        throw new Error("Can not get any game")
    }
}

export async function getGames() {
    try {
        const game = await Game.find();
        return game.map((item) => ({
            name: item.name,
            img: item.img?.toString("base64"),
            id: item._id,
            author_id: item.author_id
        }))
    } catch (e) {
        throw new Error("Can not get any game")
    }
}

export async function updateGame(id: string, name: string, img: string) {
    try {
        let datas = "";
        let buffer;
        if(img){
            [, datas] = img.split(",");
            buffer = Buffer.from(datas, "base64");
        } else {
            buffer = undefined
        }
        return await Game.findByIdAndUpdate({ _id: id }, {
            name: name,
            img: buffer
        })
    } catch (e) {
        throw new Error("Can not update the game")
    }
}

export async function deleteGame(id: string) {
    try {
        return await Game.findByIdAndDelete(id);
    } catch (e) {
        throw new Error("Can not delete the game");
    }
}