import {FastifyInstance, FastifyRequest} from "fastify";
import { FindPathParameters } from "./requestParameters/FindPathParameters";
import Graph from "../domain/Graph";
import { Path } from "../views/interfaces/Path";
import { GraphInfo } from "../domain/interfaces/GraphInfo";
import PathFactory from "../views/PathFactory";

/**
 * PathFinder Controller
 */
export default class PathFinderController {

    private router: FastifyInstance;
    private graph : Graph;

    constructor(router: FastifyInstance) {

        this.router = router;
        this.graph = new Graph();

        // register a findPath service
        router.get<FindPathParameters>("/api/graph/findPath",
            this.findPath.bind(this));

        // register a graph info service
        router.get("/api/graph/info",
            this.info.bind(this));
    }
    /**
    * endpoint to findpath
    * 
    * WS: /api/findpath?from=1&to=5&by=fast
    * Parameters:
    *  from = Login for the user account
    *  to = Password for the user account
    *  by = fast or eco (see \domain\Graph.ts)
    * @param request Request findPatinfoh Parameters
    */ 
    async findPath( request : FastifyRequest<FindPathParameters> ): Promise<Path> {
        try
        {
            request.log.info("SW - api/findpath");

            const params = request.query as FindPathParameters;
            params.from  = +params.from; // cast "from" string to number
            params.to    = +params.to;   // cast "to"   string to number
    
            request.log.info(`SW - findPath from vertex id:${params.from} to vertex id:${params.to} by ${params.by}`);

            return PathFactory.Build( 
                    params,
                    this.graph.find( params ) );
        }
        catch(error) {
            request.log.error( error );
            return Promise.reject<Path>(error);
        }
    }
    /**
    * endpoint to have graph info
    *
    * WS: /api/info
    * @param request 
    */
    async info( request : FastifyRequest ): Promise<GraphInfo> {
        try
        {
            request.log.info("SW - api/info");

            return this.graph.Info;
        }
        catch(error) {
            request.log.error( error );
            return Promise.reject<GraphInfo>(error);
        }
    }
}