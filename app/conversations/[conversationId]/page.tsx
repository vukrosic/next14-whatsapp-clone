import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import EmptyState from "@/app/_components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Conversation from "./_components/Conversation";

interface IParams {
  conversationId: string;
  searchParams: {
    video?: boolean;
  }
}

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
    <Conversation
      conversation={conversation}
      currentUserPrisma={currentUserPrisma}
      messages={messages}
    />
  );
}

export default ChatId;