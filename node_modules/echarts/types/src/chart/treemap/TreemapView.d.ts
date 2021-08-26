import ChartView from '../../view/Chart';
import { TreeNode } from '../../data/Tree';
import TreemapSeriesModel from './TreemapSeries';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { TreemapRootToNodePayload, TreemapMovePayload, TreemapRenderPayload, TreemapZoomToNodePayload } from './treemapAction';
interface FoundTargetInfo {
    node: TreeNode;
    offsetX?: number;
    offsetY?: number;
}
declare class TreemapView extends ChartView {
    static type: string;
    type: string;
    private _containerGroup;
    private _breadcrumb;
    private _controller;
    private _oldTree;
    private _state;
    private _storage;
    seriesModel: TreemapSeriesModel;
    api: ExtensionAPI;
    ecModel: GlobalModel;
    render(seriesModel: TreemapSeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: TreemapZoomToNodePayload | TreemapRenderPayload | TreemapMovePayload | TreemapRootToNodePayload): void;
    private _giveContainerGroup;
    private _doRender;
    private _doAnimation;
    private _resetController;
    private _clearController;
    private _onPan;
    private _onZoom;
    private _initEvents;
    private _renderBreadcrumb;
    remove(): void;
    dispose(): void;
    private _zoomToNode;
    private _rootToNode;
    findTarget(x: number, y: number): FoundTargetInfo;
}
export default TreemapView;
