import { AbstractGraph, Edge, EdgeCost, UNDEFINED_COST, Vertex } from './Graph.types';

const NULL = -1;
export const VERBOSE = true;
export const SILENT = false;

export const COST_WALL = 100;
export const COST_SPACE = 1;
export const ALL_NODES = 10;

export const defaultEdgeCost: EdgeCost = {
    cost: UNDEFINED_COST,
    v0v1Cost: UNDEFINED_COST,
    v1v0Cost: UNDEFINED_COST
};

export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    map: boolean;
}
export class GraphCalculator {
    public calculateGraph = (
        graph: AbstractGraph,
        fromVertex: number,
        toVertex: number,
        verbose: boolean,
        maxStep: number
    ) => {
        let newGraph = this.calcVerticesCost(graph, fromVertex, verbose, maxStep);
        if (maxStep >= ALL_NODES) {
            newGraph = this.calcCheapestPath(newGraph, fromVertex, toVertex);
        }
        return newGraph;
    };

    private getEdgesOfVertex = (graph: AbstractGraph): number[] => {
        const edgesOfVertex = graph.edges
            .map((edge: Edge, index: number) =>
                edge.vertex0 === graph.curVertexIndex || edge.vertex1 === graph.curVertexIndex
                    ? index
                    : -1
            )
            .filter((index) => index !== -1);
        return edgesOfVertex;
    };

    private getAdjancedVertexIndex = (graph: AbstractGraph, edgeIndex: number): number => {
        const adjacentEdge = graph.edges[edgeIndex];
        const adjacentVertexIndex =
            adjacentEdge.vertex0 === graph.curVertexIndex
                ? adjacentEdge.vertex1
                : adjacentEdge.vertex0;
        return adjacentVertexIndex;
    };

    private updateAccessCostAndEdgeIndex = (
        graph: AbstractGraph,
        adjacentVertex: Vertex,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const adjacentEdge = graph.edges[edgeIndex];
        const newAccessCost = curVertex.accessCost + adjacentEdge.cost.cost;
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };

    private getNextVertex = (graph: AbstractGraph, edgesOfVertex: number[]): number => {
        let minAccessCost = Number.MAX_SAFE_INTEGER;
        let adjacentVertexWithMinCost = -1;
        for (let i = 0; i < edgesOfVertex.length; i++) {
            const edgeIndex = edgesOfVertex[i];
            const adjacentEdge = graph.edges[edgeIndex];
            const adjacentVertexIndex =
                adjacentEdge.vertex0 === graph.curVertexIndex
                    ? adjacentEdge.vertex1
                    : adjacentEdge.vertex0;
            const adjacentVertex = graph.vertices[adjacentVertexIndex];
            if (adjacentVertex.processed === false && adjacentVertex.accessCost < minAccessCost) {
                minAccessCost = adjacentVertex.accessCost;
                adjacentVertexWithMinCost = adjacentVertexIndex;
            }
        }
        return adjacentVertexWithMinCost;
    };

    private calcVerticesCost = (
        graph: AbstractGraph,
        fromVertex: number,
        verbose: boolean,
        maxStep: number
    ) => {
        const newGraph = { ...graph };
        if (maxStep !== -1) {
            newGraph.vertices[fromVertex].accessCost = 0;
            newGraph.curVertexIndex = fromVertex;
        }
        let n = 0;
        while (n < newGraph.vertices.length && newGraph.curVertexIndex !== -1 && n < maxStep) {
            const curVertex = newGraph.vertices[newGraph.curVertexIndex];
            newGraph.vertices[newGraph.curVertexIndex].processed = true;
            const edgesOfVertex = this.getEdgesOfVertex(newGraph);
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentVertexIndex = this.getAdjancedVertexIndex(newGraph, edgeIndex);
                const adjacentVertex = newGraph.vertices[adjacentVertexIndex];
                if (adjacentVertex.processed) {
                    continue;
                }
                this.updateAccessCostAndEdgeIndex(newGraph, adjacentVertex, curVertex, edgeIndex);
            }

            const nextVertex = this.getNextVertex(newGraph, edgesOfVertex);
            verbose && console.log('next vertex index = ', nextVertex);
            newGraph.curVertexIndex = nextVertex;
            n++;
        }
        return newGraph;
    };

    private calcCheapestPath = (graph: AbstractGraph, fromVertex: number, toVertex: number) => {
        const newGraph = { ...graph };
        let curVertexIndex = toVertex;
        const pathFromDestToSrc: number[] = [];
        const deadLoopProtection = 100;
        let stepNo = 0;
        while (curVertexIndex !== fromVertex && stepNo < deadLoopProtection) {
            const curVertex = newGraph.vertices[curVertexIndex];
            pathFromDestToSrc.push(curVertex.edgeIndex);
            const edge = newGraph.edges[curVertex.edgeIndex];
            curVertexIndex = edge.vertex0 === curVertexIndex ? edge.vertex1 : edge.vertex0;
            stepNo++;
        }

        newGraph.cheapestPath = pathFromDestToSrc.reverse();
        return newGraph;
    };
}
