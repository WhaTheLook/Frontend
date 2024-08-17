import { Component, PropsWithChildren, ReactNode } from "react";

import { UnknownError } from "@/components/common/UnknownError";
import { NotFoundError } from "../NotFoundError";

import { CommonError } from "@/utils/CommonError";
import { isTimeoutError } from "@/utils";

interface Props {
  children: ReactNode;
}

interface State {
  shouldRethrow: boolean;
  shouldhandleError: boolean;
  error?: Error;
}

export class ApiErrorBoundary extends Component<
  PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldRethrow: false,
      shouldhandleError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error instanceof CommonError || isTimeoutError(error)) {
      return {
        shouldRethrow: false,
        shouldhandleError: true,
        error,
      };
    }
    return {
      shouldRethrow: true,
      shouldhandleError: false,
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
    if (
      this.state.error instanceof CommonError &&
      this.state.error.statusCode === 404
    ) {
      return <NotFoundError />;
    }
    return (
      <UnknownError
        onClickRetry={() => this.setState({ shouldhandleError: false })}
      />
    );
  }
}
