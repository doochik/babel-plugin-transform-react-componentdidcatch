import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    { files: [ '**/*.js' ], languageOptions: { sourceType: 'commonjs' } },
    { files: [ 'test/fixtures/*/*.js' ], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { files: [ 'test/fixtures/esmimport/*.js' ], languageOptions: { sourceType: 'module' } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            '@stylistic/js/array-bracket-spacing': [ 'error', 'always' ],
            '@stylistic/js/comma-dangle': [ 'error', 'always-multiline' ],
            '@stylistic/js/no-multiple-empty-lines': 'error',
            '@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
            '@stylistic/js/quote-props': [ 'error', 'as-needed', {
                keywords: true,
                numbers: true,
            } ],
            '@stylistic/js/quotes': [ 'error', 'single', {
                allowTemplateLiterals: true,
            } ],
        },
    },
    {
        ignores: [ 'node_modules', 'test/fixtures/*/expected.js' ],
    },
];
