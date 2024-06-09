import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    } else {
      return <p style={{ color: "red" }}>Xatolik sodir bo'ldi</p>;
    }
  }
}
export default ErrorBoundary;
