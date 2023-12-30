import { getCurrentUser } from '@/app/actions/getCurrentUser';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import ConversationList from '@/app/conversations/_components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import getUsers from '@/app/actions/getUsers';

async function Sidebar({ children }: {
  children: React.ReactNode,
}) {
  const {
    currentUserPrisma,
    currentUserClerk
  } = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <div className="h-full flex">
      <aside className="h-full">
        <DesktopSidebar currentUser={currentUserPrisma!} />
        <div>asdasdfsdfsdfdf</div>
        {/* <ConversationList 
            users={users} 
            title="Messages" 
            initialItems={conversations}
          /> */}
        </aside>
      <MobileFooter />
      <main className="h-full">
        {children}
      </main>
    </div>
  )
}


export default Sidebar;