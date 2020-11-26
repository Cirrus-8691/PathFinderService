import { Edge } from "./Edge";

/**
 * Vertex as defined in graph3.json
 * plus a flag 
 */
export interface Vertex extends ReadonlyArray<Edge>
{
}
