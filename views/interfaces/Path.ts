/**
 * Path between vertice
 */
export interface Path
{
    /** path From Vertex's Id */
    fromVertexId : number,
    /** path To Vertex's Id */
    toVertexId : number,
    /** metric Used to eval vertrix's weight */
    metricUsed : string,

    /** vertices From To path*/
    verticesFromTo : number[],

    /** weight (sum of vertices weight) */
    totalWeight : number,
}