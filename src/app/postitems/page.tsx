'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Preloader from '@/components/Preloader';
import './postitems.css';

export default function PostItemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Extract categories whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      const uniqueCategories = [...new Set(posts.map(post => post.category))];
      setCategories(uniqueCategories);
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/postitems');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts by category if a category is selected
  const filteredPosts = categoryFilter 
    ? posts.filter(post => post.category === categoryFilter) 
    : posts;

  // Display featured post (first post or a post marked as top)
  const featuredPost = posts.find(post => post.top) || (posts.length > 0 ? posts[0] : null);
  
  // All other posts (excluding the featured one)
  const otherPosts = featuredPost 
    ? filteredPosts.filter(post => post._id !== featuredPost._id) 
    : filteredPosts;

  // Function to clear category filter
  const clearFilter = () => {
    router.push('/postitems');
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <main id="main">
      {/* Page Header */}
      <section className="posts-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge-primary">Our Articles</span>
              <h1 className="page-title">Latest Posts</h1>
              <div className="intro-text">
                <p>Discover our collection of insightful articles, news, and stories across various topics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="filter-title">
              {categoryFilter ? (
                <h4>
                  Showing posts in <span className="highlight">{categoryFilter}</span>
                  <button onClick={clearFilter} className="btn btn-sm btn-outline-secondary ms-3">
                    <i className="bi bi-x-lg"></i> Clear filter
                  </button>
                </h4>
              ) : (
                <h4>All Posts</h4>
              )}
            </div>
            <div className="category-buttons">
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter by Category
                </button>
                <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link href={`/postitems?category=${category}`} className="dropdown-item">
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="posts-grid py-5">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-state">
                <i className="bi bi-journal-text fs-1 mb-3"></i>
                <h3>No Posts Found</h3>
                <p>There are currently no posts available.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && !categoryFilter && (
                <div className="featured-post mb-5">
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-7">
                      <div className="featured-image">
                        <Link href={`/postitems/${featuredPost._id}`}>
                          <img 
                            src={`/${featuredPost.img}`} 
                            alt={featuredPost.title} 
                            className="img-fluid"
                          />
                          {featuredPost.top && (
                            <span className="featured-badge">Featured</span>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="featured-content">
                        <div className="post-meta">
                          <span className="category">{featuredPost.category}</span>
                          <span className="date"><i className="bi bi-calendar3"></i> {formatDate(featuredPost.date)}</span>
                        </div>
                        <h2 className="featured-title">
                          <Link href={`/postitems/${featuredPost._id}`}>{featuredPost.title}</Link>
                        </h2>
                        <p className="featured-excerpt">{featuredPost.brief}</p>
                        <div className="author-info">
                          {featuredPost.avatar && (
                            <div className="author-image">
                              <img src={`/${featuredPost.avatar}`} alt={featuredPost.author || 'Author'} />
                            </div>
                          )}
                          <div className="author-name">
                            <p>{featuredPost.author || 'Digital News Team'}</p>
                          </div>
                        </div>
                        <Link href={`/postitems/${featuredPost._id}`} className="read-more">
                          Read Full Article <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Posts Grid */}
              <div className="row g-4">
                {otherPosts.map((post) => (
                  <div key={post._id} className="col-lg-4 col-md-6">
                    <div className="post-card h-100">
                      <div className="post-image">
                        <Link href={`/postitems/${post._id}`}>
                          <img 
                            src={`/${post.img}`} 
                            alt={post.title} 
                            className="img-fluid" 
                          />
                          {post.trending && (
                            <span className="trending-badge">Trending</span>
                          )}
                        </Link>
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="category">{post.category}</span>
                          <span className="date"><i className="bi bi-calendar3"></i> {formatDate(post.date)}</span>
                        </div>
                        <h3 className="post-title">
                          <Link href={`/postitems/${post._id}`}>{post.title}</Link>
                        </h3>
                        <p className="post-excerpt">{post.brief.substring(0, 120)}...</p>
                        <div className="post-footer">
                          <div className="author-info">
                            {post.avatar && (
                              <div className="author-image">
                                <img src={`/${post.avatar}`} alt={post.author || 'Author'} />
                              </div>
                            )}
                            <div className="author-name">
                              <p>{post.author || 'Digital News Team'}</p>
                            </div>
                          </div>
                          <Link href={`/postitems/${post._id}`} className="read-more-link">
                            <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="newsletter-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsletter-icon mb-3">
                  <i className="bi bi-envelope-paper"></i>
                </div>
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get the latest news and updates delivered straight to your inbox.</p>
              </div>
              <div className="col-lg-6">
                <form className="newsletter-form">
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Your Email Address" aria-label="Your Email Address" />
                    <button className="btn btn-primary" type="submit">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}