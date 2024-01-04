import { getCurrentUser } from '@/app/actions/getCurrentUser';

import DesktopSidebarHeader from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import ConversationList from '@/app/conversations/_components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import getUsers from '@/app/actions/getUsers';
import { Input } from '@/components/ui/input';

async function MainPage({ children }: {
  children: React.ReactNode,
}) {
  const {
    currentUserPrisma,
    currentUserClerk
  } = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <div className="h-full w-screen flex">
      <aside className="h-full">
        <DesktopSidebarHeader currentUser={currentUserPrisma!} />
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
      </aside>
      <MobileFooter />
      <main className='w-full flex justify-center'>
        {children}
      </main>
    </div>
  )
}


export default MainPage;