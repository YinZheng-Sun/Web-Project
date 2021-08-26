import { DatasetModel } from '../../component/dataset/install';
import SeriesModel from '../../model/Series';
import { Source } from '../Source';
export declare class SourceManager {
    private _sourceHost;
    private _sourceList;
    private _upstreamSignList;
    private _versionSignBase;
    constructor(sourceHost: DatasetModel | SeriesModel);
    dirty(): void;
    private _setLocalSource;
    private _getVersionSign;
    prepareSource(): void;
    private _createSource;
    private _applyTransform;
    private _isDirty;
    getSource(sourceIndex?: number): Source;
    private _getUpstreamSourceManagers;
    private _getSourceMetaRawOption;
}
export declare function disableTransformOptionMerge(datasetModel: DatasetModel): void;
