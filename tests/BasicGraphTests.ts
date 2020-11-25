/**
 * Basic Unit Test for Graph using chai framework
 * see : https://www.npmjs.com/package/chai
 */
import { assert } from "chai";
import Graph from "../domain/Graph";
import { Vertex } from "../domain/interfaces/Vertex";
/**
 * Test if graph.json is loaded
 */
export const testGraphExists = () => {
    // test graph initialize ( loading json file is ok )
    const graph : Graph  = new Graph();
    assert.isTrue(graph.Info.maxVertexId > 0, "Graph vertex's max id is zero or less");
}
/**
 * Test get vertex
  * @param graph 
 */
export const testGetVertex = () => {
    const graph = new Graph();
    const idVertex : number = 1;
    const vertex : Vertex = graph.getVertex(idVertex);
    assert.isDefined(vertex, `cannot find vertex id:${idVertex}`);
    assert.isNotNull(vertex, `find vertex id:${idVertex} is null`);
}
