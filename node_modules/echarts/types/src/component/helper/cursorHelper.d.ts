import { ElementEvent } from 'zrender/lib/Element';
import ExtensionAPI from '../../core/ExtensionAPI';
import { CoordinateSystem } from '../../coord/CoordinateSystem';
export declare function onIrrelevantElement(e: ElementEvent, api: ExtensionAPI, targetCoordSysModel: CoordinateSystem['model']): boolean;
