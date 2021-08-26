import ExtensionAPI from '../core/ExtensionAPI';
import ChartView from '../view/Chart';
declare class LabelManager {
    private _labelList;
    private _chartViewList;
    constructor();
    clearLabels(): void;
    private _addLabel;
    addLabelsOfSeries(chartView: ChartView): void;
    updateLayoutConfig(api: ExtensionAPI): void;
    layout(api: ExtensionAPI): void;
    processLabelsOverall(): void;
    private _updateLabelLine;
    private _animateLabels;
}
export default LabelManager;
