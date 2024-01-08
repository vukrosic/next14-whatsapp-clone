import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

const getUsers = async () => {
  const currentUserData = await currentUser();

  if (!currentUserData) return ([])



  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      NOT: {
        externalUserId: currentUserData.id
      }
    }
  });

  return users;


}

export default getUsers;