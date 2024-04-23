'use strict';

module.exports = (_ref) => {
    const t = _ref.types;

    const errorHandlerName = 'componentDidCatchHandler';

    const isReactClass = (t) => (node) => {
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

                    if (state.opts.type !== 'module') {
                        const varName = t.identifier(errorHandlerName);
                        const variableDeclaration = t.variableDeclaration('const', [
                            t.variableDeclarator(
                                varName,
                                t.callExpression(t.identifier('require'), [ t.stringLiteral(state.opts.componentDidCatchHandler) ])
                            )
                        ]);
                        path.unshiftContainer('body', variableDeclaration);
                    } else {
                        const importName = t.identifier(errorHandlerName);
                        const importDeclaration = t.importDeclaration([ t.importDefaultSpecifier(importName) ], t.stringLiteral(state.opts.componentDidCatchHandler));
                        path.unshiftContainer('body', importDeclaration);
                    }
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
                        t.blockStatement([
                            t.expressionStatement(
                                t.callExpression(t.identifier(errorHandlerName), [
                                    t.identifier('error'),
                                    t.identifier('info')
                                ])
                            )
                        ])
                    )
                );

                // pass info for Program:exit to create errorHandler import
                pass.insertErrorHandler = true;
            }
        }
    };
};
