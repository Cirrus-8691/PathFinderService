import { assert } from "chai";
import { FindPathParameters } from "../controllers/requestParameters/FindPathParameters";
import Graph, { ByEcoPath, ByFastestPath } from "../domain/Graph";
import { Path } from "../views/interfaces/Path";
import PathFactory from "../views/PathFactory";

/**
 * Create an ihm view of the fatest path
 */
export const viewPathFastPathBetween = () => {
    const graph = new Graph();
    const by = ByFastestPath;
    let params : FindPathParameters = {
             from : 4,
             to : 2,
             by
          };
    const path42 : Path = PathFactory.Build( 
                            params,
                            graph.find( params ));
    assert.isDefined(path42,"path is undefined");
    assert.equal(path42.fromVertexId,params.from, "bad pathFromVertexId");
    assert.equal(path42.toVertexId,params.to, "bad pathToVertexId");
    assert.isTrue(path42.verticesFromTo.length>0, "bad path42");
    
    // to really view something
    console.log(path42);
 
    logPath({ from : 0, to : 2, by }, graph);
    logPath({ from : 1, to : 2, by }, graph);
    logPath({ from : 3, to : 2, by }, graph);
    logPath({ from : 0, to : 4, by }, graph);
    logPath({ from : 0, to : 1, by }, graph);
    logPath({ from : 2, to : 4, by }, graph);
  
 }
 /**
  * Create an ihm view of the eco path
  */
 export const viewPathEcoPathBetween = () => {
    
    const graph = new Graph();
    const by = ByEcoPath;
 
    logPath({ from : 4, to : 2, by }, graph);
    logPath({ from : 0, to : 2, by }, graph);
    logPath({ from : 1, to : 2, by }, graph);
    logPath({ from : 3, to : 2, by }, graph);
    logPath({ from : 0, to : 4, by }, graph);
    logPath({ from : 0, to : 1, by }, graph);
    logPath({ from : 2, to : 4, by }, graph);
  
 }
 /**
  * log helper function
  * @param params 
  * @param graph 
  */
 const logPath = (params : FindPathParameters, graph : Graph) => {
    console.log( 
       PathFactory.Build( 
          params, 
          graph.find( params )
       ) 
    );
 }