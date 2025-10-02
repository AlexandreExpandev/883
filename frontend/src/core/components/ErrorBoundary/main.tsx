import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @component ErrorBoundary
 * @summary Catches JavaScript errors anywhere in their child component tree and displays a fallback UI.
 * @domain core
 * @type utility-component
 * @category error-handling
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // You can also log the error to an error reporting service
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Sorry.. there was an error.</h1>;
    }

    return this.props.children;
  }
}
