import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      const posts = await prisma.posts({
        where: {
          OR: [{ location_contains: term }, { caption_starts_with: term }]
        }
      });
      return posts;
    }
  }
};
