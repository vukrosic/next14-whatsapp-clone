'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  user: User;
}

const UserList: React.FC<UserListProps> = ({
  user,
}) => {
  return (
    <aside
      className="
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
        </div>

        {/* no error here, just prisma doesn't recognize relation as a field */}
        {user.following.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}

export default UserList;