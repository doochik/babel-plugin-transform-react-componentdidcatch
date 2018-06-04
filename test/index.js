'use strict';

const path   = require('path');
const fs     = require('fs');
const assert = require('assert');
const babel  = require('babel-core');

describe('fixtures', () => {
    const fixturesDir = path.join(__dirname, 'fixtures');

    fs.readdirSync(fixturesDir).map((caseName, i) => {
        if (caseName === '.babelrc') return;

        it(caseName.split('-').join(' '), () => {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actual     = babel.transformFileSync(
                path.join(fixtureDir, 'actual.js')
            ).code;
            const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js')).toString();

            assert.equal(trim(actual), trim(expected));
        });
    });
});

function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}
