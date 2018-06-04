const renderErrorHandler = require('./path/to/my/renderErrorHandler.js');

const React = require('react');

class TestComponent extends React.Component {
    componentDidCatch(error, info) {
        renderErrorHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
