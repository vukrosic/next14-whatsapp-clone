"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NewChatSheet from "./sidebar/sheets/NewChatSheet";
import { User } from "@prisma/client";

// get users from parent
interface EmptyStateProps {
  user: User
}

const EmptyState: React.FC<EmptyStateProps> = ({
  user
}) => {

  return (
    <div>
      <div
        className="
          flex
          flex-col
          w-full
          justify-center 
          items-center
        "
      >
        <img src="images/Communities.svg" className="w-1/2 mt-36" />
        <h2 className="text-3xl m-12 mt-4 mb-4 text-muted-foreground">WhatsApp Clone</h2>
        <Separator />
        <h3 className="text-foreground-muted text-xl font-semibold text-gray-900 mb-3">
          Select a chat or start a new conversation
        </h3>
        <NewChatSheet user={user} />
        {/* <Button className="m-8">New Chat</Button> */}
      </div>
    </div>
  );
}

export default EmptyState;