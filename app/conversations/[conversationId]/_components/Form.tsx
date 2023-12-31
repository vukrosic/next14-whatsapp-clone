'use client';

import {
  HiPaperAirplane,
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import FileUpload from "@/app/_components/FileUpload";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }

  return (
    <div
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      {/* <CldUploadButton 
        options={{ maxFiles: 1 }} 
        onUpload={handleUpload} 
        uploadPreset="pgc9ehd5"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <img src="/images/Emoji.svg" alt="Emoji" width={24} height={24} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button id="rotateButton" className="transform animate-spin duration-300">
              <img src="/images/PlusDark.svg" alt="Plus" className="rotate-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-gray-700 shadow-lg text-gray-800">
            <DropdownMenuItem className="p-3">
              <img src="/images/DocumentIcon.svg" />
              <p className="pl-2">Document</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <img src="/images/PhotosIcon.svg" />
              <p className="pl-2">Photos & Videos</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <img src="/images/CameraIcon.svg" />
              <p>Camera</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <img src="/images/ContactIcon.svg" />
              <p>Contact</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <img src="/images/PollIcon.svg" />
              <p>Poll</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3">
              <img src="/images/NewStickerIcon.svg" />
              <p>New Sticker</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        {/* <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button> */}

        <button>
          <img src="/images/Microphone.svg" alt="Emoji" />
        </button>
      </form>
    </div>
  );
}

export default Form;