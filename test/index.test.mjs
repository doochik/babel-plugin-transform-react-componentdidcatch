import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import babel from '@babel/core';
import { describe, expect, it } from 'vitest';

describe('fixtures', () => {
    const fixturesDir = join(__dirname, 'fixtures');

    readdirSync(fixturesDir).map(caseName => {
        if (caseName === '.babelrc') return;

        it(caseName.split('-').join(' '), () => {
            const fixtureDir = join(fixturesDir, caseName);
            const actual     = babel.transformFileSync(
                join(fixtureDir, 'actual.js')
            ).code;
            const expected = readFileSync(join(fixtureDir, 'expected.js')).toString();

            expect(actual.trim().replace(/\t/g, '    ')).toEqual(expected.trim());
        });
    });
});
