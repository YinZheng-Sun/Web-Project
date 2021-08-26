import DataZoomModel, { DataZoomOption } from './DataZoomModel';
export interface InsideDataZoomOption extends DataZoomOption {
    disabled?: boolean;
    zoomLock?: boolean;
    zoomOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt';
    moveOnMouseMove?: boolean | 'shift' | 'ctrl' | 'alt';
    moveOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt';
    preventDefaultMouseMove?: boolean;
    textStyle?: never;
}
declare class InsideZoomModel extends DataZoomModel<InsideDataZoomOption> {
    static readonly type = "dataZoom.inside";
    type: string;
    static defaultOption: InsideDataZoomOption;
}
export default InsideZoomModel;
