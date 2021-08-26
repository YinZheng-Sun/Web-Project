import { VectorArray } from 'zrender/lib/core/vector';
declare type KDTreePoint = {
    array: VectorArray;
};
declare class KDTreeNode<T> {
    left: KDTreeNode<T>;
    right: KDTreeNode<T>;
    axis: number;
    data: T;
    constructor(axis: number, data: T);
}
declare class KDTree<T extends KDTreePoint> {
    dimension: number;
    root: KDTreeNode<T>;
    private _stack;
    private _nearstNList;
    constructor(points: T[], dimension?: number);
    private _buildTree;
    nearest(target: T, squaredDistance: (a: T, b: T) => number): T;
    _addNearest(found: number, dist: number, node: KDTreeNode<T>): void;
    nearestN(target: T, N: number, squaredDistance: (a: T, b: T) => number, output: T[]): T[];
}
export default KDTree;
