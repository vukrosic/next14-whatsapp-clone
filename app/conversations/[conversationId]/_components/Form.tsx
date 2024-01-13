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
import EmojiPicker from "./EmojiPicker";
import { Plus } from "lucide-react";
import UploadFileButton from "./UploadFileButton";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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


  const handleEmojiChange = (emojiValue: string) => {
    setValue('message', `${getValues('message')}${emojiValue}`);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <EmojiPicker onChange={handleEmojiChange} />


        <UploadFileButton conversationId={conversationId} />

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