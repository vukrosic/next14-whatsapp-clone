import { getCurrentUser } from '@/app/actions/getCurrentUser';

import DesktopSidebarHeader from './DesktopSidebarHeader';
import ConversationList from '@/app/conversations/_components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import getContacts from '@/app/actions/getContacts';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';


async function MainPage({ children }: {
  children: React.ReactNode,
}) {
  const {
    currentUserPrisma
  } = await getCurrentUser();
  const conversations = await getConversations();
  const contacts = await getContacts();

  return (
    <div className="h-full w-screen flex">
      <aside className="h-full w-[600px] min-w-[300px]">
        <DesktopSidebarHeader
          currentUser={currentUserPrisma!}
          conversations={conversations}
          users={contacts}
        />
        <ConversationList
          conversations={conversations}
        />
      </aside>
      <main className='w-full flex justify-center'>
        {children}
      </main>
    </div>
  )
}


export default MainPage;