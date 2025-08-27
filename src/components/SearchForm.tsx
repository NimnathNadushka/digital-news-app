import React from 'react'
import './searchForm.css';

interface Props {
    active?: boolean;
    formOpen?: () => void;
}

export default function SearchForm({ active = false, formOpen }: Props) {
    return (
        <div className={`search-form-wrap js-search-form-wrap${active ? ' active' : ''}`}>
            <form className='search-form'>
                <span className='icon bi-search'></span>
                <input type='text' placeholder='Search' className='form-control' />
                 <button
                    type="button"
                    className='btn js-search-close'
                    onClick={(e) => {
                        e.preventDefault();
                        formOpen && formOpen();
                    }}
                 >
                    <span className='icon bi-x'></span>
                 </button>
            </form>
        </div>
    );
}
