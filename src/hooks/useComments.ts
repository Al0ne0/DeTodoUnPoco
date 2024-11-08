import { create } from 'zustand';

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsState {
  comments: Record<string, Comment[]>;
  addComment: (postId: string, content: string, author: Comment['author']) => void;
  addReply: (commentId: string, content: string, author: Comment['author']) => void;
  toggleLike: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
}

export const useComments = create<CommentsState>((set) => ({
  comments: {
    '1': [
      {
        id: 'c1',
        postId: '1',
        content: '¡Qué hermoso lugar! 😍',
        author: {
          name: 'Ana Developer',
          username: '@ana_dev',
        },
        likes: 5,
        isLiked: false,
        timestamp: 'Hace 1 hora',
      },
    ],
  },
  addComment: (postId, content, author) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [
          {
            id: Date.now().toString(),
            postId,
            content,
            author,
            likes: 0,
            isLiked: false,
            timestamp: 'Ahora',
          },
          ...(state.comments[postId] || []),
        ],
      },
    })),
  addReply: (commentId, content, author) =>
    set((state) => {
      const newComments = { ...state.comments };
      Object.keys(newComments).forEach((postId) => {
        newComments[postId] = newComments[postId].map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Date.now().toString(),
                  postId: comment.postId,
                  content,
                  author,
                  likes: 0,
                  isLiked: false,
                  timestamp: 'Ahora',
                },
              ],
            };
          }
          return comment;
        });
      });
      return { comments: newComments };
    }),
  toggleLike: (commentId) =>
    set((state) => {
      const newComments = { ...state.comments };
      Object.keys(newComments).forEach((postId) => {
        newComments[postId] = newComments[postId].map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            };
          }
          return comment;
        });
      });
      return { comments: newComments };
    }),
  deleteComment: (commentId) =>
    set((state) => {
      const newComments = { ...state.comments };
      Object.keys(newComments).forEach((postId) => {
        newComments[postId] = newComments[postId].filter(
          (comment) => comment.id !== commentId
        );
      });
      return { comments: newComments };
    }),
}));