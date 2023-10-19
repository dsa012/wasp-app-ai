import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';
import createComment from '@wasp/actions/createComment';

export function Home() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = (postId) => {
    createCommentFn({ postId, content: newCommentContent });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{post.title}</div>
          <div>{post.user.username}</div>
          <div>
            <Link
              to={`/post/${post.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              View
            </Link>
          </div>
        </div>
      ))}
      <div className='mt-4'>
        <h2 className='text-xl font-bold'>Create Comment</h2>
        <div className='flex gap-x-4 py-2'>
          <input
            type='text'
            placeholder='Comment'
            className='px-1 py-2 border rounded text-lg'
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <button
            onClick={() => handleCreateComment(post.id)}
            className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}