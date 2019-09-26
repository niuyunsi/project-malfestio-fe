import React from 'react';
import styled from 'styled-components';

import * as types from '../common/types';

interface AnimalProps {
  animal: types.Animal;
  onAnimalDelete: (id: string) => void;
}

const StyledAnimalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  justify-items: start;
`;

export const Animal = (props: AnimalProps) => {
  const { animal, onAnimalDelete } = props;

  const handleDelete = (id: string) => {
    onAnimalDelete(id);
  };

  return (
    <StyledAnimalWrapper key={animal._id}>
      <div>Name: {animal.name}</div>
      <div>Is endangered?: {animal.isEndangered ? 'Yes' : 'No'}</div>
      <button onClick={() => handleDelete(animal._id)}>Delete</button>
    </StyledAnimalWrapper>
  );
};
