import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const CommunitiesDrawer = () => {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div>
                    <div className="bg-[#008069] pt-16">
                        <DrawerHeader>
                            <div className="flex">
                                <DrawerClose asChild>
                                    <img src="images/ArrowLeft.svg" className="mr-7" />
                                </DrawerClose>
                                <DrawerTitle className="text-white flex items-center justify-center ">Status</DrawerTitle>
                                <div className="flex ml-auto">
                                    <img src="images/Plus.svg" className="p-2" />
                                    <img src="images/MenuWhite.svg" className="p-2" />
                                </div>
                            </div>
                        </DrawerHeader>
                    </div>
                    <Button variant="outline" className="mt-6">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">My Status</h4>
                            <p className="text-sm text-muted-foreground">
                                Add to my status
                            </p>
                        </div>
                    </Button>
                    <DrawerFooter>
                        <div className="flex">
                            <img src="images/Padlock.svg" className="ml-20" />
                            <p>Your status updates are <span className="text-blue-500">end-to-end encrypted</span></p>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CommunitiesDrawer;