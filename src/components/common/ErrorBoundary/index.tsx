import { Component, PropsWithChildren, ReactNode } from "react";
import { UnknownError } from "../UnknownError";

interface Props {
  children: ReactNode;
}

interface State {
  shouldRethrow: boolean;
  shouldhandleError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldRethrow: false,
      shouldhandleError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (!(error instanceof Error)) {
      return {
        shouldRethrow: true,
        shouldhandleError: false,
        error,
      };
    }
    return {
      shouldRethrow: false,
      shouldhandleError: true,
      error,
    };
  }

  render() {
    if (this.state.shouldRethrow) {
      throw this.state.error;
    }
    if (!this.state.shouldhandleError) {
      return this.props.children;
    }
    return (
      <UnknownError
        onClickRetry={() => this.setState({ shouldhandleError: false })}
      />
    );
  }
}
