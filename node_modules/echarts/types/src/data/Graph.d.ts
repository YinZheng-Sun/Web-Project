import { Dictionary } from 'zrender/lib/core/types';
import List from './List';
import Model from '../model/Model';
import Element from 'zrender/lib/Element';
import { DimensionLoose, ParsedValue } from '../util/types';
declare class Graph {
    type: 'graph';
    readonly nodes: GraphNode[];
    readonly edges: GraphEdge[];
    data: List;
    edgeData: List;
    private _directed;
    private _nodesMap;
    private _edgesMap;
    constructor(directed?: boolean);
    isDirected(): boolean;
    addNode(id: string | number, dataIndex?: number): GraphNode;
    getNodeByIndex(dataIndex: number): GraphNode;
    getNodeById(id: string): GraphNode;
    addEdge(n1: GraphNode | number | string, n2: GraphNode | number | string, dataIndex?: number): GraphEdge;
    getEdgeByIndex(dataIndex: number): GraphEdge;
    getEdge(n1: string | GraphNode, n2: string | GraphNode): GraphEdge;
    eachNode<Ctx>(cb: (this: Ctx, node: GraphNode, idx: number) => void, context?: Ctx): void;
    eachEdge<Ctx>(cb: (this: Ctx, edge: GraphEdge, idx: number) => void, context?: Ctx): void;
    breadthFirstTraverse<Ctx>(cb: (this: Ctx, node: GraphNode, fromNode: GraphNode) => boolean | void, startNode: GraphNode | string, direction: 'none' | 'in' | 'out', context?: Ctx): void;
    update(): void;
    clone(): Graph;
}
declare class GraphNode {
    id: string;
    inEdges: GraphEdge[];
    outEdges: GraphEdge[];
    edges: GraphEdge[];
    hostGraph: Graph;
    dataIndex: number;
    __visited: boolean;
    constructor(id?: string, dataIndex?: number);
    degree(): number;
    inDegree(): number;
    outDegree(): number;
    getModel<T = unknown>(): Model<T>;
    getModel<T = unknown, S extends keyof T = keyof T>(path: S): Model<T[S]>;
    getAdjacentDataIndices(): {
        node: number[];
        edge: number[];
    };
}
declare class GraphEdge {
    node1: GraphNode;
    node2: GraphNode;
    dataIndex: number;
    hostGraph: Graph;
    constructor(n1: GraphNode, n2: GraphNode, dataIndex?: number);
    getModel<T = unknown>(): Model<T>;
    getModel<T = unknown, S extends keyof T = keyof T>(path: S): Model<T[S]>;
    getAdjacentDataIndices(): {
        node: number[];
        edge: number[];
    };
}
interface GraphDataProxyMixin {
    getValue(dimension?: DimensionLoose): ParsedValue;
    setVisual(key: string | Dictionary<any>, value?: any): void;
    getVisual(key: string): any;
    setLayout(layout: any, merge?: boolean): void;
    getLayout(): any;
    getGraphicEl(): Element;
    getRawIndex(): number;
}
interface GraphEdge extends GraphDataProxyMixin {
}
interface GraphNode extends GraphDataProxyMixin {
}
export default Graph;
export { GraphNode, GraphEdge };
