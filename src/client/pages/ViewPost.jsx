import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import createComment from '@wasp/actions/createComment';

export function ViewPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const createCommentFn = useAction(createComment);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ content: newComment, postId });
    setNewComment('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
      <p className='mb-4'>Author: {post.user.username}</p>
      <p className='mb-4'>{post.content}</p>

      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      {post.comments.map((comment) => (
        <div key={comment.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <p>{comment.content}</p>
          <p className='text-sm text-gray-500'>By: {comment.user.username}</p>
        </div>
      ))}

      <h2 className='text-xl font-bold mb-4'>Add Comment</h2>
      <div className='flex gap-x-4 mb-4'>
        <input
          type='text'
          placeholder='New Comment'
          className='px-1 py-2 border rounded text-lg'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleCreateComment}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}