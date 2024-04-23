const componentDidCatchHandler = require("./path/to/my/componentDidCatchHandler.js");
const React = require('react');
class TestComponent extends React.PureComponent {
  componentDidCatch(error, info) {
    componentDidCatchHandler(error, info);
  }
  render() {
    return <div />;
  }
}
module.exports = TestComponent;
