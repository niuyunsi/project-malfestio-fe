import React from 'react';
import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

interface CreateAnimalProps {
  name: string;
  isEndangered: boolean;
  isSubmitting: boolean;
  onNameChange: (name: string) => void;
  onIsEndangeredChange: (isEndangered: boolean) => void;
  onSubmit: () => void;
}

export const CreateAnimal = React.memo((props: CreateAnimalProps) => {
  const { name, isEndangered, isSubmitting, onNameChange, onIsEndangeredChange, onSubmit } = props;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };
  const handleIsEndangeredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onIsEndangeredChange(e.target.checked);
  };
  const handleSubmit = () => {
    onSubmit();
  };

  return (
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
  );
});
