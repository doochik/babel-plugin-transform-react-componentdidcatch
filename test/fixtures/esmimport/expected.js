import componentDidCatchHandler from "./path/to/my/componentDidCatchHandler.js";
import { Component } from 'react';
class TestComponent extends Component {
  componentDidCatch(error, info) {
    componentDidCatchHandler(error, info);
  }
  render() {
    return <div />;
  }
}
export default TestComponent;
