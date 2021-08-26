import { Group } from '../../util/graphic';
import ComponentView from '../../view/Component';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import VisualMapModel from './VisualMapModel';
declare type VisualState = VisualMapModel['stateList'][number];
declare class VisualMapView extends ComponentView {
    static type: string;
    type: string;
    autoPositionValues: {
        readonly left: 1;
        readonly right: 1;
        readonly top: 1;
        readonly bottom: 1;
    };
    ecModel: GlobalModel;
    api: ExtensionAPI;
    visualMapModel: VisualMapModel;
    init(ecModel: GlobalModel, api: ExtensionAPI): void;
    render(visualMapModel: VisualMapModel, ecModel: GlobalModel, api: ExtensionAPI, payload: unknown): void;
    renderBackground(group: Group): void;
    protected getControllerVisual(targetValue: number, visualCluster: 'color' | 'opacity' | 'symbol' | 'symbolSize', opts?: {
        forceState?: VisualState;
        convertOpacityToAlpha?: boolean;
    }): string | number;
    protected positionGroup(group: Group): void;
    protected doRender(visualMapModel: VisualMapModel, ecModel: GlobalModel, api: ExtensionAPI, payload: unknown): void;
}
export default VisualMapView;
