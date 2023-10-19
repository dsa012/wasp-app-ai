import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPost from '@wasp/actions/createPost';

export function NewPost() {
  const createPostFn = useAction(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    createPostFn({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>New Post</h1>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded mb-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Content'
        className='px-1 py-2 border rounded mb-2'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        onClick={handleCreatePost}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Post
      </button>
      <Link to='/' className='block mt-4 text-blue-500'>Go back to Home</Link>
    </div>
  );
}