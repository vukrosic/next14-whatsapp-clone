'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";
import { useState, useEffect } from "react";

interface UserListProps {
  contacts: User[];
  handleRemoveContact: (newContacts: User[]) => void;
}

const UserList: React.FC<UserListProps> = ({
  contacts,
  handleRemoveContact
}) => {




  // const handleUserListAfterRemovingUser = (newContacts: User[]) => {
  //   setContacts(newContacts);
  // };
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
        {contacts.length > 0 ? (
          contacts.map((item) => (
            <UserBox
              key={item.id}
              data={item}
              handleRemoveContact={handleRemoveContact}
            />
          ))
        ) : (
          <p>No contacts available.</p>
          // Alternatively, you can render a different component here
        )}
      </div>
    </aside>
  );
}

export default UserList;