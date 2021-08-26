import Element, { ElementProps } from 'zrender/lib/Element';
import { ZREasing } from './types';
declare type AnimationWrapDoneCallback = () => void;
declare class AnimationWrap {
    private _storage;
    private _elExistsMap;
    private _finishedCallback;
    add(el: Element, target: ElementProps, duration?: number, delay?: number, easing?: ZREasing): boolean;
    finished(callback: AnimationWrapDoneCallback): AnimationWrap;
    start(): AnimationWrap;
}
export declare function createWrap(): AnimationWrap;
export {};
