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
        <div><UploadButton
            endpoint="messageFile"
            onBeforeUploadBegin={(res: any) => {
                console.log("uploading started")
                return res
            }}
            onUploadBegin={(res) => { console.log("uploading started") }}
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
            {/* <UploadButton
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
                onUploadBegin={() => console.log("uploading started")}
                onClientUploadComplete={(res: any) => {
                    console.log("UPLOADING");
                }}
                onUploadError={(err: Error) => {
                    console.log(err);
                }}
            /> */}
        </div>
    );
}

export default FileUpload;