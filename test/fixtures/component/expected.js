const renderErrorHandler = require('./path/to/my/renderErrorHandler.js');

const { Component } = require('react');

class TestComponent extends Component {
    componentDidCatch(error, info) {
        renderErrorHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
