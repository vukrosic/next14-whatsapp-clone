import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useClerk } from '@clerk/clerk-react';
import { useRouter } from "next/navigation";
import useConversation from "./useConversation";
import ChatIcon from '/public/images/omg.svg';
import StatusSheet from "@/app/_components/sidebar/sheets/StatusSheet";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const { signOut } = useClerk();
  const router = useRouter();


  const routes = useMemo(() => [
    {
      label: 'Comomunities',
      icon: '/images/Communities.svg',
      active: pathname === '/conversations' || !!conversationId,
      button: <StatusSheet />
    },
    {
      label: 'Status',
      icon: '/images/Status.svg',
      active: pathname === '/users'
    },
    {
      label: 'Channels',
      icon: '/images/Channels.svg',
    },
    {
      label: 'New chat',
      icon: '/images/New chat.svg',
    },
    {
      label: 'Menu',
      icon: '/images/Menu.svg',
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;