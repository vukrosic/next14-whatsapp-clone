'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";
import { MediaRoom } from "@/app/_components/MediaRoom";
import Form from "./Form";

interface BodyProps {
  initialMessages: FullMessageType[];
  isInCall: boolean;
  showForm: boolean;
}

const Body: React.FC<BodyProps> = ({ initialMessages = [], isInCall, showForm }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    // Scroll to the bottom on new message
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId)

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }))
    };


    // executes on mount or when conversationId changes
    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    // executes on unmount or when conversationId changes, but before the above
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto bg-pink-100">
      {isInCall && (
        <MediaRoom
          chatId={conversationId}
          video={true}
          audio={true}
        />
      )}

      {!isInCall && (
        <div className="pt-24">
          {messages.map((message, i) => (
            <MessageBox
              isLast={i === messages.length - 1}
              key={message.id}
              data={message}
              prevMsgIsOwn={messages[i - 1]?.sender?.phoneNumber === message.sender?.phoneNumber}
            />
          ))}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default Body;