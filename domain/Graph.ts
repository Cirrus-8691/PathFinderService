import { FindPathParameters } from "../controllers/requestParameters/FindPathParameters";
import { GraphInfo } from "./interfaces/GraphInfo";
import { Edge } from "./interfaces/Edge";
import { Vertex } from "./interfaces/Vertex";
/**
 * The sample graph
 */
import SampleGraph from "../assets/graph3.json";
/**
 * Type used to store 2 numbers ( vertex id , vertex weight)
 */
type TwoNumbers = [number, number];
/**
 * Type used to store shorter path's vertices (number[]) 
 * and its total lenght/weight (number)
 */
export type ShorterPath = [number[],number];
/** 
 * string to identify the metric used to find the fastest path 
 * */
export const ByFastestPath = "fast";
/** 
 * string to identify the metric used to find the eco path 
 * */
export const ByEcoPath = "eco";
/**
 * Manage path in Graph
 */
export default class Graph {

    private graphInfo : GraphInfo = { 
        minVertexId : 0,
        maxVertexId : 0
    };

    /**
     * Initialise graph
     */
    constructor() {
        this.graphInfo.maxVertexId = SampleGraph.length -1;
     }
    /**
     * Get the graphInfo
     */
    public get Info() : GraphInfo {
        return this.graphInfo;
    }
    /**
     *  Get a vertex from its id
     * Warning idVertex is not checked
     * @param vertexId
     */
    public getVertex(vertexId : number) : Vertex {
        return SampleGraph[vertexId] as Vertex;
    }
    /**
     * Chech parameters in param (max, min vertx id, by string value )
     * @param param 
     */
    public check(param: FindPathParameters) {
        if(!param) {
            throw new Error("param is not defined");
        }
        if(param.from < this.graphInfo.minVertexId) {
            throw new Error(`from < minVertexId:${this.graphInfo.minVertexId}`);
        }
        if(param.to < this.graphInfo.minVertexId) {
            throw new Error(`to < minVertexId:${this.graphInfo.minVertexId}`);
        }
        if(param.from > this.graphInfo.maxVertexId) {
            throw new Error(`from > maxVertexId:${this.graphInfo.maxVertexId}`);
        }
        if(param.to > this.graphInfo.maxVertexId) {
            throw new Error(`to > maxVertexId:${this.graphInfo.maxVertexId}`);
        }
        if(param.from===param.to) {
            throw new Error(`from vertex id equal to vertex id`);
        }
        if( param.by!==ByFastestPath &&
            param.by!==ByEcoPath) {
            throw new Error(`Invalid "by" parameter`);
        }
    }
    /*****************************************
     * Private properties used to find path
     * see https://fr.wikipedia.org/wiki/Algorithme_de_Dijkstra
     *****************************************/
    private weights : number[] = [];
    private previous : number[] = [];
    /**
     * Initialize vertex weight and previous array
     * @param startId 
     * @param length 
     */
    private initialize(startId : number, length : number) {
        // initialize vertex weight array
        this.weights = new Array<number>(length);
        for(let id=0; id<length; id++ ) {
            this.weights[id] = Number.POSITIVE_INFINITY;
        }
        this.weights[startId] = 0;
        //-- initialize previous vertex id array--
        this.previous = new Array<number>(length);
    }
    /**
     * Find a vertex at minimum weight
     * @param vertexIdentifiants 
     */
    private findMin(vertexIdentifiants : number[]) : number {
        let min = Number.POSITIVE_INFINITY;
        let vertexId = -1;
        vertexIdentifiants.forEach(id => {
            if(this.weights[id] < min) {
                min = this.weights[id];
                vertexId = id;
            }
        });
        return vertexId;
    }
    /**
     * Update weigt between vertex id1 and vertex idAndWeight 
     * @param vertexId1 
     * @param idAndWeight array of 2 numbers vertex id and vertex weight
     */
    private updateWeight(vertexId1 : number, idAndWeight : TwoNumbers) {
        const newWeight = this.weights[vertexId1] + idAndWeight[1];
        if(this.weights[idAndWeight[0]] > newWeight) {
            this.weights[idAndWeight[0]] = newWeight;
            this.previous[idAndWeight[0]] = vertexId1;
        }
    }
    /**
     * Implementation of dijkstra algorithm
     * @param startId 
     * @param evalWeight 
     */
    private dijkstra(startId : number, evalWeight : (edge : Edge) => number) {

        const length : number = this.graphInfo.maxVertexId + 1;

        this.initialize( startId, length );
        const verticesIds = this.allVertices(length);
        while(verticesIds.length>0) {

            const vertexId1 = this.findMin(verticesIds);
            this.removeVertex(vertexId1,verticesIds);

            const verticesNeighbors = this.getNeighbors(vertexId1, evalWeight );
            verticesNeighbors.forEach(idAndWeight => 
                this.updateWeight(vertexId1, idAndWeight) )
        }
    }
    /**
     * All graph vertices id
     * @param length 
     */
    private allVertices(length : number) {
        const verticesIds = new Array<number>(length);
        for(let id=0; id<length; id++) {
            verticesIds[id] = id;
        }
        return verticesIds;
    }
    /**
     * remove vertex from vertices array
     * @param vertexId 
     * @param verticesIds 
     */
    private removeVertex(vertexId : number, verticesIds : number[]) {
        const index = verticesIds.indexOf(vertexId, 0);
        if (index > -1) {
            verticesIds.splice(index, 1);
        }
    }
    /**
     * find neighbors vertices of vertexId
     * @param vertexId 
     */
    private getNeighbors( vertexId : number,
                          evalWeight : (edge : Edge) => number
                        ) : TwoNumbers[] {
        return this.getVertex(vertexId).map(e => [e.vertex_id, evalWeight(e) ] );
    }

    /**
    * @param param FindPath Parameters : from vertex id, to vertex id, by { "eco","fast" }
    */
    public find( param : FindPathParameters ) : ShorterPath {
        // check parameters
        this.check(param);
        // dijkstra algorithm to find shorted path using the metric
        this.dijkstra(param.from,
            (edge : Edge) => param.by===ByFastestPath
            ? edge.distance_km
            : edge.co2_g);
        // build path
        const verticesPath : Array<number> = [];
        let vertexId = param.to;
        while(vertexId != param.from) {
            verticesPath.push(vertexId);
            if(this.previous[vertexId]!==undefined) {
                vertexId = this.previous[vertexId];
            }
            else { 
               // vertexId not reached : return empty path and infinite weight
               return [[],Number.POSITIVE_INFINITY];
            }
        }
        const totalWeight = this.weights[param.to];
        return [verticesPath, totalWeight];
    }
}