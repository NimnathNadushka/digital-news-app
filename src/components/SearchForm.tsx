'use client';

import React from 'react';
import './searchForm.css';

interface SearchFormProps {
  active: boolean;
  formOpen: () => void;
}

export default function SearchForm({ active, formOpen }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add search functionality here
  };

  return (
    <div className={`search-form-wrap ${active ? 'active' : ''}`}>
      <form onSubmit={handleSubmit} className='search-form'>
        <input 
          type="search" 
          placeholder="Search" 
          className="form-control" 
          aria-label="Search"
        />
        <button type="submit" className="btn" aria-label="Submit search">
          <span className="icon bi-search"></span>
        </button>
        <button type="button" className="btn-close" onClick={formOpen} aria-label="Close search">
          <span className="icon bi-x"></span>
        </button>
      </form>
    </div>
  )
}
