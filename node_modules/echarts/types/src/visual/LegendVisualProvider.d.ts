import List from '../data/List';
declare class LegendVisualProvider {
    private _getDataWithEncodedVisual;
    private _getRawData;
    constructor(getDataWithEncodedVisual: () => List, getRawData: () => List);
    getAllNames(): string[];
    containName(name: string): boolean;
    indexOfName(name: string): number;
    getItemVisual(dataIndex: number, key: string): any;
}
export default LegendVisualProvider;
