import React from 'react';
import styled from 'styled-components';

import { Animal } from '../common/types';

interface AnimalsProps {
  animals: Animal[];
  isLoading: boolean;
  isDeleting: boolean;
  onAnimalDelete: (id: string) => void;
  onRefresh: () => void;
}

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

export const Animals = (props: AnimalsProps) => {
  const { animals, isLoading, isDeleting, onAnimalDelete, onRefresh } = props;

  return (
    <StyledAnimalsWrapper>
      {isLoading && <div>Loading animals</div>}
      {isDeleting && <div>Deleting animal</div>}
      {animals.map((animal: any) => (
        <StyledAnimalWrapper key={animal._id}>
          <div>Name: {animal.name}</div>
          <div>Is endangered?: {animal.isEndangered ? 'Yes' : 'No'}</div>
          <button onClick={() => onAnimalDelete(animal._id)}>Delete</button>
        </StyledAnimalWrapper>
      ))}
      <button onClick={onRefresh}>Refresh</button>
    </StyledAnimalsWrapper>
  );
};
