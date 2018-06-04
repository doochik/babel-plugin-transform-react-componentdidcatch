'use strict';

const babylon = require('babylon');

const errorHandlerName = 'componentDidCatchHandler';

const tryCatchRender = `componentDidCatchHandler(error, info);`;
const tryCatchRenderAST = babylon.parse(tryCatchRender, { allowReturnOutsideFunction: true }).program.body[0];

const createReactChecker = (t) => (node) => {
    const superClass = node.superClass;
    return t.isIdentifier(superClass, { name: 'Component' }) ||
        t.isIdentifier(superClass, { name: 'PureComponent' }) ||
        t.isMemberExpression(superClass) && (
            t.isIdentifier(superClass.object, { name: 'React' }) &&
            (
                t.isIdentifier(superClass.property, { name: 'Component' }) ||
                t.isIdentifier(superClass.property, { name: 'PureComponent' })
            )
        );
};

module.exports = (_ref) => {
    const t = _ref.types;

    const isReactClass = createReactChecker(t);

    const bodyVisitor = {
        ClassMethod: function (path) {
            // try to find componentDidCatch() method definition
            if (path.node.key.name === 'componentDidCatch') {
                this.componentDidCatchMethodPath = path;
            }
        },
    };

    return {
        visitor: {
            Program: {
                exit(path, state) {
                    if (!state.insertErrorHandler) {
                        return;
                    }

                    if (!state.opts.componentDidCatchHandler) {
                        throw Error('[babel-plugin-transform-react-componentdidcatch] You must define "componentDidCatchHandler" property');
                    }

                    const varName = t.identifier(errorHandlerName);
                    const variableDeclaration = t.variableDeclaration('const', [
                        t.variableDeclarator(
                            varName,
                            t.callExpression(t.identifier('require'), [ t.stringLiteral(state.opts.componentDidCatchHandler) ])
                        )
                    ]);
                    path.unshiftContainer('body', variableDeclaration);
                }
            },
            Class(path, pass) {
                if (!isReactClass(path.node)) {
                    return;
                }

                const state = {
                    componentDidCatchMethodPath: null,
                };

                path.traverse(bodyVisitor, state);

                if (state.componentDidCatchMethodPath) {
                    // if component has componentDidCatch already, skip it
                    return;
                }

                // generate componentDidCatch() method
                path.get('body').unshiftContainer('body',
                    t.classMethod(
                        'method',
                        t.identifier('componentDidCatch'),
                        [ t.identifier('error'), t.identifier('info') ],
                        t.blockStatement([ tryCatchRenderAST ])
                    )
                );

                // pass info for Program:exit to create errorHandler import
                pass.insertErrorHandler = true;
            }
        }
    };
};
