import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  a {
    padding: 1rem 2rem;
  }
  @media (max-width: 480px) {
    flex-direction: column
  }
`;

export const Nav = () => (
  <StyledNav>
    <Link to="/">Home</Link>
    <Link to="/resume">Resume</Link>
    <Link to="/demo">Demo</Link>
  </StyledNav>
);
