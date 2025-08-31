'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);

  const handleFormOpen = () => {
    setOpen(!open);
  };

  const handleToggleMenu = () => {
    setOn(!on);
    const body: HTMLElement | null = document.querySelector('body');
    body?.classList.toggle('mobile-nav-active');
  };

  return (
    <header
      id="header"
      className="header d-flex align-items-center fixed-top"
    >
      <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
        <Link href='/' className='logo d-flex align-items-center'>
          <h1> Digital News </h1>
        </Link>
        <Nav />

        <div className='position-relative header-actions'>
          {/* keep icons in DOM to preserve layout; hide visually when search is open */}
          <div
            className={`actions-icons ${open ? 'invisible-when-search' : ''}`}
            aria-hidden={open}
          >
            <Sci />
            <button
              type="button"
              className='mx-2 js-search-open'
              onClick={handleFormOpen}
              aria-label="Open search"
            >
              <span className='icon bi-search'></span>
            </button>
          </div>
          {
            on ? (
              <i className='icon bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
            ) : (
              <i className='icon bi-list mobile-nav-toggle' onClick={handleToggleMenu}></i>
            )
          }
          <SearchForm active={open} formOpen={handleFormOpen} />
        </div>
      </div>
    </header>
  )
}
