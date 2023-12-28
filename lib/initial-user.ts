import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialUser = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.user.findUnique({
    where: {
      id: user.id
    }
  });

  if (profile) {
    return profile;
  }

  const newUser = await db.user.create({
    data: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newUser;
};