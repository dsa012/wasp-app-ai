import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import editPost from '@wasp/actions/editPost';
import createComment from '@wasp/actions/createComment';

export function EditPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const editPostFn = useAction(editPost);
  const createCommentFn = useAction(createComment);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditPost = () => {
    editPostFn({ postId, title, content });
  };

  const handleCreateComment = () => {
    createCommentFn({ postId, content: newComment });
    setNewComment('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Edit Post</h1>
      <form className='mb-4'>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-lg font-bold mb-2'>Title</label>
          <input
            type='text'
            id='title'
            className='w-full border rounded py-2 px-3'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='content' className='block text-lg font-bold mb-2'>Content</label>
          <textarea
            id='content'
            className='w-full border rounded py-2 px-3'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type='button'
          onClick={handleEditPost}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Save
        </button>
      </form>
      <h2 className='text-2xl font-bold mb-4'>Comments</h2>
      {post.comments.map((comment) => (
        <div key={comment.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{comment.content}</div>
          <div>{comment.user.username}</div>
        </div>
      ))}
      <form className='mb-4'>
        <div className='mb-4'>
          <label htmlFor='newComment' className='block text-lg font-bold mb-2'>New Comment</label>
          <textarea
            id='newComment'
            className='w-full border rounded py-2 px-3'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <button
          type='button'
          onClick={handleCreateComment}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}