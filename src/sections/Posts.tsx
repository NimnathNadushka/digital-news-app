'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PostItemOne from '@/components/PostItemOne';
import { PostItem } from '@/models/PostItems';
import './posts.css';

export default function Posts() {
  const [items, setItems] = useState<PostItem[]>([]);
  const [item, setItem] = useState<PostItem | null>(null);

  const getItemsData = useCallback(async () => {
    try {
      const response = await fetch('/api/postitems');
      if (response.ok) {
        const data = await response.json();
        setItems(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  const getSinglePostData = useCallback(async () => {
    try {
      const response = await fetch('/api/postitems');
      if (response.ok) {
        const data = await response.json();
        const featuredPost = data.find((post: PostItem) => post.trending) || data[0];
        setItem(featuredPost);
      }
    } catch (error) {
      console.error('Error fetching featured post:', error);
    }
  }, []);

  useEffect(() => {
    getItemsData();
    getSinglePostData();
  }, [getItemsData, getSinglePostData]);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="post-entry-1 lg">
              <PostItemOne large={true} item={item} />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                <div className="post-entry-1">
                  <PostItemOne large={false} item={items[0]} />
                </div>
                <div className="post-entry-1">
                  <PostItemOne large={false} item={items[1]} />
                </div>
              </div>
              <div className="col-lg-4 border-start custom-border">
                <div className="post-entry-1">
                  <PostItemOne large={false} item={items[2]} />
                </div>
                <div className="post-entry-1">
                  <PostItemOne large={false} item={items[3]} />
                </div>
              </div>
              <div className="col-lg-4 border-start custom-border">
                <div className="post-entry-1">
                  <PostItemOne large={false} item={items[4]} />
                </div>
                
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {items.slice(0, 5).map((item, index) => (
                      <li key={item._id}>
                        <a href={`/postitems/${item._id}`}>
                          <span className="number">{index + 1}</span>
                          <span className="post-title">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
