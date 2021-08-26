import { HashMap } from 'zrender/lib/core/util';
import BoundingRect from 'zrender/lib/core/BoundingRect';
import { NameMap } from './geoTypes';
import Region from './Region';
import Group from 'zrender/lib/graphic/Group';
declare const _default: {
    load: (mapName: string, nameMap: NameMap, nameProperty?: string) => {
        regions: Region[];
        regionsMap: HashMap<Region>;
        nameCoordMap: HashMap<number[]>;
        boundingRect: BoundingRect;
    };
    makeGraphic: (mapName: string, hostKey: string) => Group[];
    removeGraphic: (mapName: string, hostKey: string) => void;
};
export default _default;
