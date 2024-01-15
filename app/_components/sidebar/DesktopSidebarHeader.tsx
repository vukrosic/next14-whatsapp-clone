'use client';

import DesktopItem from "./DesktopItem";
import { useState } from "react";
import { Conversation, User } from "@prisma/client";
import StatusDrawer from "./sheets/status/StatusSheet";
import StatusSheet from "./sheets/status/StatusSheet";
import ChannelsSheet from "./sheets/channel/ChannelsSheet";
import NewChatSheet from "./sheets/NewChatSheet";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import NewChannelSheet from "./sheets/channel/NewChannelSheet";
import { UserButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ConversationList from "@/app/conversations/_components/ConversationList";
import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
import { useSession, auth, useClerk, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


interface DesktopSidebarHeaderProps {
  currentUser: User & {
    following: User[]
  },
  conversations: Conversation[],
  users: User[]
}

const DesktopSidebarHeader: React.FC<DesktopSidebarHeaderProps> = ({
  currentUser,
  conversations,
  users
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter()
  return (
    <>
      {/* <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <div className="
      bg-[#f7f7f7]
        left-0 
        overflow-y-auto 
        border-r-[2px]
        flex
        justify-between
        items-center
      ">
        <nav>
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center cursor-pointer hover:opacity-75 transition mt-2 ml-2"
          >
            <UserButton />
          </div>
        </nav>
        <nav className="flex justify-between space-x-5 mr-4 items-center">
          <StatusSheet
            user={currentUser}
          />
          <ChannelsSheet currentUserPrisma={currentUser} />
          <NewChatSheet currentUser={currentUser} />

          <LogOut
            className="text-[#54656f] cursor-pointer"
            onClick={() => signOut(() => router.push("/"))}
          />
        </nav>
      </div>
    </>
  );
}

export default DesktopSidebarHeader;