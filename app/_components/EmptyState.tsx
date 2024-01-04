import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const EmptyState = () => {
  return (
    <div>
      <div
        className="
          flex
          flex-col
          w-full
          justify-center 
          items-center
        "
      >
        <img src="images/Communities.svg" className="w-1/2 mt-36" />
        <h2 className="text-3xl m-12 mt-4 mb-4 text-muted-foreground">WhatsApp Clone</h2>
        <Separator />
        <h3 className="text-foreground-muted text-xl font-semibold text-gray-900">
          Select a chat or start a new conversation
        </h3>
        <Button className="m-8">New Chat</Button>
      </div>
    </div>
  );
}

export default EmptyState;