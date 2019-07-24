import { prisma } from "./../../../../generated/prisma-client";
export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { username } = args;
      return prisma.user({ username });
      // const posts = await prisma.user({ username }).posts();
    }
  }
};
