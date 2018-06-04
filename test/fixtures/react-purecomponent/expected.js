const renderErrorHandler = require('./path/to/my/renderErrorHandler.js');

const React = require('react');

class TestComponent extends React.PureComponent {
    componentDidCatch(error, info) {
        renderErrorHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
