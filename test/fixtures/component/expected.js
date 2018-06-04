const componentDidCatchHandler = require('./path/to/my/componentDidCatchHandler.js');

const { Component } = require('react');

class TestComponent extends Component {
    componentDidCatch(error, info) {
        componentDidCatchHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
