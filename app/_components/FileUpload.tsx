"use client"

import { UploadButton } from "@/lib/uploadthing"

import "@uploadthing/react/styles.css"

interface FileUploadProps {
    endpoint: "messageFile" | "statusImage"
}

const FileUpload = ({
    endpoint
}: FileUploadProps) => {
    return (
        <div>
            <UploadButton
                content={{
                    button({ ready }) {
                        if (ready) return <div className="flex">
                            <img src="/images/PhotosIcon.svg" className="mr-3" alt="Photos and Videos" />
                            <p className="text-black">Photos & Videos</p>
                        </div>;

                        return <div className="flex">
                            <img src="/images/PhotosIcon.svg" className="mr-3" alt="Photos and Videos" />
                            <p className="text-black">Getting ready...</p>
                        </div>
                    }
                }}
                appearance={{
                    allowedContent: { display: 'none' },
                    button: { border: 'none', background: '#fff', cursor: 'pointer' },
                }}
                endpoint={endpoint}
                onClientUploadComplete={(res: any) => {
                    console.log("UPLOADING");
                }}
                onUploadError={(err: Error) => {
                    console.log(err);
                }}
            />
        </div>
    );
}

export default FileUpload;