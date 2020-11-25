import { testGraphExists, testGetVertex } from "./BasicGraphTests";
import { testFindPathParameters, viewPathFastPathBetween,
     findFastPathBetweenVertices, viewPathEcoPathBetween } from "./FindPathTests";
/**
 * Debug test with Visual code
 */
testGraphExists();
testGetVertex();
//------------------------------
testFindPathParameters();
findFastPathBetweenVertices();
viewPathFastPathBetween();
viewPathEcoPathBetween();
// TODO : other tests...