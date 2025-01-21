/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from "react";
import News from "./Components/News"
import Blogs from "./Components/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(()=> {
    const savedBlogs = JSON.parse(localStorage.getItem(blogs)) || []
    setBlogs(savedBlogs)
  },[])

  const handlecreateBlog = (newBlog, isEditing ) => {
    setBlogs((prevBlogs)=> {
      const updatedBlogs = isEditing ? prevBlogs.map((blog) => (
        blog === selectedPost ? newBlog : blog
      )) :  [...prevBlogs, newBlog]
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      return updatedBlogs
    } )
    setIsEditing(false)
    setSelectedPost(null)
  }

  const handleEditBlog = (blog) => {
    setSelectedPost(blog)
    setIsEditing(true)
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs)=> {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false);
  };

  const handleBackToNews = () => {
    setShowNews(true)
    setIsEditing(false) 
    setSelectedPost(null)
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews ? (
          <News onShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog} />
        ) : (
          <Blogs onBack={handleBackToNews} onCreateBlog={handlecreateBlog} editPost={selectedPost}  isEditing={isEditing} />
        )}
      </div>
    </div>
  );
};

export default App;
