import React, { useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import { Header } from './';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const GlobalStyle = createGlobalStyle`
  html {
    /* box-sizing: border-box; */
    /* font-size: 10px; */
  }
	body {
    padding: 0;
		margin: 0;
		font-size: 1rem;
  }
`;

const StyledPage = styled.div`
  /* background: white; */
  /* border: 1px solid ${props => props.theme.red}; */
  margin: 1rem;
  padding: 1rem;
  color: ${props => props.theme.black};
  display: flex;
	flex-direction: column;
	align-items: stretch;
`;

const Inner = styled.div`
  /* max-width: ${props => props.theme.maxWidth}; */
  /* margin: 0 auto; */
  /* padding: 2rem; */
  /* border: 1px solid black; */
`;

interface PageProps {
  children: JSX.Element;
}

export const Page = (props: PageProps) => {
  useEffect(() => {
    document.title = 'project rathalos';
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <StyledPage>
          <Header />
          <Inner>{props.children}</Inner>
        </StyledPage>
      </>
    </ThemeProvider>
  );
};
