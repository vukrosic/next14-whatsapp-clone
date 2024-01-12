import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import Header from "./_components/Header";
import Body from "./_components/Body";
import Form from "./_components/Form";
import EmptyState from "@/app/_components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const { currentUserPrisma } = await getCurrentUser();

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState user={currentUserPrisma} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex flex-col bg-red-500">
        <Header conversation={conversation} user={currentUserPrisma} />
        <Body initialMessages={messages} />
        {
          (conversation.isGroup
            && conversation.isChannel
            && conversation.ownerId !== currentUserPrisma.id)
            ? null : (<Form />)
        }
      </div>
    </div>
  );
}

export default ChatId;