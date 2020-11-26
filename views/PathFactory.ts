import { FindPathParameters } from "../controllers/requestParameters/FindPathParameters";
import { ShorterPath } from "../domain/Graph";
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
    public static Build(params : FindPathParameters, shorterPath : ShorterPath) : Path
    {
        const vertices = shorterPath[0];
        const path : Path =  {
            fromVertexId : params.from,
            toVertexId : vertices[0],
            metricUsed : params.by,
            verticesFromTo : [params.from],
            totalWeight : shorterPath[1]
        };
        path.verticesFromTo = path.verticesFromTo.concat( vertices.reverse() );
        return path;
    }
}