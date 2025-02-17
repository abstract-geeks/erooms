import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const uploadThing = createUploadthing();

export const uploadRouter = {

    roomPicture: uploadThing({
        image: {maxFileCount: 10}
    })
        .middleware( async ({req, res}) => {
            const {userId} = await auth()
            
            if (!userId) {
                throw new UploadThingError("Amministratore non autenticato")
            }

            // TODO: Autorizzazione

            return {userId: userId}
        })
        .onUploadComplete( async ({file}) => {

            return {key: file.key}
        })

} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;