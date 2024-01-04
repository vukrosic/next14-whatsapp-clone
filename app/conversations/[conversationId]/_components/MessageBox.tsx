'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "@clerk/nextjs";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/_components/Avatar";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  prevMsgIsOwn?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  isLast,
  prevMsgIsOwn
}) => {
  const session = useSession().session;
  const [imageModalOpen, setImageModalOpen] = useState(false);


  const isOwn = session?.user.primaryPhoneNumber?.phoneNumber === data?.sender?.phoneNumber
  const seenList = (data.seen || [])
    .filter((user) => user.phoneNumber !== data?.sender?.phoneNumber)
    .map((user) => user.username)
    .join(', ');

  const container = clsx('flex p-[2px]', isOwn && 'justify-end');
  const body = clsx('flex flex-col', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden ml-16 mr-16',
    isOwn ? 'bg-[#d1f4cc] text-black' : 'bg-gray-100',
    data.image ? 'rounded-[3px] p-0' : 'rounded-[4px] py-2 px-3 shadow-2xl shadow-gray-300 shadow'
  );

  return (
    <div className={container}>
      <div className={body}>
        <div className={message}>
          <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div className="flex flex-col">
              <p className="mr-22">
                {data.body}
              </p>
              <div className="flex">
                <div className="text-xs text-gray-400 ml-auto">
                  {format(new Date(data.createdAt), 'p')}
                </div>
                <img src="images/Sent.svg" className="mr-1 ml-1" />
                <Image src="images/Sent.svg" alt="Sent" width="16" height="16" />
              </div>
            </div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
