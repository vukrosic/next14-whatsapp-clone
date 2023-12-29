import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const { currentUserPrisma, currentUserClerk } = await getCurrentUser();

    if (!currentUserPrisma.phoneNumber) {
      return null;
    }
  
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;
