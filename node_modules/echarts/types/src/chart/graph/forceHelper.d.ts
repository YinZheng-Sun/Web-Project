import * as vec2 from 'zrender/lib/core/vector';
import { RectLike } from 'zrender/lib/core/BoundingRect';
interface InputNode {
    p?: vec2.VectorArray;
    fixed?: boolean;
    w: number;
    rep: number;
}
interface InputEdge {
    ignoreForceLayout?: boolean;
    n1: InputNode;
    n2: InputNode;
    d: number;
}
interface LayoutCfg {
    gravity?: number;
    friction?: number;
    rect?: RectLike;
}
export declare function forceLayout<N extends InputNode, E extends InputEdge>(inNodes: N[], inEdges: E[], opts: LayoutCfg): {
    warmUp: () => void;
    setFixed: (idx: number) => void;
    setUnfixed: (idx: number) => void;
    beforeStep: (cb: (nodes: N[], edges: E[]) => void) => void;
    afterStep: (cb: (nodes: N[], edges: E[], finished: boolean) => void) => void;
    step: (cb?: (finished: boolean) => void) => void;
};
export {};
