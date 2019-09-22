import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';

import { API_URL, PROD_API_URL } from '../config';

const url = process.env.NODE_ENV === 'production' ? PROD_API_URL : API_URL;
console.log('url', url);

const StyledDemoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StyledInputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledAnimalsWrapper = styled.div`
  width: 50%;
  /* display: flex;
  flex-direction: column;
  align-items: center; */

  display: grid;
  grid-gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledAnimalWrapper = styled.div`
  /* width: 100%; */
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: start;
`;

interface Animal {
  name: string;
  isEndangered: boolean;
}

export const AnimalList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [animals, setAnimals] = useState([] as any[]);
  const [name, setName] = useState('');
  const [isEndangered, setIsEndangered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAnimals = async () => {
    console.log('fetch data');
    setIsLoading(true);
    const res = await fetch(url);
    res
      .json()
      .then(res => {
        setAnimals(res);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  useEffect(() => {
    console.log('effect');
    if (isLoading || isSubmitting || isDeleting) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading, isSubmitting, isDeleting]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const handleIsEndangeredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEndangered = e.target.checked;
    setIsEndangered(isEndangered);
  };

  const handleSubmit = () => {
    createAnimal({ name, isEndangered });
  };

  const createAnimal = async (animal: Animal) => {
    console.log('create new animal');
    setIsSubmitting(true);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    });
    res
      .json()
      .then(res => {
        setAnimals([...animals, res]);
        setName('');
        setIsEndangered(false);
        setIsSubmitting(false);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id: string) => {
    deleteAnimal(id);
  };

  const deleteAnimal = async (id: string) => {
    console.log('delete animal');
    setIsDeleting(true);
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res
      .json()
      .then(res => {
        setAnimals(animals.filter(animal => animal._id !== id));
        setIsDeleting(false);
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = () => {
    console.log('edit animal');
  };

  return (
    <StyledDemoWrapper>
      <StyledInputWrapper>
        {isSubmitting && <div>Submitting new animal</div>}
        <div>
          <span>Animal name:</span>
          <input type="text" onChange={handleNameChange} value={name}></input>
        </div>
        <div>
          <input type="checkbox" onChange={handleIsEndangeredChange} checked={isEndangered} />
          <label>Is endangered?</label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </StyledInputWrapper>
      <StyledAnimalsWrapper>
        {isLoading && <div>Loading animals</div>}
        {isDeleting && <div>Deleting animal</div>}
        {animals.map((animal: any) => (
          <StyledAnimalWrapper key={animal._id}>
            <div>Name: {animal.name}</div>
            <div>Is endangered?: {animal.isEndangered ? 'Yes' : 'No'}</div>
            <button onClick={() => handleDelete(animal._id)}>Delete</button>
          </StyledAnimalWrapper>
        ))}
        <button onClick={fetchAnimals}>Refresh</button>
      </StyledAnimalsWrapper>
    </StyledDemoWrapper>
  );
};
