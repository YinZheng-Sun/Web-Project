import BoundingRect, { RectLike } from 'zrender/lib/core/BoundingRect';
import CalendarModel from './CalendarModel';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { ScaleDataValue, OptionDataValueDate } from '../../util/types';
import { ParsedModelFinder } from '../../util/model';
import { CoordinateSystem, CoordinateSystemMaster } from '../CoordinateSystem';
export interface CalendarParsedDateRangeInfo {
    range: [string, string];
    start: CalendarParsedDateInfo;
    end: CalendarParsedDateInfo;
    allDay: number;
    weeks: number;
    nthWeek: number;
    fweek: number;
    lweek: number;
}
export interface CalendarParsedDateInfo {
    y: string;
    m: string;
    d: string;
    day: number;
    time: number;
    formatedDate: string;
    date: Date;
}
export interface CalendarCellRect {
    contentShape: RectLike;
    center: number[];
    tl: number[];
    tr: number[];
    br: number[];
    bl: number[];
}
declare class Calendar implements CoordinateSystem, CoordinateSystemMaster {
    static readonly dimensions: string[];
    static getDimensionsInfo(): (string | {
        name: string;
        type: "time";
    })[];
    readonly type = "calendar";
    readonly dimensions: string[];
    private _model;
    private _rect;
    private _sw;
    private _sh;
    private _orient;
    private _firstDayOfWeek;
    private _rangeInfo;
    private _lineWidth;
    constructor(calendarModel: CalendarModel, ecModel: GlobalModel, api: ExtensionAPI);
    getDimensionsInfo: typeof Calendar.getDimensionsInfo;
    getRangeInfo(): CalendarParsedDateRangeInfo;
    getModel(): CalendarModel;
    getRect(): BoundingRect;
    getCellWidth(): number;
    getCellHeight(): number;
    getOrient(): "horizontal" | "vertical";
    getFirstDayOfWeek(): number;
    getDateInfo(date: OptionDataValueDate): CalendarParsedDateInfo;
    getNextNDay(date: OptionDataValueDate, n: number): CalendarParsedDateInfo;
    update(ecModel: GlobalModel, api: ExtensionAPI): void;
    dataToPoint(data: OptionDataValueDate | OptionDataValueDate[], clamp?: boolean): number[];
    pointToData(point: number[]): number;
    dataToRect(data: OptionDataValueDate | OptionDataValueDate[], clamp?: boolean): CalendarCellRect;
    pointToDate(point: number[]): CalendarParsedDateInfo;
    convertToPixel(ecModel: GlobalModel, finder: ParsedModelFinder, value: ScaleDataValue | ScaleDataValue[]): number[];
    convertFromPixel(ecModel: GlobalModel, finder: ParsedModelFinder, pixel: number[]): number;
    containPoint(point: number[]): boolean;
    private _initRangeOption;
    _getRangeInfo(range: OptionDataValueDate[]): CalendarParsedDateRangeInfo;
    private _getDateByWeeksAndDay;
    static create(ecModel: GlobalModel, api: ExtensionAPI): Calendar[];
}
export default Calendar;
