import { RequestGenericInterface } from "fastify";

/**
* FindPath Parameters of url request
 */
export interface FindPathParameters  extends RequestGenericInterface {
    /** from vertex id */
    from : number; 
    /** to vertex id */
    to : number;
    /** by "métrique" : { "eco", "fast" } */
    by : string;
}
