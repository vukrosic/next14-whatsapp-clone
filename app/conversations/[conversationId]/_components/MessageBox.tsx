'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "@clerk/nextjs";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/_components/Avatar";
import ImageModal from "./ImageModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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

  const SeenInfo = useMemo(() => {
    return seenList.length > 0 ? '/images/Seen.svg' : '/images/Sent.svg';
  }, [seenList]);

  const container = clsx('flex mb-[2px]', isOwn && 'justify-end items-start');
  const body = clsx('flex flex-col', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden ml-16',
    isOwn ? 'bg-[#d1f4cc] text-black' : 'bg-gray-100',
    data.image ? 'rounded-[3px]' : 'rounded-[7px] py-2 px-1 shadow-lg shadow-gray-300 shadow-bottom'
  );

  return (
    <div className={container}>

      <div className={body}>

        <div className={message}>

          {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
          {data.image ? (
            // <Image
            //   alt="Image"
            //   height="288"
            //   width="288"
            //   onClick={() => setImageModalOpen(true)}
            //   src={data.image}
            //   className="
            //     object-cover 
            //     cursor-pointer 
            //     hover:scale-110 
            //     transition 
            //     translate
            //     text-sm
            //   "
            // />
            <div>image placeholder</div>
          ) : (
            <div className="flex flex-col relative max-w-[600px]">
              <p className="mb-2 break-words mr-20">
                {data.body}
              </p>
              <div className="group absolute top-0 right-0">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src="/images/DropdownIcon.svg"
                      alt="Dropdown Icon"
                      className="w-[16px] h-[16px] invisible group-hover:visible cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="p-3">Message Info</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">Reply</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">React</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">Forward</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">Pin</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">Keep</DropdownMenuItem>
                    <DropdownMenuItem className="p-3">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>



              <div className="absolute bottom-0 right-0 flex items-end">
                <div className="text-[11px] h-[15px] text-gray-500">
                  {format(new Date(data.createdAt), 'p')}
                </div>
                <img src={SeenInfo} className="mr-[2px] ml-[2px] w-[16px] h-[11px]" />
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
      <img src="/images/MessageBubbleTriangle.svg" className="mr-16" />
    </div>
  );
}

export default MessageBox;
