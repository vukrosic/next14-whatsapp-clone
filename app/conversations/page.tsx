'use client';

import clsx from "clsx";

import useConversation from "../hooks/useConversation";
import EmptyState from "../_components/EmptyState";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className="h-full bg-gray-200">
      <EmptyState />
    </div>
  )
}

export default Home;