import HttpError from '@wasp/core/HttpError.js'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const editPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: args.postId }
  });
  if (post.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Post.update({
    where: { id: args.postId },
    data: { title: args.title, content: args.content }
  });
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const comment = await context.entities.Comment.create({
    data: {
      content: args.content,
      userId: context.user.id,
      postId: args.postId
    }
  });

  return comment;
}