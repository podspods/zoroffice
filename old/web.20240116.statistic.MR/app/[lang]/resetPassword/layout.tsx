'use client'

import styled from '@systran/react-components/lib/Theme/styled';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.div`
  margin: 2rem;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;
