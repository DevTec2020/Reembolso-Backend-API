import fs from "node:fs"
import path from "node:path"

import uploadsConfig from "@/configs/upload"

export class DiskStorage {

    //O arquivo fica em uma pasta temporaria "tmp", aqui eu pego ele e movo para a pasta definitiva "uploads" 
    async saveFile(file: string) {
        await fs.promises.rename(
            path.resolve(uploadsConfig.TMP_FOLDER, file),
            path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        )

        return file
    }


    async deleteFile(file: string, type: "tmp" | "upload") {
        const pathFile = 
            type === "tmp" ? uploadsConfig.TMP_FOLDER : uploadsConfig.UPLOADS_FOLDER

        const filePath = path.resolve(pathFile, file)

        // Verificando se o arquivo existe na pasta tmp ou upload
        try {
            await fs.promises.stat(filePath)
        } catch {
            // Caso o arquivo não exista na pasta eu coloquei para ele sair dessa função deleteFile
            return
        }

        // se o arquivo existir, eu deleto ele
        await fs.promises.unlink(filePath)
    }
}