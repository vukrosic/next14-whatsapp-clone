import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ConversationList from "./_components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}