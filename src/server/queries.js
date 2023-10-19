import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  return context.entities.Post.findMany();
}

export const getPost = async ({ postId }, context) => {
  const post = await context.entities.Post.findUnique({
    where: { id: postId },
    include: { comments: true }
  });

  if (!post) throw new HttpError(404, `No post with id ${postId}`);

  return post;
}
