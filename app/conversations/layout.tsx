import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import MainPage from "@/app/_components/sidebar/MainPage";
import ConversationList from "./_components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    <MainPage>
      <div className="h-full w-full flex justify-center bg-gray-200">
        {children}
      </div>
    </MainPage>
  );
}