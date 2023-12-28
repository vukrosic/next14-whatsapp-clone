import { db } from "@/lib/db";
// import getSession from "./getSession";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const getCurrentUser = async () => {
  try {

    // const user = await currentUser();

    // if(!user) {
    //     return redirectToSignIn();
    // }

    // const profile = await db.user.findUnique({
    //     where: {
    //         id: user.id
    //     }
    // });

    // if 

    // const  currentUserPrisma = await prisma.user.findUnique({
    //   where: {
    //     email: user?.emailAddresses as string
    //   }
    // });

    // if (!currentUserPrisma) {
    //   return null;
    // }

    // return currentUserPrisma;
    return null
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;