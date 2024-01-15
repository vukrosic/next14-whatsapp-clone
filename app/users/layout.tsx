import MainPage from "../_components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";

import UserList from "./_components/UserList";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const users = await getUsers();

  return (
    <MainPage>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </MainPage>
  );
}