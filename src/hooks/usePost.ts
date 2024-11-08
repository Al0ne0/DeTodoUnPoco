import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
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
  comments: Comment[];
  hashtags: string[];
  savedBy: string[];
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  timestamp: string;
}

interface PostState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'hashtags' | 'savedBy'>) => void;
  deletePost: (postId: string, userId: string, isAdmin: boolean) => boolean;
  toggleLike: (postId: string, userId: string) => void;
  toggleSave: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  getHashtagCounts: () => { [key: string]: number };
  getSavedPosts: (userId: string) => Post[];
  searchPosts: (query: string) => Post[];
}

export const usePost = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (newPost) => {
        const hashtags = newPost.content.match(/#[a-zA-Z0-9_]+/g) || [];
        
        set((state) => ({
          posts: [
            {
              ...newPost,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              likes: [],
              comments: [],
              hashtags,
              savedBy: [],
            },
            ...state.posts,
          ],
        }));
      },
      deletePost: (postId, userId, isAdmin) =>
        set((state) => {
          const post = state.posts.find((p) => p.id === postId);
          if (!post) return state;
          if (post.authorId !== userId && !isAdmin) return state;
          return {
            posts: state.posts.filter((p) => p.id !== postId),
          };
        }),
      toggleLike: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const likes = post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId];
              return { ...post, likes };
            }
            return post;
          }),
        })),
      toggleSave: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const savedBy = post.savedBy?.includes(userId)
                ? post.savedBy.filter((id) => id !== userId)
                : [...(post.savedBy || []), userId];
              return { ...post, savedBy };
            }
            return post;
          }),
        })),
      addComment: (postId, comment) =>
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    ...comment,
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                  },
                ],
              };
            }
            return post;
          }),
        })),
      getHashtagCounts: () => {
        const posts = get().posts;
        const hashtagCounts: { [key: string]: number } = {};
        
        posts.forEach(post => {
          post.hashtags.forEach(tag => {
            hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
          });
        });
        
        return hashtagCounts;
      },
      getSavedPosts: (userId) => {
        if (!userId) return [];
        return get().posts.filter(post => post.savedBy?.includes(userId));
      },
      searchPosts: (query) => {
        const posts = get().posts;
        const searchTerm = query.toLowerCase();
        
        return posts.filter(post => 
          post.content.toLowerCase().includes(searchTerm) ||
          post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          post.authorName.toLowerCase().includes(searchTerm) ||
          post.authorUsername.toLowerCase().includes(searchTerm)
        );
      },
    }),
    {
      name: 'posts-storage',
    }
  )
);