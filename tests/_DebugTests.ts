import { testGraphExists, testGetVertex } from "./BasicGraphTests";
import { testFindPathParameters, findFastPathBetweenVertices } from "./FindPathTests";
import { viewPathFastPathBetween } from "./IntegrationsTests";
/**
 * Debug test with Visual code
 */
testGraphExists();
testGetVertex();
//------------------------------
testFindPathParameters();
findFastPathBetweenVertices();
viewPathFastPathBetween();
viewPathFastPathBetween();
// TODO : other tests...