'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);

  const getItemsData = ()=>{
    fetch('/api/postitems')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching post items:', error));
  }

  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <section id='posts' className='posts'>
      <div className='container' data-aos='fade-up'>
      {items && 
        items.length > 0 && 
        items.map((item: { 
        _id: string;
        img: string;
        category: string;
        date: string;
        title: string;
        brief: string;
        avatar: string;
        author: string; }) => 
        <PostItemOne key={item._id} large={false} item={item} />
        )}
      </div>
    </section>
  );
}
