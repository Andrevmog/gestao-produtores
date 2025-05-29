import type { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Main = styled.main`
  margin-top: 20px;
`;

type MainTemplateProps = {
  children: ReactNode;
};

export const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Container>
      <Main>
        {children}
      </Main>
    </Container>
  );
};