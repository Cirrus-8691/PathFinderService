import {describe,it} from "mocha";
import {testGraphExists, testGetVertex } from "./BasicGraphTests";
import {testFindPathParameters, findFastPathBetweenVertices} from "./FindPathTests";
import { viewPathEcoPathBetween, viewPathFastPathBetween } from "./IntegrationsTests";
/**
 * Run all unitTest with mocha framework
 * see : https://www.npmjs.com/package/mocha
 */
describe("Unit tests", () => {
    describe("Unit tests", () => {
        it("Sample graph is loaded",            testGraphExists );
        it("Graph tests to getVertex",          testGetVertex );
        it("Check find query",                   testFindPathParameters );
        it("Find fastest path between vertices", findFastPathBetweenVertices);
    });
    describe("Integration tests", () => {
        it("View fastest path between vertices", viewPathFastPathBetween);
        it("View eco path between vertices",     viewPathEcoPathBetween);
    });
});