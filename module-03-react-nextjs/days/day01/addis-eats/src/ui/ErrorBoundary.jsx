import React from "react";

/**
 * ErrorBoundary - Class component implementing getDerivedStateFromError and componentDidCatch
 * As taught in Day 34: wraps isolated regions of the component tree to prevent whole-app white screens.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for telemetry / debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === "function"
          ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
          : this.props.fallback;
      }

      return (
        <div className="error-boundary-box" role="alert">
          <h3>Something went wrong in this section</h3>
          <p className="error-msg">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button className="btn btn-primary" onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
