import React from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { usePost } from '../hooks/usePost';
import { useAuth } from '../hooks/useAuth';

export function Feed() {
  const { user } = useAuth();
  const { posts, toggleLike, addPost } = usePost();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <CreatePost onPost={addPost} />
      {posts.map((post) => (
        <Post 
          key={post.id} 
          {...post} 
          onLike={() => toggleLike(post.id, user.id)} 
        />
      ))}
    </div>
  );
}