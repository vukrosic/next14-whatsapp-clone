'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "@clerk/nextjs";
import { FullMessageType } from "@/app/types";

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

  return (
    <div className={clsx('flex mb-[2px]', isOwn && 'justify-end items-start')}>
      {!isOwn &&
        <div className="ml-16 flex items-start">
          <img
            src="/images/MessageBubbleTriangleWhite.svg"
            className="transform scale-x-[-1] items-start"
          />
        </div>
      }

      <div className={clsx('flex flex-col', isOwn && 'items-end')}>

        <div className={clsx(
          'text-sm w-fit overflow-hidden ',
          isOwn ? 'bg-[#d1f4cc] text-black' : 'bg-gray-100',
          data.image ? 'rounded-[3px]' : 'rounded-[7px] py-2 px-3 shadow-lg shadow-gray-300 shadow-bottom'
        )}>



          {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
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
                text-sm
              "
            />
          ) : (
            <div className="flex flex-col relative max-w-[600px]">
              <p className="mb-2 break-words mr-20">
                {data.body}
              </p>



              <div className="absolute bottom-0 right-0 flex items-end">
                <div className="text-[11px] h-[15px] text-gray-500">
                  {format(new Date(data.createdAt), 'p')}
                </div>
                {isOwn &&
                  <img src={SeenInfo} className="mr-[2px] ml-[2px] w-[16px] h-[11px]" />}
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
      {isOwn &&
        <img src="/images/MessageBubbleTriangle.svg" className="mr-16" />}



    </div>
  );
}

export default MessageBox;
