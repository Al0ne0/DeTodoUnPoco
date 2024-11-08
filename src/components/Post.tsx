import React, { useState } from 'react';
import { Link2, MessageCircle, Heart, Share2, Trash2, Bookmark } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostProps {
  id: string;
  type: 'text' | 'image' | 'video' | 'link';
  content: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  timestamp: string;
  media?: string;
  url?: string;
  likes: string[];
  comments: Array<{
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    authorUsername: string;
    authorAvatar?: string;
    timestamp: string;
  }>;
  savedBy: string[];
  onLike: () => void;
}

export function Post(props: PostProps) {
  const { user } = useAuth();
  const { toggleLike, addComment, deletePost, toggleSave } = usePost();
  const [comment, setComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  if (!user || !props.authorName) return null;

  const isLiked = props.likes.includes(user.id);
  const isSaved = props.savedBy?.includes(user.id);
  const canDelete = user.isAdmin || props.authorId === user.id;

  const handleLike = () => {
    if (user) {
      toggleLike(props.id, user.id);
    }
  };

  const handleSave = () => {
    if (user) {
      toggleSave(props.id, user.id);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && comment.trim()) {
      addComment(props.id, {
        content: comment,
        authorId: user.id,
        authorName: user.name,
        authorUsername: user.username,
        authorAvatar: user.avatar,
      });
      setComment('');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Publicación de ${props.authorName}`,
        text: props.content,
        url: window.location.href
      });
    } catch (error) {
      console.log('Error compartiendo:', error);
    }
  };

  const handleDelete = () => {
    if (canDelete && user) {
      deletePost(props.id, user.id, user.isAdmin);
    }
  };

  const getInitial = (name: string) => {
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            {props.authorAvatar ? (
              <img 
                src={props.authorAvatar} 
                alt={props.authorName} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-bold">
                {getInitial(props.authorName)}
              </span>
            )}
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{props.authorName}</h3>
            <p className="text-gray-500 text-sm">@{props.authorUsername}</p>
            <p className="text-gray-500 text-xs">
              {format(new Date(props.timestamp), 'PPpp', { locale: es })}
            </p>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 p-2"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{props.content}</p>

      {props.type === 'image' && props.media && (
        <div className="rounded-lg overflow-hidden mb-4">
          <img src={props.media} alt="Contenido" className="w-full h-auto" />
        </div>
      )}

      {props.type === 'video' && props.media && (
        <div className="rounded-lg overflow-hidden mb-4">
          <video controls className="w-full">
            <source src={props.media} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      )}

      {props.type === 'link' && props.url && (
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-4"
        >
          Visitar Enlace <Link2 className="inline-block w-4 h-4 ml-2" />
        </a>
      )}

      <div className="flex items-center justify-between text-gray-500 pt-4 border-t">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? 'text-pink-500' : 'hover:text-pink-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{props.likes.length}</span>
        </button>
        <button
          onClick={() => setIsCommentOpen(!isCommentOpen)}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{props.comments.length}</span>
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 transition-colors ${
            isSaved ? 'text-purple-500' : 'hover:text-purple-500'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 hover:text-green-500 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Compartir</span>
        </button>
      </div>

      {isCommentOpen && (
        <div className="mt-4 pt-4 border-t">
          <form onSubmit={handleComment} className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={2}
            />
            <button 
              type="submit"
              disabled={!comment.trim()}
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              Comentar
            </button>
          </form>

          <div className="space-y-4">
            {props.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  {comment.authorAvatar ? (
                    <img 
                      src={comment.authorAvatar} 
                      alt={comment.authorName} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {getInitial(comment.authorName)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.authorName}</span>
                      <span className="text-gray-500 text-sm">
                        @{comment.authorUsername}
                      </span>
                    </div>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    {format(new Date(comment.timestamp), 'PPpp', { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}