import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';

import { animalService } from '../services/AnimalService';

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
  display: grid;
  grid-gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledAnimalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  justify-items: start;
`;

interface Animal {
  dateOfEntry: string;
  isEndangered: boolean;
  name: string;
  __v: number;
  _id: string;
}

export const AnimalList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [name, setName] = useState('');
  const [isEndangered, setIsEndangered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    if (isLoading || isSubmitting || isDeleting) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading, isSubmitting, isDeleting]);

  const getAnimals = async () => {
    setIsLoading(true);
    const animals = await animalService.getAnimals();
    setAnimals(animals);
    setIsLoading(false);
  };

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

  const createAnimal = async (animal: Partial<Animal>) => {
    setIsSubmitting(true);
    const newAnimal = await animalService.createAnimal(animal);
    setAnimals([...animals, newAnimal]);
    setName('');
    setIsEndangered(false);
    setIsSubmitting(false);
  };

  const handleDelete = (id: string) => {
    deleteAnimal(id);
  };

  const deleteAnimal = async (id: string) => {
    setIsDeleting(true);
    await animalService.deleteAnimal(id);
    setAnimals(animals.filter(animal => animal._id !== id));
    setIsDeleting(false);
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
        <button onClick={getAnimals}>Refresh</button>
      </StyledAnimalsWrapper>
    </StyledDemoWrapper>
  );
};
