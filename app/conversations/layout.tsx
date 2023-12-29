import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ConversationList from "./_components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}