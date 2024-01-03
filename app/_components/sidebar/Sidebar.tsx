import { getCurrentUser } from '@/app/actions/getCurrentUser';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import ConversationList from '@/app/conversations/_components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import getUsers from '@/app/actions/getUsers';
import { Input } from '@/components/ui/input';

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
        <div>
          <div className="space-y-2 flex">
            <div className="flex bg-gray-200 w-11/12 m-auto rounded-xl mt-2">
              <img src="images/Search.svg" className="ml-3" />
              <Input placeholder="Search or start a new chat" className="w-11/12 bg-transparent border-0" />
            </div>
            <img src="images/Filter.svg" className="ml-auto mr-2" />
            <div>

            </div>

          </div>
        </div>
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
      </aside>
      <MobileFooter />
      <main className="h-full">
        {children}
      </main>
    </div>
  )
}


export default Sidebar;