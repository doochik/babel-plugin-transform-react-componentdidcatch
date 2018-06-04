const renderErrorHandler = require('./path/to/my/renderErrorHandler.js');

const { PureComponent } = require('react');

class TestComponent extends PureComponent {
    componentDidCatch(error, info) {
        renderErrorHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
