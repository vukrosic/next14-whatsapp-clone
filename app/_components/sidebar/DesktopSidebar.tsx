'use client';

import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
// import SettingsModal from "./SettingsModal";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import CommunitiesDrawer from "./sheets/CommunitiesSheet";
import StatusDrawer from "./sheets/StatusSheet";
import CommunitiesSheet from "./sheets/CommunitiesSheet";
import StatusSheet from "./sheets/StatusSheet";
import ChannelsSheet from "./sheets/ChannelsSheet";
import NewChatSheet from "./sheets/NewChatSheet";
import ProfileSheet from "./sheets/ProfileSheet";
import NewChannelSheet from "./sheets/NewChannelSheet";
import FindChannelsSheet from "./sheets/FindChannelsSheet";
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
import SearchBar from "./SearchBar";


interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <div className="
      bg-[#f5f0f0]
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
            <ProfileSheet currentUser={currentUser} />
          </div>
        </nav>
        <nav className="flex justify-between ml-20 space-x-5 items-center">
          <CommunitiesSheet />
          <StatusSheet />
          <ChannelsSheet />
          <NewChatSheet />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src="/images/Menu.svg"
                alt="Menu"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem className="p-3">New group</DropdownMenuItem>
              <DropdownMenuItem className="p-3">New community</DropdownMenuItem>
              <DropdownMenuItem className="p-3">Starred messages</DropdownMenuItem>
              <DropdownMenuItem className="p-3">Select chats</DropdownMenuItem>
              <DropdownMenuItem className="p-3">Settings</DropdownMenuItem>
              <DropdownMenuItem className="p-3">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </>
  );
}

export default DesktopSidebar;