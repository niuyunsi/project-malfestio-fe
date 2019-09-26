import React from 'react';
import styled from 'styled-components';

import { Nav } from './Nav';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column
  }
`;

export const Header = () => (
  <StyledHeader>
    <div>project malfestio</div>
    <Nav />
  </StyledHeader>
);
