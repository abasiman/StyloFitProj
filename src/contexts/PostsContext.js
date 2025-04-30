import React, { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const likePost = (index) => {
    setPosts((prev) => {
      const updated = [...prev];
      updated[index].likes = (updated[index].likes || 0) + 1;
      return updated;
    });
  };
  const unlikePost = (index) => {
    setPosts((prev) => {
      const updated = [...prev];
      updated[index].likes = Math.max((updated[index].likes || 1) - 1, 0);
      return updated;
    });
  };
  

  return (
    <PostsContext.Provider value={{ posts, addPost, likePost , unlikePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
