import Sidebar from "../_components/sidebar/MainPage";
import getUsers from "../actions/getUsers";

import UserList from "./_components/UserList";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}