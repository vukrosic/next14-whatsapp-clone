'use client';

import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
// import SettingsModal from "./SettingsModal";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <div className="
      bg-[#f5f0f0]
        hidden 
        lg:left-0 
        lg:overflow-y-auto 
        lg:border-r-[2px]
        lg:flex
        justify-between
      ">
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
        <nav className="flex justify-between ml-20">
          <ul role="list" className="flex items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default DesktopSidebar;