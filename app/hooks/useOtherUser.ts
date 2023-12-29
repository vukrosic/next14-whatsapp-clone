import { getCurrentUser } from "../actions/getCurrentUser";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useSession } from "@clerk/nextjs";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession().session;

  const otherUser = useMemo(() => {
    const currentUserPhone = session?.user.primaryPhoneNumber?.phoneNumber

    const otherUser = conversation.users.filter((user) => user.phoneNumber !== currentUserPhone);

    return otherUser[0];
  }, [session?.user.primaryPhoneNumber?.phoneNumber, conversation.users]);

  return otherUser;
};

export default useOtherUser;