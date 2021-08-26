import * as layout from '../../util/layout';
import { TreeNode } from '../../data/Tree';
import TreeSeriesModel from './TreeSeries';
import ExtensionAPI from '../../core/ExtensionAPI';
interface HierNode {
    defaultAncestor: TreeLayoutNode;
    ancestor: TreeLayoutNode;
    prelim: number;
    modifier: number;
    change: number;
    shift: number;
    i: number;
    thread: TreeLayoutNode;
}
export interface TreeLayoutNode extends TreeNode {
    parentNode: TreeLayoutNode;
    hierNode: HierNode;
    children: TreeLayoutNode[];
}
export declare function init(inRoot: TreeNode): void;
export declare function firstWalk(node: TreeLayoutNode, separation: SeparationFunc): void;
export declare function secondWalk(node: TreeLayoutNode): void;
export declare function separation(cb?: SeparationFunc): SeparationFunc;
export declare function radialCoordinate(rad: number, r: number): {
    x: number;
    y: number;
};
export declare function getViewRect(seriesModel: TreeSeriesModel, api: ExtensionAPI): layout.LayoutRect;
interface SeparationFunc {
    (node1: TreeLayoutNode, node2: TreeLayoutNode): number;
}
export {};
