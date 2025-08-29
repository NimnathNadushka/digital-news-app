'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostItemOne from '../components/PostItemOne';
import Preloader from '../components/Preloader';
import './posts.css';

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getItemsData = () => {
    fetch('/api/postitems')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching post items:', error))
      .finally(() => checkLoadingComplete());
  };

  const getSinglePostData = (id: string) => {
    fetch(`/api/postitems/${id}`)
      .then(res => {
        if(res.status === 404){
          router.push('/not-found');
        }
        return res.json();
      })
      .then(data => {
        setItem(data);
      })
      .catch(error => console.error('Error fetching single post item:', error))
      .finally(() => checkLoadingComplete());
  };

  // Check if both API calls are complete
  const checkLoadingComplete = () => {
    // Small delay to ensure both API calls have finished
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  useEffect(() => {
    setLoading(true);
    getItemsData();
    getSinglePostData('68af2dd4b031f55cef6b6033');
  }, []);

  // Show preloader while loading
  if (loading) {
    return <Preloader />;
  }

  return (
    <section id='posts' className='posts'>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          {/* Featured Post - Large */}
          <div className='col-lg-4'>
            {item && <PostItemOne large={true} item={item} />}
          </div>
          
          {/* Middle section with two columns */}
          <div className='col-lg-5'>
            <div className='row g-5'>
              {/* First column with 3 posts */}
              <div className='col-lg-6 border-start custom-border'>
                {items && 
                  items.length > 3 && 
                  items.slice(3, 6).map((postItem: {
                    _id: string;
                    img: string;
                    category: string;
                    date: string;
                    title: string;
                    brief: string;
                    avatar: string;
                    author: string;
                  }) => <PostItemOne key={postItem._id} large={false} item={postItem} />
                )}
              </div>
              
              {/* Second column with 3 posts */}
              <div className='col-lg-6'>
                {items && 
                  items.length > 6 && 
                  items.slice(6, 9).map((postItem: {
                    _id: string;
                    img: string;
                    category: string;
                    date: string;
                    title: string;
                    brief: string;
                    avatar: string;
                    author: string;
                  }) => <PostItemOne key={postItem._id} large={false} item={postItem} />
                )}
              </div>
            </div>
          </div>

          {/* Trending News Section */}
          <div className='col-lg-3'>
            <div className='trending-section'>
              <h3 className='trending-title'>Trending</h3>
              <div className='trending-posts'>
                {items && 
                  items.length > 9 && 
                  items.slice(9, 15).map((postItem: {
                    _id: string;
                    img: string;
                    category: string;
                    date: string;
                    title: string;
                    brief: string;
                    avatar: string;
                    author: string;
                  }, index) => (
                    <div key={postItem._id} className='trending-item'>
                      <span className='trending-number'>{index + 1}</span>
                      <div className='trending-content'>
                        <div className='trending-meta'>
                          <span className='trending-category'>{postItem.category}</span>
                          <span className='trending-date'>
                            {new Date(postItem.date).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        <h4 className='trending-post-title'>
                          <a href={`/postitems/${postItem._id}`}>{postItem.title}</a>
                        </h4>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
