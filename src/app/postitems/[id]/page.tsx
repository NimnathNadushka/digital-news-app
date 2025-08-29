'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Preloader from '@/components/Preloader';
import '../postitems.css';
import './singlepost.css';

export default function SinglePostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string);
    }
  }, [params.id]);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/postitems/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/not-found');
          return;
        }
        throw new Error('Failed to fetch post');
      }
      
      const data = await response.json();
      setPost(data);
      
      // Fetch related posts from the same category
      fetchRelatedPosts(data.category, id);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchRelatedPosts = async (category: string, currentId: string) => {
    try {
      const response = await fetch('/api/postitems');
      if (response.ok) {
        const data = await response.json();
        // Filter posts by same category and exclude current post
        const related = data
          .filter((p: any) => p.category === category && p._id !== currentId)
          .slice(0, 3); // Limit to 3 related posts
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    } finally {
      setLoading(false);
    }
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

  if (!post) {
    return null; // Will redirect to not-found page
  }

  // Split brief into paragraphs for better readability
  const paragraphs = post.brief.split('\n\n').filter(Boolean);

  return (
    <main id="main">
      {/* Post Header */}
      <section className="single-post-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="post-meta">
                <Link href={`/postitems?category=${post.category}`} className="category">
                  {post.category}
                </Link>
                <span className="date"><i className="bi bi-calendar3"></i> {formatDate(post.date)}</span>
              </div>
              <h1 className="post-title">{post.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section - New layout with image left, content right */}
      <section className="article-content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="article-container">
                <div className="row g-4">
                  {/* Left column - Featured Image */}
                  <div className="col-lg-6">
                    <div className="featured-image">
                      <img src={`/${post.img}`} alt={post.title} className="img-fluid" />
                      {post.top && <span className="featured-badge">Featured</span>}
                      {post.trending && <span className="trending-badge">Trending</span>}
                    </div>
                  </div>
                  
                  {/* Right column - Article Content */}
                  <div className="col-lg-6">
                    <div className="article-content">
                      {/* Author Info */}
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
                      
                      {/* First paragraph of content */}
                      <div className="article-excerpt">
                        {paragraphs.length > 0 && <p>{paragraphs[0]}</p>}
                        
                        {paragraphs.length > 1 && (
                          <div className="continue-reading">
                            <span>Continue reading below...</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Share Buttons */}
                      <div className="share-section-compact">
                        <h4>Share This Article</h4>
                        <div className="social-share">
                          <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                          <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                          <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                          <a href="#" className="social-icon"><i className="bi bi-envelope"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Post Content - For remaining paragraphs */}
      {paragraphs.length > 1 && (
        <section className="post-content-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="post-content">
                  {/* Skip the first paragraph as it's already shown above */}
                  {paragraphs.slice(1).map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-posts-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <h2 className="section-title">Related Articles</h2>
                <div className="row g-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost._id} className="col-lg-4 col-md-6">
                      <div className="post-card h-100">
                        <div className="post-image">
                          <Link href={`/postitems/${relatedPost._id}`}>
                            <img 
                              src={`/${relatedPost.img}`} 
                              alt={relatedPost.title} 
                              className="img-fluid" 
                            />
                          </Link>
                        </div>
                        <div className="post-content">
                          <div className="post-meta">
                            <span className="category">{relatedPost.category}</span>
                            <span className="date"><i className="bi bi-calendar3"></i> {formatDate(relatedPost.date)}</span>
                          </div>
                          <h3 className="post-title">
                            <Link href={`/postitems/${relatedPost._id}`}>{relatedPost.title}</Link>
                          </h3>
                          <p className="post-excerpt">{relatedPost.brief.substring(0, 100)}...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Posts Button */}
      <section className="back-section py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <Link href="/postitems" className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i> Back to All Posts
              </Link>
            </div>
          </div>
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