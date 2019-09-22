import React, { useState } from 'react';
// import styled from 'styled-components';

// import { API_URL, PROD_API_URL } from '../config';

// const url = process.env.NODE_ENV === 'production' ? PROD_API_URL : API_URL;

// const StyledInputWrapper = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// interface Animal {
//   name: string;
//   isEndangered: boolean;
// }

export const CreateAnimal = () => {
  //   const [name, setName] = useState('');
  //   const [isEndangered, setIsEndangered] = useState(false);
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const name = e.target.value;
  //     setName(name);
  //   };

  //   const handleIsEndangeredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const isEndangered = e.target.checked;
  //     setIsEndangered(isEndangered);
  //   };

  //   const handleSubmit = () => {
  //     createAnimal({ name, isEndangered });
  //   };

  //   const createAnimal = async (animal: Animal) => {
  //     console.log('create new animal');
  //     setIsSubmitting(true);
  //     const res = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(animal)
  //     });
  //     res
  //       .json()
  //       .then(res => {
  //         setAnimals([...animals, res]);
  //         setName('');
  //         setIsEndangered(false);
  //         setIsSubmitting(false);
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   return (
  //     <StyledInputWrapper>
  //       {isSubmitting && <div>Submitting new animal</div>}
  //       <div>
  //         <span>Animal name:</span>
  //         <input type="text" onChange={handleNameChange} value={name}></input>
  //       </div>
  //       <div>
  //         <input type="checkbox" onChange={handleIsEndangeredChange} checked={isEndangered} />
  //         <label>Is endangered?</label>
  //       </div>
  //       <button onClick={handleSubmit}>Submit</button>
  //     </StyledInputWrapper>
  //   );
  return <div />;
};
