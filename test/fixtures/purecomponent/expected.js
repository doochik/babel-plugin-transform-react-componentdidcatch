const componentDidCatchHandler = require('./path/to/my/componentDidCatchHandler.js');

const { PureComponent } = require('react');

class TestComponent extends PureComponent {
    componentDidCatch(error, info) {
        componentDidCatchHandler(error, info);
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
