import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

interface UploadFileButtonProps {
    conversationId: string
}

const UploadFileButton = ({
    conversationId
}: UploadFileButtonProps) => {
    const [imageUrl, setImageUrl] = useState("");
    const { toast } = useToast()

    const handleUpload = (url: string) => {
        axios.post('/api/messages', {
            image: url,
            conversationId: conversationId
        })
            .then((response) => {
                console.log("Uploaded image in UploadFileButton")
                console.log(response.data);
                setImageUrl(url)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <UploadButton
                content={{
                    button({ ready }) {
                        return (
                            <div>
                                {imageUrl === "" ? (
                                    <div className="transform animate-spin duration-300">
                                        <Plus size={24} className="text-zinc-500" />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="w-[212px] h-[212px] rounded-full overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                className="w-full h-full object-cover"
                                                alt="Uploaded Image"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        )
                    }
                }}
                appearance={{
                    allowedContent: { display: 'none' },
                    button: { border: 'none', background: '#fff', cursor: 'pointer', height: '100%', width: '100%', justifyContent: 'start' },
                }}
                className="w-fit"
                endpoint="statusImage"
                onUploadError={(err: Error) => {
                    console.log(err);
                }}
                onUploadBegin={() => {
                    // setDisableSubmitButton(true)
                    toast({
                        title: "Uploading image",
                        description: "Wait a moment...",
                        duration: 30000,
                    })
                }}
                onClientUploadComplete={(res) => {
                    toast({
                        title: "Upload complete!",
                        className: "bg-green-500",
                        duration: 2000,
                    })
                    // setImageUrl(res[0].url)
                    handleUpload(res[0].url)
                    // setDisableSubmitButton(false)
                }}
            />
            <Toaster />
        </div>
    );
}

export default UploadFileButton;