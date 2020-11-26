import { FindPathParameters } from "../controllers/requestParameters/FindPathParameters";
import { Path } from "./interfaces/Path";

/**
 * To build path as expected by ihm
 */
export default class PathFactory {

    /**
     * Build the path "view"
     * @param params 
     * @param vertices 
     * @param totalWeight 
     */
    public static Build(params : FindPathParameters, vertices:number[], totalWeight:number) : Path
    {
        const path : Path =  {
            fromVertexId : params.from,
            toVertexId : vertices[0],
            metricUsed : params.by,
            verticesFromTo : [params.from],
            totalWeight,
        };
        path.verticesFromTo = path.verticesFromTo.concat( vertices.reverse() );
        return path;
    }
}