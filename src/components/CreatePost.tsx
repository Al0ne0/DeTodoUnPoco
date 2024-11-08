import React, { useState } from 'react';
import { Image as ImageIcon, Video, Link2, Send } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { Post } from '../hooks/usePost';

interface CreatePostProps {
  onPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'hashtags' | 'savedBy'>) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<Post['type']>('text');
  const [media, setMedia] = useState('');
  const [url, setUrl] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    onPost({
      type,
      content,
      authorId: user.id,
      authorName: user.name,
      authorUsername: user.username,
      authorAvatar: user.avatar,
      ...(type === 'image' && { media }),
      ...(type === 'video' && { media }),
      ...(type === 'link' && { url })
    });

    setContent('');
    setType('text');
    setMedia('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6">
      <textarea
        className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        placeholder="¿Qué quieres compartir hoy?"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      
      {type === 'image' && (
        <input
          type="url"
          placeholder="URL de la imagen"
          className="w-full mt-2 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
      )}

      {type === 'video' && (
        <input
          type="url"
          placeholder="URL del video"
          className="w-full mt-2 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
      )}

      {type === 'link' && (
        <input
          type="url"
          placeholder="URL del enlace"
          className="w-full mt-2 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('image')}
            className={`flex items-center gap-2 transition-colors ${
              type === 'image' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Imagen</span>
          </button>
          <button
            type="button"
            onClick={() => setType('video')}
            className={`flex items-center gap-2 transition-colors ${
              type === 'video' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Video</span>
          </button>
          <button
            type="button"
            onClick={() => setType('link')}
            className={`flex items-center gap-2 transition-colors ${
              type === 'link' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <Link2 className="w-5 h-5" />
            <span>Enlace</span>
          </button>
        </div>
        
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          disabled={!content.trim()}
        >
          <Send className="w-4 h-4" />
          Publicar
        </button>
      </div>
    </form>
  );
}