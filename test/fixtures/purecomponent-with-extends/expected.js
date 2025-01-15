const componentDidCatchHandler = require("./path/to/my/componentDidCatchHandler.js");
const React = require('react');
class TestComponent extends React.PureComponent {
  componentDidCatch(error, info) {
    componentDidCatchHandler(error, info);
  }
  render() {
    return <span />;
  }
}
class TestExtendsComponent extends TestComponent {
  render() {
    return <div>{super.render()}</div>;
  }
}
module.exports = TestExtendsComponent;
