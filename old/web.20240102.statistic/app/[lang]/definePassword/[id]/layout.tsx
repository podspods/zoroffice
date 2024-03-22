'use client';

import ErrorBoundary from '@/components/Password/ErrorBoundary';
import styled from '@emotion/styled';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
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
