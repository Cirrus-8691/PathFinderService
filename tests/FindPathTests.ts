/**
 * Find path Unit Test for Graph using chai framework
 * see : https://www.npmjs.com/package/chai
 */
import { assert } from "chai";
import { FindPathParameters } from "../controllers/requestParameters/FindPathParameters";
import Graph, { ByEcoPath, ByFastestPath, ShorterPath } from "../domain/Graph";
import { Path } from "../views/interfaces/Path";
import PathFactory from "../views/PathFactory";

/**
 * test FindPathParameters
 * @param graph 
 */
export const testFindPathParameters = () => {
   const graph = new Graph();
   const param : FindPathParameters = {
       from : 0,
       to : 1,
       by : ByFastestPath,
   };
   // check "by" : no exception expected here
   graph.check(param);
   param.by = ByEcoPath;
   graph.check(param);
   param.by = "?";
   assert.throw(() => graph.check(param),`Invalid "by" parameter`);
   // check "from"
   param.from = -1;
   assert.throw(() => graph.check(param),`from < minVertexId:${graph.Info.minVertexId}`);
   param.from = graph.Info.maxVertexId + 1;
   assert.throws(() => graph.check(param),`from > maxVertexId:${graph.Info.maxVertexId}`);
   // check "to"
   param.from = 0;
   param.to = -1;
   assert.throw(() => graph.check(param),`to < minVertexId:${graph.Info.minVertexId}`);
   param.to = graph.Info.maxVertexId + 1;
   assert.throw(() => graph.check(param),`to > maxVertexId:${graph.Info.maxVertexId}`);
   // check from=to
   param.from = 0;
   param.to = 0;
   assert.throw(() => graph.check(param),`from vertex id equal to vertex id`);
}

/**
 * Try to find the fatest path between two vertices
 */
export const findFastPathBetweenVertices = () => {
   const graph = new Graph();
   const path42 : ShorterPath = graph.find( {
            from : 4,
            to : 2,
            by : ByFastestPath
         });
   assert.isDefined(path42,"path is undefined");
   assert.isTrue(path42[0].length>0, "bad path42");
   assert.isDefined(path42[0].find(v => v===1), "bad path42");

   const path02 = graph.find( { from : 0, to : 2, by : ByFastestPath });
   assert.isTrue(path02[0].length>0, "bad path02");
   assert.isDefined(path02[0].find(v => v===3), "bad path02");

   const path12 = graph.find( { from : 1, to : 2, by : ByFastestPath });
   assert.isTrue(path12[0].length>0, "bad path12");
   assert.isUndefined(path12[0].find(v => v===0), "bad path12");

   const path32 = graph.find( { from : 3, to : 2, by : ByFastestPath });
   assert.isTrue(path32[0].length>0, "bad path32");

   const path04 = graph.find( { from : 0, to : 4, by : ByFastestPath });
   assert.isTrue(path04[0].length>0, "bad path04");
   assert.isDefined(path04[0].find(v => v===3), "bad path04");

   const path01 = graph.find( { from : 0, to : 1, by : ByFastestPath });
   assert.isTrue(path01[0].length>0, "bad path01");
   assert.isDefined(path01[0].find(v => v===3), "bad path01");

   const path24 = graph.find( { from : 2, to : 4, by : ByFastestPath });
   assert.isTrue(path24[0].length>0, "bad path24");
   assert.isDefined(path24[0].find(v => v===1), "bad path24");

}

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