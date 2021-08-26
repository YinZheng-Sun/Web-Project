import Model from '../model/Model';
import List from './List';
import { DimensionLoose, ParsedValue, OptionDataValue, OptionDataItemObject } from '../util/types';
import { Dictionary } from 'zrender/lib/core/types';
declare type TreeTraverseOrder = 'preorder' | 'postorder';
declare type TreeTraverseCallback<Ctx> = (this: Ctx, node: TreeNode) => boolean | void;
declare type TreeTraverseOption = {
    order?: TreeTraverseOrder;
    attr?: 'children' | 'viewChildren';
};
interface TreeNodeOption extends Pick<OptionDataItemObject<OptionDataValue>, 'name' | 'value'> {
    children?: TreeNodeOption[];
}
export declare class TreeNode {
    name: string;
    depth: number;
    height: number;
    parentNode: TreeNode;
    dataIndex: number;
    children: TreeNode[];
    viewChildren: TreeNode[];
    isExpand: boolean;
    readonly hostTree: Tree<Model>;
    constructor(name: string, hostTree: Tree<Model>);
    isRemoved(): boolean;
    eachNode<Ctx>(options: TreeTraverseOrder, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(options: TreeTraverseOption, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    updateDepthAndHeight(depth: number): void;
    getNodeById(id: string): TreeNode;
    contains(node: TreeNode): boolean;
    getAncestors(includeSelf?: boolean): TreeNode[];
    getAncestorsIndices(): number[];
    getDescendantIndices(): number[];
    getValue(dimension?: DimensionLoose): ParsedValue;
    setLayout(layout: any, merge?: boolean): void;
    getLayout(): any;
    getModel<T = unknown>(): Model<T>;
    getLevelModel(): Model;
    setVisual(key: string, value: any): void;
    setVisual(obj: Dictionary<any>): void;
    getVisual(key: string): any;
    getRawIndex(): number;
    getId(): string;
    isAncestorOf(node: TreeNode): boolean;
    isDescendantOf(node: TreeNode): boolean;
}
declare class Tree<HostModel extends Model = Model, LevelOption = any> {
    type: 'tree';
    root: TreeNode;
    data: List;
    hostModel: HostModel;
    levelModels: Model<LevelOption>[];
    private _nodes;
    constructor(hostModel: HostModel);
    eachNode<Ctx>(options: TreeTraverseOrder, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(options: TreeTraverseOption, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    getNodeByDataIndex(dataIndex: number): TreeNode;
    getNodeById(name: string): TreeNode;
    update(): void;
    clearLayouts(): void;
    static createTree<T extends TreeNodeOption, HostModel extends Model, LevelOption>(dataRoot: T, hostModel: HostModel, beforeLink?: (data: List) => void): Tree<HostModel, any>;
}
export default Tree;
