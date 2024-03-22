'use client';

import Alert, { AlertMessage } from '@systran/react-components/lib/atoms/Alert';
import {Component, ErrorInfo, ReactNode} from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: string | null;
}

const ErrorAlert = ({message}: {message: string}) => {
  const {t} = useTranslation();

  return (
    <Alert variant='error'>
      <AlertMessage>{t(message)}</AlertMessage>
    </Alert>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {hasError: true, errorInfo: error.message};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorAlert message={this.state.errorInfo || 'An error Occured.'} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
