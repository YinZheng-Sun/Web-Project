import { TreeNode } from '../../data/Tree';
declare function eachAfter<T>(root: TreeNode, callback: (node: TreeNode, separation: T) => void, separation: T): void;
declare function eachBefore(root: TreeNode, callback: (node: TreeNode) => void): void;
export { eachAfter, eachBefore };
