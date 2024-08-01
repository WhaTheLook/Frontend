import { Component, PropsWithChildren, ReactNode } from "react";

import { NetworkError } from "../NetworkError";

interface Props {
  children: ReactNode;
}

interface State {
  shouldhandleError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<
  PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldhandleError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      shouldhandleError: true,
      error,
    };
  }

  render() {
    if (!this.state.shouldhandleError) {
      return this.props.children;
    }
    return (
      <NetworkError
        onClickRetry={() => this.setState({ shouldhandleError: false })}
      />
    );
  }
}
