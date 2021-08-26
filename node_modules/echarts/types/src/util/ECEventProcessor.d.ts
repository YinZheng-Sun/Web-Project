import { EventProcessor, EventQuery } from 'zrender/lib/core/Eventful';
import { ECEvent, NormalizedEventQuery } from './types';
import ComponentModel from '../model/Component';
import ComponentView from '../view/Component';
import ChartView from '../view/Chart';
import Element from 'zrender/lib/Element';
export declare class ECEventProcessor implements EventProcessor {
    eventInfo: {
        targetEl: Element;
        packedEvent: ECEvent;
        model: ComponentModel;
        view: ComponentView | ChartView;
    };
    normalizeQuery(query: EventQuery): NormalizedEventQuery;
    filter(eventType: string, query: NormalizedEventQuery): boolean;
    afterTrigger(): void;
}
