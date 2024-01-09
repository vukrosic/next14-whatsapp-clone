import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs"

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth()
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId }
}


export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    statusImage: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
        video: { maxFileSize: "32MB", maxFileCount: 1 }
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf", "text", "video", "audio"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;