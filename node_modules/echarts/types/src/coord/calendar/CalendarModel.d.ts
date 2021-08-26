import ComponentModel from '../../model/Component';
import Calendar from './Calendar';
import { ComponentOption, BoxLayoutOptionMixin, LayoutOrient, LineStyleOption, ItemStyleOption, LabelOption, OptionDataValueDate } from '../../util/types';
import GlobalModel from '../../model/Global';
import Model from '../../model/Model';
export interface CalendarMonthLabelFormatterCallbackParams {
    nameMap: string;
    yyyy: string;
    yy: string;
    MM: string;
    M: number;
}
export interface CalendarYearLabelFormatterCallbackParams {
    nameMap: string;
    start: string;
    end: string;
}
export interface CalendarOption extends ComponentOption, BoxLayoutOptionMixin {
    mainType?: 'calendar';
    cellSize?: number | 'auto' | (number | 'auto')[];
    orient?: LayoutOrient;
    splitLine?: {
        show?: boolean;
        lineStyle?: LineStyleOption;
    };
    itemStyle?: ItemStyleOption;
    range?: OptionDataValueDate | (OptionDataValueDate)[];
    dayLabel?: Omit<LabelOption, 'position'> & {
        firstDay?: number;
        margin?: number | string;
        position?: 'start' | 'end';
        nameMap?: 'en' | 'cn' | string[];
    };
    monthLabel?: Omit<LabelOption, 'position'> & {
        margin?: number;
        position?: 'start' | 'end';
        nameMap?: 'en' | 'cn' | string[];
        formatter?: string | ((params: CalendarMonthLabelFormatterCallbackParams) => string);
    };
    yearLabel?: Omit<LabelOption, 'position'> & {
        margin?: number;
        position?: 'top' | 'bottom' | 'left' | 'right';
        formatter?: string | ((params: CalendarYearLabelFormatterCallbackParams) => string);
    };
}
declare class CalendarModel extends ComponentModel<CalendarOption> {
    static type: string;
    type: string;
    coordinateSystem: Calendar;
    init(option: CalendarOption, parentModel: Model, ecModel: GlobalModel): void;
    mergeOption(option: CalendarOption): void;
    getCellSize(): LineAndPositionSetting[];
    static defaultOption: CalendarOption;
}
export default CalendarModel;
