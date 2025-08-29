'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './createpost.css';

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [posts, setPosts] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brief: '',
    author: '',
    avatar: '',
    top: false,
    trending: false,
    img: ''
  });

  // Fetch all posts for the management section
  useEffect(() => {
    fetchPosts();
  }, []);

  // If we're editing, fetch the post data
  useEffect(() => {
    if (editId) {
      setIsEdit(true);
      fetchPostForEdit(editId);
    } else {
      setIsEdit(false);
      resetForm();
    }
  }, [editId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/postitems');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPostForEdit = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/postitems/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title || '',
          category: data.category || '',
          brief: data.brief || '',
          author: data.author || '',
          avatar: data.avatar || '',
          top: data.top || false,
          trending: data.trending || false,
          img: data.img || ''
        });
        
        // If there's an image, set the preview
        if (data.img) {
          setPreviewImage(`/${data.img}`);
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch post for editing' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error fetching post for edit' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      brief: '',
      author: '',
      avatar: '',
      top: false,
      trending: false,
      img: ''
    });
    setPreviewImage('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Prepare form data with current values
      const postData = { ...formData };
      
      // Validate required fields
      if (!postData.title || !postData.category) {
        setMessage({ type: 'error', text: 'Title and category are required fields' });
        setLoading(false);
        return;
      }
      
      // Handle image requirement
      if (!imageFile && !formData.img && !isEdit) {
        setMessage({ type: 'error', text: 'Please select an image' });
        setLoading(false);
        return;
      }
      
      // In a real app, you would upload the image to a server or cloud storage
      // For this demo, we'll assign a path to an existing image from the assets
      if (imageFile) {
        // Use a consistent pattern for image paths that matches your database expectations
        const randomImgNum = Math.floor(Math.random() * 8) + 1;
        postData.img = `assets/img/post-landscape-${randomImgNum}.jpg`;
      }
      
      // Ensure avatar has a default value if not provided
      if (!postData.avatar && postData.author) {
        postData.avatar = 'assets/img/person-1.jpg';
      }
      
      console.log('Submitting post data:', postData); // Debug log
      
      let response;
      
      if (isEdit) {
        // Update existing post
        response = await fetch(`/api/postitems/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post
        response = await fetch('/api/postitems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
      }
      
      // Get detailed error message if available
      const responseData = await response.json();
      
      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: isEdit ? 'Post updated successfully!' : 'Post created successfully!' 
        });
        fetchPosts(); // Refresh the posts list
        
        if (!isEdit) {
          resetForm(); // Only reset the form for new posts, not when editing
        }
      } else {
        // Show detailed error from API
        setMessage({ 
          type: 'error', 
          text: responseData.message || 'Failed to save post. Please try again.' 
        });
        console.error('API Error:', responseData);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setMessage({ type: 'error', text: 'An error occurred while saving the post' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/postitems/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setMessage({ type: 'success', text: 'Post deleted successfully!' });
          fetchPosts(); // Refresh the posts list
          
          // If we were editing the post that was deleted, reset the form
          if (editId === id) {
            resetForm();
            router.push('/createpostitems'); // Remove the edit parameter
          }
        } else {
          const errorData = await response.json();
          setMessage({ type: 'error', text: errorData.message || 'Failed to delete post' });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage({ type: 'error', text: 'An error occurred while deleting the post' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main id="main">
      {/* Page Header */}
      <section className="create-post-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge-primary">{isEdit ? 'Edit Post' : 'Create New Post'}</span>
              <h1 className="page-title">{isEdit ? 'Edit Post' : 'Create Post'}</h1>
              <div className="intro-text">
                <p>{isEdit 
                  ? 'Update your post with new information and content.' 
                  : 'Share a new story with our readers by creating a post below.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="create-post-section py-5">
        <div className="container">
          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
              {message.text}
            </div>
          )}
          
          <div className="row">
            <div className="col-lg-8">
              <div className="post-form-container">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="title">Post Title <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="title" 
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter post title" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="category">Category <span className="required">*</span></label>
                        <select 
                          className="form-select" 
                          id="category" 
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Technology">Technology</option>
                          <option value="Politics">Politics</option>
                          <option value="Business">Business</option>
                          <option value="Culture">Culture</option>
                          <option value="Sport">Sport</option>
                          <option value="Travel">Travel</option>
                          <option value="Health">Health</option>
                          <option value="Entertainment">Entertainment</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="author">Author Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="author" 
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                          placeholder="Enter author name" 
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="avatar">Author Avatar URL</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="avatar" 
                          name="avatar"
                          value={formData.avatar}
                          onChange={handleChange}
                          placeholder="Enter author avatar URL" 
                        />
                        <small className="form-text text-muted">
                          Example: assets/img/person-1.jpg
                        </small>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="brief">Post Content <span className="required">*</span></label>
                        <textarea 
                          className="form-control" 
                          id="brief" 
                          name="brief"
                          value={formData.brief}
                          onChange={handleChange}
                          rows={6} 
                          placeholder="Write your post content here..." 
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="image">Featured Image <span className="required">*</span></label>
                        <div className="image-upload-container">
                          <input 
                            type="file" 
                            className="form-control" 
                            id="image" 
                            onChange={handleImageChange}
                            accept="image/*" 
                          />
                          
                          {previewImage && (
                            <div className="image-preview mt-3">
                              <img src={previewImage} alt="Preview" className="img-fluid" />
                            </div>
                          )}
                          
                          {isEdit && !imageFile && (
                            <small className="form-text text-muted">
                              Leave empty to keep the current image.
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="top" 
                          name="top"
                          checked={formData.top}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="top">
                          Featured Post (appears at the top)
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="trending" 
                          name="trending"
                          checked={formData.trending}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="trending">
                          Trending Post
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="form-buttons">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
                        </button>
                        
                        {isEdit && (
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary ms-2"
                            onClick={() => router.push('/createpostitems')}
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="post-management-sidebar">
                <h3>Manage Posts</h3>
                <p>View, edit or delete your existing posts.</p>
                
                <div className="post-list">
                  {posts.length > 0 ? (
                    posts.map((post: any) => (
                      <div key={post._id} className="post-item">
                        <div className="post-item-image">
                          <img src={`/${post.img}`} alt={post.title} className="img-fluid" />
                        </div>
                        <div className="post-item-content">
                          <h4>{post.title}</h4>
                          <p className="post-meta">
                            <span className="category">{post.category}</span> • 
                            <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                          </p>
                          <div className="post-actions">
                            <Link 
                              href={`/createpostitems?edit=${post._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </Link>
                            <button 
                              onClick={() => handleDelete(post._id)}
                              className="btn btn-sm btn-danger ms-2"
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No posts found. Create your first post!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}