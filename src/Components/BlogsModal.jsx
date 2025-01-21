/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import demoImg from '../assets/demo.jpg';
import './BlogsModal.css';

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show || !blog) {
    return null; // If modal is not to be shown or there's no blog, return null
  }

  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {blog.image ? (
          <img src={blog.image} alt={blog.title} className='blogs-modal-image' />
        ) : (
          <img src={demoImg} alt="Default Image" className='blogs-modal-image' />
        )}

        <h2 className="blogs-modal-title">
          {blog.title}
        </h2>
        <p className="blog-post-content">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogsModal;
