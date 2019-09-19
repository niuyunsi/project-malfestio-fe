import React from 'react';
import { endpoint, prodEndpoint } from '../config';

export const Demo = () => {
  const url = process.env.NODE_ENV === 'production' ? prodEndpoint : endpoint;

  const handleFetchAnimals = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>demo</div>
      <button onClick={handleFetchAnimals}>fetch animals</button>
    </div>
  );
};
