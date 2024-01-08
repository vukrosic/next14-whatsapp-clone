import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import AvatarCustom from "@/app/_components/Avatar";
import LoadingModal from "@/app/_components/modals/LoadingModal";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserBoxProps {
  data: User,
  handleRemoveContact: (newContacts: User[]) => void;
}

const UserBox: React.FC<UserBoxProps> = ({
  data,
  handleRemoveContact
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  const handleRemoveClick = () => {
    setIsLoading(true);
    console.log("removing contact: ")
    axios.post('/api/contacts', { phoneNumber: data.phoneNumber, action: 'remove' })
      .then((response) => {
        const newContacts = response.data; // Assuming your new contacts are in the response data
        handleRemoveContact(newContacts);
      })
      .catch((error) => {
        console.error("Error removing contact:", error);
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <Separator className="mb-2" />
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <button className="flex w-full items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/ProfilePlaceholder.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="ml-4 text-left space-y-1 relative">
            <h4 className="text-[1rem] absolute bottom-0">{data.username}</h4>
            <h4 className="text-[0.75rem] absolute top-0">{data.about} </h4>
          </div>

          <Button onClick={handleRemoveClick} className=" w-full justify-end bg-inherit hover:bg-inherit">
            <div className="group">
              <Trash2 className="invisible group-hover:visible text-red-700 w-5 h-5 m-2 mx-4" />
            </div>
          </Button>
        </button>
        {/* <AvatarCustom user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.username}
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default UserBox;