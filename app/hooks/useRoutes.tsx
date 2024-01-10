import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useClerk } from '@clerk/clerk-react';
import { useRouter } from "next/navigation";
import useConversation from "./useConversation";
import ChatIcon from '/public/images/omg.svg';
import CommunitiesSheet from "@/app/_components/sidebar/sheets/CommunitiesSheet";
import StatusSheet from "@/app/_components/sidebar/sheets/status/StatusSheet";
import ChannelsSheet from "@/app/_components/sidebar/sheets/ChannelsSheet";
import NewChatSheet from "@/app/_components/sidebar/sheets/NewChatSheet";


const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const { signOut } = useClerk();
  const router = useRouter();


  const routes = useMemo(() => [
    {
      button: <CommunitiesSheet />
    },
    {
      button: <StatusSheet />
    },
    {
      button: <ChannelsSheet />
    },
    {
      button: <NewChatSheet />
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;