import React from 'react';
import './postItemOne.css';
import Link from 'next/link';
import Image from 'next/image'; // Add this import

export default function PostItemOne({
  large,
  item,
}: {
  large: boolean;
  item: {
    _id: string;
    img: string;
    category: string;
    date: string;
    title: string;
    brief: string;
    avatar: string;
    author: string;
  };
}) {
  return (
  <div className={`post-entry-1 ${large ? 'lg' : undefined}`}>
    <Link href={`/postitems/${item._id}`}>
      <Image 
        src={`/${item.img}`} 
        alt={item.title} 
        width={large ? 600 : 400}
        height={large ? 400 : 250}
        className="img-fluid" 
      />
    </Link>
    <div className="post-meta">
      <span className="date">{item.category}</span>
      <span className="mx-1">
        <i className="bi bi-dot"></i>{' '}
      </span>
      <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
    </div>
    <h2>
      <Link href={`/postitems/${item._id}`}>{item.title}</Link>
    </h2>
    {large ? (
      <>
        <p className="mb-4 d-block">{item.brief}</p>

        <div className="d-flex align-items-center author">
          <div className="photo">
            <Image 
              src={item.avatar} 
              alt={item.author} 
              width={40}
              height={40}
              className="img-fluid" 
            />
          </div>
          <div className="name">
            <h3 className="m-0 p-0">{item.author}</h3>
          </div>
        </div>
      </>
    ) : null}

  </div>
  );
}
