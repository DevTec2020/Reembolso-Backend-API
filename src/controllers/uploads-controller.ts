// Controla o envio de arquivos
import { NextFunction, Request, Response } from "express";

import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";

class UploadsController {
    async create(request: Request, response: Response, next: NextFunction) {
        const diskStorage = new DiskStorage()
        const file  = request.file



        try {
            // validando se o arquivo exite
            if (!file) {
                return response.status(400).json({message: "É obrigatório selecionar um arquivo"})
            }
            
            // Validando se o arquivo que recebeu esta na lista de permitidos
            if (!uploadConfig.ACCEPTED_IMAGE_TYPES.includes(file.mimetype)){
                // Deleta se não for
                await diskStorage.deleteFile(file.filename, "tmp")
                
                return response.status(400).json({message: "Formato do arquivo inválido. Apenas JPEG, PNG e PDF são válidos."});
            }

            // Validando tamanho do arquivo
            if (file.size > uploadConfig.MAX_FILE_SIZE){
                // Deleta se não for
                await diskStorage.deleteFile(file.filename, "tmp")
                
                return response.status(400).json({message: "Arquivo é maior que 3M."});
            }

            // Após passar nas validações ele move o arquivo para a pasta uploads
            const filename = await diskStorage.saveFile(file.filename)

            return response.status(201).json({filename})


        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro interno ao realizar upload." });
        }

    }
}

export { UploadsController}