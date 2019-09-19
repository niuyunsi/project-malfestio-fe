import React from 'react';
import { API_URL, PROD_API_URL } from '../config';

const url = process.env.NODE_ENV === 'production' ? PROD_API_URL : API_URL;

export const Demo = () => {
  const handleFetchAnimals = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>demo</div>
      <div>api endpoint: {url}</div>
      <button onClick={handleFetchAnimals}>fetch animals</button>
    </div>
  );
};
