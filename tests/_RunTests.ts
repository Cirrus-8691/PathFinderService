import {describe,it} from "mocha";
import {testGraphExists, testGetVertex } from "./BasicGraphTests";
import {testFindPathParameters, viewPathFastPathBetween,
        findFastPathBetweenVertices, viewPathEcoPathBetween} from "./FindPathTests";
/**
 * Run all unitTest with mocha framework
 * see : https://www.npmjs.com/package/mocha
 */
describe('Unit tests', () => {
    describe('Basic tests', () => {
        it('Sample graph is loaded',            testGraphExists );
        it('Graph tests to getVertex',          testGetVertex );
    });
    describe('Find path tests', () => {
        it('Check find query',                   testFindPathParameters );
        it('Find fastest path between vertices', findFastPathBetweenVertices);
        it('View fastest path between vertices', viewPathFastPathBetween);
        it('View eco path between vertices',     viewPathEcoPathBetween);
    });
});