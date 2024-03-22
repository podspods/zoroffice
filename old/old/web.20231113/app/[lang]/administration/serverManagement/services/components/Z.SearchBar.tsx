import React, { useState } from 'react';
import Data from '../storybook.data/MOCK_DATA.json';
export function SearchBar() {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input
        placeholder='Enter Post Title'
        onChange={(event) => setQuery(event.target.value)}
      />
      {Data.filter((post) => {
        if (query === '') {
          return post;
        } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
          return post;
        }
        return [];
      }).map((post, index) => (
        <div className='box' key={index}>
          <p>{post.title}</p>
          <p>{post.author}</p>
        </div>
      ))}
    </div>
  );
}
