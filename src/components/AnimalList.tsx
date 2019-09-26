import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';

import { Animals, CreateAnimal } from './';
import { Animal } from '../common/types';
import { animalService } from '../services/AnimalService';

const StyledDemoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

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

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleIsEndangeredChange = (isEndangered: boolean) => {
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

  const handleAnimalDelete = (id: string) => {
    deleteAnimal(id);
  };

  const deleteAnimal = async (id: string) => {
    setIsDeleting(true);
    await animalService.deleteAnimal(id);
    setAnimals(animals.filter(animal => animal._id !== id));
    setIsDeleting(false);
  };

  const handleRefresh = () => {
    getAnimals();
  };

  return (
    <StyledDemoWrapper>
      <CreateAnimal
        name={name}
        isEndangered={isEndangered}
        isSubmitting={isSubmitting}
        onNameChange={handleNameChange}
        onIsEndangeredChange={handleIsEndangeredChange}
        onSubmit={handleSubmit}
      />
      <Animals
        animals={animals}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onAnimalDelete={handleAnimalDelete}
        onRefresh={handleRefresh}
      />
    </StyledDemoWrapper>
  );
};
