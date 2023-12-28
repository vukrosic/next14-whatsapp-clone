import { Image } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
    return ( 
        <div>
            <UserButton afterSignOutUrl="/" />
            <Image path="public/logo.png" />
        </div>

     );
}
 
export default Page;