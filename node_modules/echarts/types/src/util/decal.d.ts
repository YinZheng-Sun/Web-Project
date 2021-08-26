import { PatternObject } from 'zrender/lib/graphic/Pattern';
import ExtensionAPI from '../core/ExtensionAPI';
import { InnerDecalObject } from './types';
export declare function createOrUpdatePatternFromDecal(decalObject: InnerDecalObject | 'none', api: ExtensionAPI): PatternObject;
