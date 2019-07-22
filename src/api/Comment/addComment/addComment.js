export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, text } = args;
      const { user } = request;
      return prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: post.id
          }
        },
        text
      });
    }
  }
};
