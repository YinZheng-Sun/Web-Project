declare type VectorArray = number[];
declare function create(x?: number, y?: number): VectorArray;
declare function copy<T extends VectorArray>(out: T, v: VectorArray): T;
declare function clone(v: VectorArray): VectorArray;
declare function set<T extends VectorArray>(out: T, a: number, b: number): T;
declare function add<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;
declare function scaleAndAdd<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray, a: number): T;
declare function sub<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;
declare function len(v: VectorArray): number;
declare const length: typeof len;
declare function lenSquare(v: VectorArray): number;
declare const lengthSquare: typeof lenSquare;
declare function mul<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;
declare function div<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;
declare function dot(v1: VectorArray, v2: VectorArray): number;
declare function scale<T extends VectorArray>(out: T, v: VectorArray, s: number): T;
declare function normalize<T extends VectorArray>(out: T, v: VectorArray): T;
declare function distance(v1: VectorArray, v2: VectorArray): number;
declare const dist: typeof distance;
declare function distanceSquare(v1: VectorArray, v2: VectorArray): number;
declare const distSquare: typeof distanceSquare;
declare function negate<T extends VectorArray>(out: T, v: VectorArray): T;
declare function lerp<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray, t: number): T;
declare function applyTransform<T extends VectorArray>(out: T, v: VectorArray, m: MatrixArray): T;
declare function min<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;
declare function max<T extends VectorArray>(out: T, v1: VectorArray, v2: VectorArray): T;

type vector_d_VectorArray = VectorArray;
declare const vector_d_create: typeof create;
declare const vector_d_copy: typeof copy;
declare const vector_d_clone: typeof clone;
declare const vector_d_set: typeof set;
declare const vector_d_add: typeof add;
declare const vector_d_scaleAndAdd: typeof scaleAndAdd;
declare const vector_d_sub: typeof sub;
declare const vector_d_len: typeof len;
declare const vector_d_length: typeof length;
declare const vector_d_lenSquare: typeof lenSquare;
declare const vector_d_lengthSquare: typeof lengthSquare;
declare const vector_d_mul: typeof mul;
declare const vector_d_div: typeof div;
declare const vector_d_dot: typeof dot;
declare const vector_d_scale: typeof scale;
declare const vector_d_normalize: typeof normalize;
declare const vector_d_distance: typeof distance;
declare const vector_d_dist: typeof dist;
declare const vector_d_distanceSquare: typeof distanceSquare;
declare const vector_d_distSquare: typeof distSquare;
declare const vector_d_negate: typeof negate;
declare const vector_d_lerp: typeof lerp;
declare const vector_d_applyTransform: typeof applyTransform;
declare const vector_d_min: typeof min;
declare const vector_d_max: typeof max;
declare namespace vector_d {
  export {
    vector_d_VectorArray as VectorArray,
    vector_d_create as create,
    vector_d_copy as copy,
    vector_d_clone as clone,
    vector_d_set as set,
    vector_d_add as add,
    vector_d_scaleAndAdd as scaleAndAdd,
    vector_d_sub as sub,
    vector_d_len as len,
    vector_d_length as length,
    vector_d_lenSquare as lenSquare,
    vector_d_lengthSquare as lengthSquare,
    vector_d_mul as mul,
    vector_d_div as div,
    vector_d_dot as dot,
    vector_d_scale as scale,
    vector_d_normalize as normalize,
    vector_d_distance as distance,
    vector_d_dist as dist,
    vector_d_distanceSquare as distanceSquare,
    vector_d_distSquare as distSquare,
    vector_d_negate as negate,
    vector_d_lerp as lerp,
    vector_d_applyTransform as applyTransform,
    vector_d_min as min,
    vector_d_max as max,
  };
}

declare type MatrixArray = number[];
declare function create$1(): MatrixArray;
declare function identity(out: MatrixArray): MatrixArray;
declare function copy$1(out: MatrixArray, m: MatrixArray): MatrixArray;
declare function mul$1(out: MatrixArray, m1: MatrixArray, m2: MatrixArray): MatrixArray;
declare function translate(out: MatrixArray, a: MatrixArray, v: VectorArray): MatrixArray;
declare function rotate(out: MatrixArray, a: MatrixArray, rad: number): MatrixArray;
declare function scale$1(out: MatrixArray, a: MatrixArray, v: VectorArray): MatrixArray;
declare function invert(out: MatrixArray, a: MatrixArray): MatrixArray;
declare function clone$1(a: MatrixArray): MatrixArray;

type matrix_d_MatrixArray = MatrixArray;
declare const matrix_d_identity: typeof identity;
declare const matrix_d_translate: typeof translate;
declare const matrix_d_rotate: typeof rotate;
declare const matrix_d_invert: typeof invert;
declare namespace matrix_d {
  export {
    matrix_d_MatrixArray as MatrixArray,
    create$1 as create,
    matrix_d_identity as identity,
    copy$1 as copy,
    mul$1 as mul,
    matrix_d_translate as translate,
    matrix_d_rotate as rotate,
    scale$1 as scale,
    matrix_d_invert as invert,
    clone$1 as clone,
  };
}

interface PointLike {
    x: number;
    y: number;
}
declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    copy(other: PointLike): this;
    clone(): Point;
    set(x: number, y: number): this;
    equal(other: PointLike): boolean;
    add(other: PointLike): this;
    scale(scalar: number): void;
    scaleAndAdd(other: PointLike, scalar: number): void;
    sub(other: PointLike): this;
    dot(other: PointLike): number;
    len(): number;
    lenSquare(): number;
    normalize(): this;
    distance(other: PointLike): number;
    distanceSquare(other: Point): number;
    negate(): this;
    transform(m: MatrixArray): this;
    toArray(out: number[]): number[];
    fromArray(input: number[]): void;
    static set(p: PointLike, x: number, y: number): void;
    static copy(p: PointLike, p2: PointLike): void;
    static len(p: PointLike): number;
    static lenSquare(p: PointLike): number;
    static dot(p0: PointLike, p1: PointLike): number;
    static add(out: PointLike, p0: PointLike, p1: PointLike): void;
    static sub(out: PointLike, p0: PointLike, p1: PointLike): void;
    static scale(out: PointLike, p0: PointLike, scalar: number): void;
    static scaleAndAdd(out: PointLike, p0: PointLike, p1: PointLike, scalar: number): void;
    static lerp(out: PointLike, p0: PointLike, p1: PointLike, t: number): void;
}

declare class BoundingRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    union(other: BoundingRect): void;
    applyTransform(m: MatrixArray): void;
    calculateTransform(b: RectLike): MatrixArray;
    intersect(b: RectLike, mtv?: PointLike): boolean;
    contain(x: number, y: number): boolean;
    clone(): BoundingRect;
    copy(other: RectLike): void;
    plain(): RectLike;
    isFinite(): boolean;
    isZero(): boolean;
    static create(rect: RectLike): BoundingRect;
    static copy(target: RectLike, source: RectLike): void;
    static applyTransform(target: RectLike, source: RectLike, m: MatrixArray): void;
}
declare type RectLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};

declare type Dictionary<T> = {
    [key: string]: T;
};
declare type ArrayLike$1<T> = {
    [key: number]: T;
    length: number;
};
declare type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
declare type TextVerticalAlign = 'top' | 'middle' | 'bottom';
declare type TextAlign = 'left' | 'center' | 'right';
declare type BuiltinTextPosition = 'left' | 'right' | 'top' | 'bottom' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideTopRight' | 'insideBottomLeft' | 'insideBottomRight';
declare type ZREventProperties = {
    zrX: number;
    zrY: number;
    zrDelta: number;
    zrEventControl: 'no_globalout' | 'only_globalout';
    zrByTouch: boolean;
};
declare type ZRRawMouseEvent = MouseEvent & ZREventProperties;
declare type ZRRawTouchEvent = TouchEvent & ZREventProperties;
declare type ZRRawPointerEvent = TouchEvent & ZREventProperties;
declare type ZRRawEvent = ZRRawMouseEvent | ZRRawTouchEvent | ZRRawPointerEvent;
declare type ElementEventName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' | 'mouseover' | 'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu' | 'drag' | 'dragstart' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop';
declare type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
declare type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
declare type MapToType<T extends Dictionary<any>, S> = {
    [P in keyof T]: T[P] extends Dictionary<any> ? MapToType<T[P], S> : S;
};
declare type KeyOfDistributive<T> = T extends unknown ? keyof T : never;

declare type easingFunc = (percent: number) => number;
declare type AnimationEasing = keyof typeof easing | easingFunc | 'spline';
declare const easing: {
    linear(k: number): number;
    quadraticIn(k: number): number;
    quadraticOut(k: number): number;
    quadraticInOut(k: number): number;
    cubicIn(k: number): number;
    cubicOut(k: number): number;
    cubicInOut(k: number): number;
    quarticIn(k: number): number;
    quarticOut(k: number): number;
    quarticInOut(k: number): number;
    quinticIn(k: number): number;
    quinticOut(k: number): number;
    quinticInOut(k: number): number;
    sinusoidalIn(k: number): number;
    sinusoidalOut(k: number): number;
    sinusoidalInOut(k: number): number;
    exponentialIn(k: number): number;
    exponentialOut(k: number): number;
    exponentialInOut(k: number): number;
    circularIn(k: number): number;
    circularOut(k: number): number;
    circularInOut(k: number): number;
    elasticIn(k: number): number;
    elasticOut(k: number): number;
    elasticInOut(k: number): number;
    backIn(k: number): number;
    backOut(k: number): number;
    backInOut(k: number): number;
    bounceIn(k: number): number;
    bounceOut(k: number): number;
    bounceInOut(k: number): number;
};

declare type EventCallback<Ctx, Impl, EvtParam = unknown> = (this: CbThis<Ctx, Impl>, eventParam?: EvtParam, ...args: unknown[]) => boolean | void;
declare type EventQuery = string | Object;
declare type CbThis<Ctx, Impl> = unknown extends Ctx ? Impl : Ctx;
declare type DefaultEventDefinition = {
    [eventName: string]: unknown;
};
interface EventProcessor<EvtDef = DefaultEventDefinition> {
    normalizeQuery?: (query: EventQuery) => EventQuery;
    filter?: (eventType: keyof EvtDef, query: EventQuery) => boolean;
    afterTrigger?: (eventType: keyof EvtDef) => void;
}
declare class Eventful<EvtDef = DefaultEventDefinition> {
    private _$handlers;
    protected _$eventProcessor: EventProcessor<EvtDef>;
    constructor(eventProcessors?: EventProcessor<EvtDef>);
    on<Ctx, EvtNm extends keyof EvtDef>(event: EvtNm, handler: EventCallback<Ctx, this, EvtDef[EvtNm]>, context?: Ctx): this;
    on<Ctx, EvtNm extends keyof EvtDef>(event: EvtNm, query: EventQuery, handler: EventCallback<Ctx, this, EvtDef[EvtNm]>, context?: Ctx): this;
    isSilent(eventName: keyof EvtDef): boolean;
    off(eventType?: keyof EvtDef, handler?: Function): this;
    trigger(eventType: keyof EvtDef, eventParam?: EvtDef[keyof EvtDef], ...args: any[]): this;
    triggerWithContext(type: keyof EvtDef): this;
}

interface Stage {
    update?: () => void;
}
declare type OnframeCallback = (deltaTime: number) => void;
interface AnimationOption {
    stage?: Stage;
    onframe?: OnframeCallback;
}
declare class Animation extends Eventful {
    stage: Stage;
    onframe: OnframeCallback;
    private _clipsHead;
    private _clipsTail;
    private _running;
    private _time;
    private _pausedTime;
    private _pauseStart;
    private _paused;
    constructor(opts?: AnimationOption);
    addClip(clip: Clip): void;
    addAnimator(animator: Animator<any>): void;
    removeClip(clip: Clip): void;
    removeAnimator(animator: Animator<any>): void;
    update(notTriggerFrameAndStageUpdate?: boolean): void;
    _startLoop(): void;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    clear(): void;
    isFinished(): boolean;
    animate<T>(target: T, options: {
        loop?: boolean;
    }): Animator<T>;
}

declare type OnframeCallback$1 = (percent: number) => void;
declare type ondestroyCallback = () => void;
declare type onrestartCallback = () => void;
interface ClipProps {
    life?: number;
    delay?: number;
    loop?: boolean;
    gap?: number;
    easing?: AnimationEasing;
    onframe?: OnframeCallback$1;
    ondestroy?: ondestroyCallback;
    onrestart?: onrestartCallback;
}
declare class Clip {
    private _life;
    private _delay;
    private _initialized;
    private _startTime;
    private _pausedTime;
    private _paused;
    animation: Animation;
    loop: boolean;
    gap: number;
    easing: AnimationEasing;
    next: Clip;
    prev: Clip;
    onframe: OnframeCallback$1;
    ondestroy: ondestroyCallback;
    onrestart: onrestartCallback;
    constructor(opts: ClipProps);
    step(globalTime: number, deltaTime: number): boolean;
    private _restart;
    pause(): void;
    resume(): void;
}

declare type Keyframe = {
    time: number;
    value: unknown;
    percent: number;
    additiveValue?: unknown;
};
declare class Track {
    keyframes: Keyframe[];
    maxTime: number;
    propName: string;
    useSpline: boolean;
    arrDim: number;
    isValueColor: boolean;
    interpolable: boolean;
    private _finished;
    private _needsSort;
    private _isAllValueEqual;
    private _additiveTrack;
    private _additiveValue;
    private _lastFrame;
    private _lastFramePercent;
    constructor(propName: string);
    isFinished(): boolean;
    setFinished(): void;
    needsAnimate(): boolean;
    getAdditiveTrack(): Track;
    addKeyframe(time: number, value: unknown): {
        time: number;
        value: unknown;
        percent: number;
    };
    prepare(additiveTrack?: Track): void;
    step(target: any, percent: number): void;
    private _addToTarget;
}
declare type DoneCallback = () => void;
declare type AbortCallback = () => void;
declare type OnframeCallback$2<T> = (target: T, percent: number) => void;
declare class Animator<T> {
    animation?: Animation;
    targetName?: string;
    scope?: string;
    __fromStateTransition?: string;
    private _tracks;
    private _trackKeys;
    private _target;
    private _loop;
    private _delay;
    private _maxTime;
    private _paused;
    private _started;
    private _additiveAnimators;
    private _doneList;
    private _onframeList;
    private _abortedList;
    private _clip;
    constructor(target: T, loop: boolean, additiveTo?: Animator<any>[]);
    getTarget(): T;
    changeTarget(target: T): void;
    when(time: number, props: Dictionary<any>): this;
    whenWithKeys(time: number, props: Dictionary<any>, propNames: string[]): this;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
    private _doneCallback;
    private _abortedCallback;
    private _setTracksFinished;
    private _getAdditiveTrack;
    start(easing?: AnimationEasing, forceAnimate?: boolean): this;
    stop(forwardToLast?: boolean): void;
    delay(time: number): this;
    during(cb: OnframeCallback$2<T>): this;
    done(cb: DoneCallback): this;
    aborted(cb: AbortCallback): this;
    getClip(): Clip;
    getTrack(propName: string): Track;
    stopTracks(propNames: string[], forwardToLast?: boolean): boolean;
    saveFinalToTarget(target: T, trackKeys?: readonly string[]): void;
    __changeFinalValue(finalProps: Dictionary<any>, trackKeys?: readonly string[]): void;
}

interface CommonStyleProps {
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowColor?: string;
    opacity?: number;
    blend?: string;
}
interface DisplayableProps extends ElementProps {
    style?: Dictionary<any>;
    zlevel?: number;
    z?: number;
    z2?: number;
    culling?: boolean;
    cursor?: string;
    rectHover?: boolean;
    progressive?: boolean;
    incremental?: boolean;
    batch?: boolean;
    invisible?: boolean;
}
declare type DisplayableKey = keyof DisplayableProps;
declare type DisplayablePropertyType = PropType<DisplayableProps, DisplayableKey>;
declare type DisplayableStatePropNames = ElementStatePropNames | 'style' | 'z' | 'z2' | 'invisible';
declare type DisplayableState = Pick<DisplayableProps, DisplayableStatePropNames> & ElementCommonState;
interface Displayable<Props extends DisplayableProps = DisplayableProps> {
    animate(key?: '', loop?: boolean): Animator<this>;
    animate(key: 'style', loop?: boolean): Animator<this['style']>;
    getState(stateName: string): DisplayableState;
    ensureState(stateName: string): DisplayableState;
    states: Dictionary<DisplayableState>;
    stateProxy: (stateName: string) => DisplayableState;
}
declare class Displayable<Props extends DisplayableProps = DisplayableProps> extends Element<Props> {
    invisible: boolean;
    z: number;
    z2: number;
    zlevel: number;
    culling: boolean;
    cursor: string;
    rectHover: boolean;
    incremental: boolean;
    style: Dictionary<any>;
    protected _normalState: DisplayableState;
    protected _rect: BoundingRect;
    protected _paintRect: BoundingRect;
    protected _prevPaintRect: BoundingRect;
    dirtyRectTolerance: number;
    useHoverLayer?: boolean;
    __hoverStyle?: CommonStyleProps;
    __clipPaths?: Path[];
    __canvasFillGradient: CanvasGradient;
    __canvasStrokeGradient: CanvasGradient;
    __canvasFillPattern: CanvasPattern;
    __canvasStrokePattern: CanvasPattern;
    __svgEl: SVGElement;
    constructor(props?: Props);
    protected _init(props?: Props): void;
    beforeBrush(): void;
    afterBrush(): void;
    innerBeforeBrush(): void;
    innerAfterBrush(): void;
    shouldBePainted(viewWidth: number, viewHeight: number, considerClipPath: boolean, considerAncestors: boolean): boolean;
    contain(x: number, y: number): boolean;
    traverse<Context>(cb: (this: Context, el: this) => void, context?: Context): void;
    rectContain(x: number, y: number): boolean;
    getPaintRect(): BoundingRect;
    setPrevPaintRect(paintRect: BoundingRect): void;
    getPrevPaintRect(): BoundingRect;
    animateStyle(loop: boolean): Animator<this["style"]>;
    updateDuringAnimation(targetKey: string): void;
    attrKV(key: DisplayableKey, value: DisplayablePropertyType): void;
    setStyle(obj: Props['style']): this;
    setStyle<T extends keyof Props['style']>(obj: T, value: Props['style'][T]): this;
    dirtyStyle(): void;
    dirty(): void;
    styleChanged(): boolean;
    styleUpdated(): void;
    createStyle(obj?: Props['style']): Props["style"];
    useStyle(obj: Props['style']): void;
    isStyleObject(obj: Props['style']): any;
    protected _innerSaveToNormal(toState: DisplayableState): void;
    protected _applyStateObj(stateName: string, state: DisplayableState, normalState: DisplayableState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig): void;
    protected _mergeStates(states: DisplayableState[]): DisplayableState;
    protected _mergeStyle(targetStyle: CommonStyleProps, sourceStyle: CommonStyleProps): CommonStyleProps;
    getAnimationStyleProps(): MapToType<DisplayableProps, boolean>;
    static STYLE_CHANGED_BIT: number;
    protected static initDefaultProps: void;
}

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
    dpr?: number;
}
declare class PathProxy {
    dpr: number;
    data: number[] | Float32Array;
    private _version;
    private _saveData;
    private _ctx;
    private _xi;
    private _yi;
    private _x0;
    private _y0;
    private _len;
    private _pathSegLen;
    private _pathLen;
    private _ux;
    private _uy;
    private _lineDash;
    private _needsDash;
    private _dashOffset;
    private _dashIdx;
    private _dashSum;
    static CMD: {
        M: number;
        L: number;
        C: number;
        Q: number;
        A: number;
        Z: number;
        R: number;
    };
    constructor(notSaveData?: boolean);
    increaseVersion(): void;
    getVersion(): number;
    setScale(sx: number, sy: number, segmentIgnoreThreshold?: number): void;
    setDPR(dpr: number): void;
    setContext(ctx: ExtendedCanvasRenderingContext2D): void;
    getContext(): ExtendedCanvasRenderingContext2D;
    beginPath(): this;
    reset(): void;
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this;
    quadraticCurveTo(x1: number, y1: number, x2: number, y2: number): this;
    arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
    rect(x: number, y: number, w: number, h: number): this;
    closePath(): this;
    fill(ctx: CanvasRenderingContext2D): void;
    stroke(ctx: CanvasRenderingContext2D): void;
    setLineDash(lineDash: number[] | false): this;
    setLineDashOffset(offset: number): this;
    len(): number;
    setData(data: Float32Array | number[]): void;
    appendPath(path: PathProxy | PathProxy[]): void;
    addData(cmd: number, a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number): void;
    _expandData(): void;
    _dashedLineTo(x1: number, y1: number): void;
    _dashedBezierTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    _dashedQuadraticTo(x1: number, y1: number, x2: number, y2: number): void;
    toStatic(): void;
    getBoundingRect(): BoundingRect;
    private _calculateLength;
    rebuildPath(ctx: PathRebuilder, percent: number): void;
    private static initDefaultProps;
}
interface PathRebuilder {
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    bezierCurveTo(x: number, y: number, x2: number, y2: number, x3: number, y3: number): void;
    quadraticCurveTo(x: number, y: number, x2: number, y2: number): void;
    arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, anticlockwise: boolean): void;
    ellipse(cx: number, cy: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise: boolean): void;
    rect(x: number, y: number, width: number, height: number): void;
    closePath(): void;
}

declare type CanvasPatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
interface PatternObject {
    id?: number;
    type: 'pattern';
    image: ImageLike | string;
    svgElement: SVGElement;
    svgWidth: number;
    svgHeight: number;
    repeat: CanvasPatternRepeat;
    x?: number;
    y?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    __image?: ImageLike;
}

interface GradientObject {
    id?: number;
    type: string;
    colorStops: GradientColorStop[];
    __canvasGradient: CanvasGradient;
}
interface GradientColorStop {
    offset: number;
    color: string;
}
declare class Gradient {
    id?: number;
    type: string;
    colorStops: GradientColorStop[];
    __canvasGradient: CanvasGradient;
    constructor(colorStops: GradientColorStop[]);
    addColorStop(offset: number, color: string): void;
}

interface LinearGradientObject extends GradientObject {
    type: 'linear';
    x: number;
    y: number;
    x2: number;
    y2: number;
    global: boolean;
}
declare class LinearGradient extends Gradient {
    type: 'linear';
    x: number;
    y: number;
    x2: number;
    y2: number;
    global: boolean;
    constructor(x: number, y: number, x2: number, y2: number, colorStops?: GradientColorStop[], globalCoord?: boolean);
}

interface RadialGradientObject extends GradientObject {
    type: 'radial';
    x: number;
    y: number;
    r: number;
    global: boolean;
}
declare class RadialGradient extends Gradient {
    type: 'radial';
    x: number;
    y: number;
    r: number;
    global: boolean;
    constructor(x: number, y: number, r: number, colorStops?: GradientColorStop[], globalCoord?: boolean);
}

interface PathStyleProps extends CommonStyleProps {
    fill?: string | PatternObject | LinearGradientObject | RadialGradientObject;
    stroke?: string | PatternObject | LinearGradientObject | RadialGradientObject;
    decal?: PatternObject;
    strokePercent?: number;
    strokeNoScale?: boolean;
    fillOpacity?: number;
    strokeOpacity?: number;
    lineDash?: false | number[] | 'solid' | 'dashed' | 'dotted';
    lineDashOffset?: number;
    lineWidth?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    miterLimit?: number;
    strokeFirst?: boolean;
}
interface PathProps extends DisplayableProps {
    strokeContainThreshold?: number;
    segmentIgnoreThreshold?: number;
    subPixelOptimize?: boolean;
    style?: PathStyleProps;
    shape?: Dictionary<any>;
    autoBatch?: boolean;
    __value?: (string | number)[] | (string | number);
    buildPath?: (ctx: PathProxy | CanvasRenderingContext2D, shapeCfg: Dictionary<any>, inBundle?: boolean) => void;
}
declare type PathKey = keyof PathProps;
declare type PathPropertyType = PropType<PathProps, PathKey>;
declare type PathStatePropNames = DisplayableStatePropNames | 'shape';
declare type PathState = Pick<PathProps, PathStatePropNames> & {
    hoverLayer?: boolean;
};
interface Path<Props extends PathProps = PathProps> {
    animate(key?: '', loop?: boolean): Animator<this>;
    animate(key: 'style', loop?: boolean): Animator<this['style']>;
    animate(key: 'shape', loop?: boolean): Animator<this['shape']>;
    getState(stateName: string): PathState;
    ensureState(stateName: string): PathState;
    states: Dictionary<PathState>;
    stateProxy: (stateName: string) => PathState;
}
declare class Path<Props extends PathProps = PathProps> extends Displayable<Props> {
    path: PathProxy;
    strokeContainThreshold: number;
    segmentIgnoreThreshold: number;
    subPixelOptimize: boolean;
    style: PathStyleProps;
    autoBatch: boolean;
    private _rectWithStroke;
    protected _normalState: PathState;
    protected _decalEl: Path;
    shape: Dictionary<any>;
    constructor(opts?: Props);
    update(): void;
    getDecalElement(): Path<PathProps>;
    protected _init(props?: Props): void;
    protected getDefaultStyle(): Props['style'];
    protected getDefaultShape(): {};
    protected canBeInsideText(): boolean;
    protected getInsideTextFill(): "#333" | "#ccc" | "#eee";
    protected getInsideTextStroke(textFill?: string): string;
    buildPath(ctx: PathProxy | CanvasRenderingContext2D, shapeCfg: Dictionary<any>, inBundle?: boolean): void;
    pathUpdated(): void;
    createPathProxy(): void;
    hasStroke(): boolean;
    hasFill(): boolean;
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
    dirtyShape(): void;
    dirty(): void;
    animateShape(loop: boolean): Animator<this["shape"]>;
    updateDuringAnimation(targetKey: string): void;
    attrKV(key: PathKey, value: PathPropertyType): void;
    setShape(obj: Props['shape']): this;
    setShape<T extends keyof Props['shape']>(obj: T, value: Props['shape'][T]): this;
    shapeChanged(): boolean;
    createStyle(obj?: Props['style']): Props["style"];
    protected _innerSaveToNormal(toState: PathState): void;
    protected _applyStateObj(stateName: string, state: PathState, normalState: PathState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig): void;
    protected _mergeStates(states: PathState[]): PathState;
    getAnimationStyleProps(): MapToType<PathProps, boolean>;
    isZeroArea(): boolean;
    static extend<Shape extends Dictionary<any>>(defaultProps: {
        type?: string;
        shape?: Shape;
        style?: PathStyleProps;
        beforeBrush?: Displayable['beforeBrush'];
        afterBrush?: Displayable['afterBrush'];
        getBoundingRect?: Displayable['getBoundingRect'];
        calculateTextPosition?: Element['calculateTextPosition'];
        buildPath(this: Path, ctx: CanvasRenderingContext2D | PathProxy, shape: Shape, inBundle?: boolean): void;
        init?(this: Path, opts: PathProps): void;
    }): {
        new (opts?: PathProps & {
            shape: Shape;
        }): Path;
    };
    static SHAPE_CHANGED_BIT: number;
    protected static initDefaultProps: void;
}

declare class Transformable {
    parent: Transformable;
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    originX: number;
    originY: number;
    globalScaleRatio: number;
    transform: MatrixArray;
    invTransform: MatrixArray;
    setPosition(arr: number[]): void;
    setScale(arr: number[]): void;
    setOrigin(arr: number[]): void;
    needLocalTransform(): boolean;
    updateTransform(): void;
    private _resolveGlobalScaleRatio;
    getLocalTransform(m?: MatrixArray): MatrixArray;
    getComputedTransform(): MatrixArray;
    setLocalTransform(m: VectorArray): void;
    decomposeTransform(): void;
    getGlobalScale(out?: VectorArray): VectorArray;
    transformCoordToLocal(x: number, y: number): number[];
    transformCoordToGlobal(x: number, y: number): number[];
    getLineScale(): number;
    static getLocalTransform(target: Transformable, m?: MatrixArray): MatrixArray;
    private static initDefaultProps;
}

interface ImageStyleProps extends CommonStyleProps {
    image?: string | ImageLike;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;
}
interface ImageProps extends DisplayableProps {
    style?: ImageStyleProps;
    onload?: (image: ImageLike) => void;
}
declare class ZRImage extends Displayable<ImageProps> {
    style: ImageStyleProps;
    __image: ImageLike;
    __imageSrc: string;
    onload: (image: ImageLike) => void;
    createStyle(obj?: ImageStyleProps): ImageStyleProps;
    private _getSize;
    getWidth(): number;
    getHeight(): number;
    getAnimationStyleProps(): MapToType<ImageProps, boolean>;
    getBoundingRect(): BoundingRect;
}

interface PainterBase {
    type: string;
    root: HTMLElement;
    resize(width?: number | string, height?: number | string): void;
    refresh(): void;
    clear(): void;
    getViewportRoot(): HTMLElement;
    getType: () => string;
    getWidth(): number;
    getHeight(): number;
    dispose(): void;
    getViewportRoot: () => HTMLElement;
    getViewportRootOffset: () => {
        offsetLeft: number;
        offsetTop: number;
    };
    refreshHover(): void;
    pathToImage(e: Path, dpr: number): ZRImage;
    configLayer(zlevel: number, config: Dictionary<any>): void;
    setBackgroundColor(backgroundColor: string | GradientObject | PatternObject): void;
}

interface HandlerProxyInterface extends Eventful {
    handler: Handler;
    dispose: () => void;
    setCursor: (cursorStyle?: string) => void;
}

declare function shapeCompareFunc(a: Displayable, b: Displayable): number;
declare class Storage {
    private _roots;
    private _displayList;
    private _displayListLen;
    traverse<T>(cb: (this: T, el: Element) => void, context?: T): void;
    getDisplayList(update?: boolean, includeIgnore?: boolean): Displayable[];
    updateDisplayList(includeIgnore?: boolean): void;
    private _updateAndAddDisplayable;
    addRoot(el: Element): void;
    delRoot(el: Element | Element[]): void;
    delAllRoots(): void;
    getRoots(): Element<ElementProps>[];
    dispose(): void;
    displayableSortFunc: typeof shapeCompareFunc;
}

declare class HoveredResult {
    x: number;
    y: number;
    target: Displayable;
    topTarget: Displayable;
    constructor(x?: number, y?: number);
}
declare type HandlerName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' | 'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu';
declare class Handler extends Eventful {
    storage: Storage;
    painter: PainterBase;
    painterRoot: HTMLElement;
    proxy: HandlerProxyInterface;
    private _hovered;
    private _gestureMgr;
    private _draggingMgr;
    _downEl: Element;
    _upEl: Element;
    _downPoint: [number, number];
    constructor(storage: Storage, painter: PainterBase, proxy: HandlerProxyInterface, painterRoot: HTMLElement);
    setHandlerProxy(proxy: HandlerProxyInterface): void;
    mousemove(event: ZRRawEvent): void;
    mouseout(event: ZRRawEvent): void;
    resize(): void;
    dispatch(eventName: HandlerName, eventArgs?: any): void;
    dispose(): void;
    setCursorStyle(cursorStyle: string): void;
    dispatchToElement(targetInfo: {
        target?: Element;
        topTarget?: Element;
    }, eventName: ElementEventName, event: ZRRawEvent): void;
    findHover(x: number, y: number, exclude?: Displayable): HoveredResult;
    processGesture(event: ZRRawEvent, stage?: 'start' | 'end' | 'change'): void;
    click: (event: ZRRawEvent) => void;
    mousedown: (event: ZRRawEvent) => void;
    mouseup: (event: ZRRawEvent) => void;
    mousewheel: (event: ZRRawEvent) => void;
    dblclick: (event: ZRRawEvent) => void;
    contextmenu: (event: ZRRawEvent) => void;
}

interface LayerConfig {
    clearColor?: string | GradientObject | PatternObject;
    motionBlur?: boolean;
    lastFrameAlpha?: number;
}

interface TSpanStyleProps extends PathStyleProps {
    x?: number;
    y?: number;
    text?: string;
    font?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}
interface TSpanProps extends DisplayableProps {
    style?: TSpanStyleProps;
}
declare class TSpan extends Displayable<TSpanProps> {
    style: TSpanStyleProps;
    hasStroke(): boolean;
    hasFill(): boolean;
    createStyle(obj?: TSpanStyleProps): TSpanStyleProps;
    setBoundingRect(rect: BoundingRect): void;
    getBoundingRect(): BoundingRect;
    protected static initDefaultProps: void;
}

/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/

declare type PainterBaseCtor = {
    new (dom: HTMLElement, storage: Storage, ...args: any[]): PainterBase;
};
declare class ZRender {
    dom: HTMLElement;
    id: number;
    storage: Storage;
    painter: PainterBase;
    handler: Handler;
    animation: Animation;
    private _sleepAfterStill;
    private _stillFrameAccum;
    private _needsRefresh;
    private _needsRefreshHover;
    private _darkMode;
    private _backgroundColor;
    constructor(id: number, dom: HTMLElement, opts?: ZRenderInitOpt);
    add(el: Element): void;
    remove(el: Element): void;
    configLayer(zLevel: number, config: LayerConfig): void;
    setBackgroundColor(backgroundColor: string | GradientObject | PatternObject): void;
    getBackgroundColor(): string | GradientObject | PatternObject;
    setDarkMode(darkMode: boolean): void;
    isDarkMode(): boolean;
    refreshImmediately(fromInside?: boolean): void;
    refresh(): void;
    flush(): void;
    private _flush;
    setSleepAfterStill(stillFramesCount: number): void;
    wakeUp(): void;
    addHover(el: Displayable): void;
    removeHover(el: Path | TSpan | ZRImage): void;
    clearHover(): void;
    refreshHover(): void;
    refreshHoverImmediately(): void;
    resize(opts?: {
        width?: number | string;
        height?: number | string;
    }): void;
    clearAnimation(): void;
    getWidth(): number;
    getHeight(): number;
    pathToImage(e: Path, dpr: number): ZRImage;
    setCursorStyle(cursorStyle: string): void;
    findHover(x: number, y: number): {
        target: Displayable;
        topTarget: Displayable;
    };
    on<Ctx>(eventName: ElementEventName, eventHandler: ElementEventCallback<Ctx, unknown>, context?: Ctx): this;
    on<Ctx>(eventName: string, eventHandler: EventCallback<Ctx, unknown>, context?: Ctx): this;
    off(eventName?: string, eventHandler?: EventCallback<unknown, unknown> | EventCallback<unknown, unknown, ElementEvent>): void;
    trigger(eventName: string, event?: unknown): void;
    clear(): void;
    dispose(): void;
}
interface ZRenderInitOpt {
    renderer?: string;
    devicePixelRatio?: number;
    width?: number | string;
    height?: number | string;
    useDirtyRect?: boolean;
}
declare function init(dom: HTMLElement, opts?: ZRenderInitOpt): ZRender;
declare function dispose(zr: ZRender): void;
declare function disposeAll(): void;
declare function getInstance(id: number): ZRender;
declare function registerPainter(name: string, Ctor: PainterBaseCtor): void;
declare const version = "5.0.3";
interface ZRenderType extends ZRender {
}

type zrender_d_ZRenderInitOpt = ZRenderInitOpt;
declare const zrender_d_init: typeof init;
declare const zrender_d_dispose: typeof dispose;
declare const zrender_d_disposeAll: typeof disposeAll;
declare const zrender_d_getInstance: typeof getInstance;
declare const zrender_d_registerPainter: typeof registerPainter;
declare const zrender_d_version: typeof version;
type zrender_d_ZRenderType = ZRenderType;
declare namespace zrender_d {
  export {
    zrender_d_ZRenderInitOpt as ZRenderInitOpt,
    zrender_d_init as init,
    zrender_d_dispose as dispose,
    zrender_d_disposeAll as disposeAll,
    zrender_d_getInstance as getInstance,
    zrender_d_registerPainter as registerPainter,
    zrender_d_version as version,
    zrender_d_ZRenderType as ZRenderType,
  };
}

declare class RectShape {
    r?: number | number[];
    x: number;
    y: number;
    width: number;
    height: number;
}
interface RectProps extends PathProps {
    shape?: Partial<RectShape>;
}
declare class Rect extends Path<RectProps> {
    shape: RectShape;
    constructor(opts?: RectProps);
    getDefaultShape(): RectShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: RectShape): void;
    isZeroArea(): boolean;
}

interface TextStylePropsPart {
    text?: string;
    fill?: string;
    stroke?: string;
    opacity?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    lineWidth?: number;
    lineDash?: false | number[];
    lineDashOffset?: number;
    borderDash?: false | number[];
    borderDashOffset?: number;
    font?: string;
    textFont?: string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    fontFamily?: string;
    fontSize?: number | string;
    align?: TextAlign;
    verticalAlign?: TextVerticalAlign;
    lineHeight?: number;
    width?: number | string;
    height?: number;
    tag?: string;
    textShadowColor?: string;
    textShadowBlur?: number;
    textShadowOffsetX?: number;
    textShadowOffsetY?: number;
    backgroundColor?: string | {
        image: ImageLike | string;
    };
    padding?: number | number[];
    margin?: number;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number | number[];
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}
interface TextStyleProps extends TextStylePropsPart {
    text?: string;
    x?: number;
    y?: number;
    width?: number;
    rich?: Dictionary<TextStylePropsPart>;
    overflow?: 'break' | 'breakAll' | 'truncate';
    lineOverflow?: 'truncate';
    ellipsis?: string;
    placeholder?: string;
    truncateMinChar?: number;
}
interface TextProps extends DisplayableProps {
    style?: TextStyleProps;
    zlevel?: number;
    z?: number;
    z2?: number;
    culling?: boolean;
    cursor?: string;
}
declare type TextState = Pick<TextProps, DisplayableStatePropNames> & ElementCommonState;
declare type DefaultTextStyle = Pick<TextStyleProps, 'fill' | 'stroke' | 'align' | 'verticalAlign'> & {
    autoStroke?: boolean;
};
interface ZRText {
    animate(key?: '', loop?: boolean): Animator<this>;
    animate(key: 'style', loop?: boolean): Animator<this['style']>;
    getState(stateName: string): TextState;
    ensureState(stateName: string): TextState;
    states: Dictionary<TextState>;
    stateProxy: (stateName: string) => TextState;
}
declare class ZRText extends Displayable<TextProps> {
    type: string;
    style: TextStyleProps;
    overlap: 'hidden' | 'show' | 'blur';
    attachedTransform: Transformable;
    private _children;
    private _childCursor;
    private _defaultStyle;
    constructor(opts?: TextProps);
    childrenRef(): (ZRImage | TSpan | Rect)[];
    update(): void;
    getComputedTransform(): MatrixArray;
    private _updateSubTexts;
    addSelfToZr(zr: ZRenderType): void;
    removeSelfFromZr(zr: ZRenderType): void;
    getBoundingRect(): BoundingRect;
    setDefaultTextStyle(defaultTextStyle: DefaultTextStyle): void;
    setTextContent(textContent: never): void;
    protected _mergeStyle(targetStyle: TextStyleProps, sourceStyle: TextStyleProps): TextStyleProps;
    private _mergeRich;
    getAnimationStyleProps(): MapToType<TextProps, boolean>;
    private _getOrCreateChild;
    private _updatePlainTexts;
    private _updateRichTexts;
    private _placeToken;
    private _renderBackground;
    static makeFont(style: TextStylePropsPart): string;
}

interface TextPositionCalculationResult {
    x: number;
    y: number;
    align: TextAlign;
    verticalAlign: TextVerticalAlign;
}

declare class PolylineShape {
    points: VectorArray[];
    percent?: number;
    smooth?: number | 'spline';
    smoothConstraint?: VectorArray[];
}
interface PolylineProps extends PathProps {
    shape?: Partial<PolylineShape>;
}
declare class Polyline extends Path<PolylineProps> {
    shape: PolylineShape;
    constructor(opts?: PolylineProps);
    getDefaultStyle(): {
        stroke: string;
        fill: string;
    };
    getDefaultShape(): PolylineShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: PolylineShape): void;
}

interface ElementAnimateConfig {
    duration?: number;
    delay?: number;
    easing?: AnimationEasing;
    during?: (percent: number) => void;
    done?: Function;
    aborted?: Function;
    scope?: string;
    force?: boolean;
    additive?: boolean;
    setToFinal?: boolean;
}
interface ElementTextConfig {
    position?: BuiltinTextPosition | (number | string)[];
    rotation?: number;
    layoutRect?: RectLike;
    offset?: number[];
    origin?: (number | string)[] | 'center';
    distance?: number;
    local?: boolean;
    insideFill?: string;
    insideStroke?: string;
    outsideFill?: string;
    outsideStroke?: string;
    inside?: boolean;
}
interface ElementTextGuideLineConfig {
    anchor?: Point;
    showAbove?: boolean;
    candidates?: ('left' | 'top' | 'right' | 'bottom')[];
}
interface ElementEvent {
    type: ElementEventName;
    event: ZRRawEvent;
    target: Element;
    topTarget: Element;
    cancelBubble: boolean;
    offsetX: number;
    offsetY: number;
    gestureEvent: string;
    pinchX: number;
    pinchY: number;
    pinchScale: number;
    wheelDelta: number;
    zrByTouch: boolean;
    which: number;
    stop: (this: ElementEvent) => void;
}
declare type ElementEventCallback<Ctx, Impl> = (this: CbThis$1<Ctx, Impl>, e: ElementEvent) => boolean | void;
declare type CbThis$1<Ctx, Impl> = unknown extends Ctx ? Impl : Ctx;
interface ElementEventHandlerProps {
    onclick: ElementEventCallback<unknown, unknown>;
    ondblclick: ElementEventCallback<unknown, unknown>;
    onmouseover: ElementEventCallback<unknown, unknown>;
    onmouseout: ElementEventCallback<unknown, unknown>;
    onmousemove: ElementEventCallback<unknown, unknown>;
    onmousewheel: ElementEventCallback<unknown, unknown>;
    onmousedown: ElementEventCallback<unknown, unknown>;
    onmouseup: ElementEventCallback<unknown, unknown>;
    oncontextmenu: ElementEventCallback<unknown, unknown>;
    ondrag: ElementEventCallback<unknown, unknown>;
    ondragstart: ElementEventCallback<unknown, unknown>;
    ondragend: ElementEventCallback<unknown, unknown>;
    ondragenter: ElementEventCallback<unknown, unknown>;
    ondragleave: ElementEventCallback<unknown, unknown>;
    ondragover: ElementEventCallback<unknown, unknown>;
    ondrop: ElementEventCallback<unknown, unknown>;
}
interface ElementProps extends Partial<ElementEventHandlerProps> {
    name?: string;
    ignore?: boolean;
    isGroup?: boolean;
    draggable?: boolean | 'horizontal' | 'vertical';
    silent?: boolean;
    ignoreClip?: boolean;
    x?: number;
    y?: number;
    scaleX?: number;
    scaleY?: number;
    originX?: number;
    originY?: number;
    rotation?: number;
    globalScaleRatio?: number;
    textConfig?: ElementTextConfig;
    textContent?: ZRText;
    clipPath?: Path;
    drift?: Element['drift'];
    extra?: Dictionary<unknown>;
    anid?: string;
}
declare const PRIMARY_STATES_KEYS: readonly ["x", "y", "scaleX", "scaleY", "originX", "originY", "rotation", "ignore"];
declare type ElementStatePropNames = (typeof PRIMARY_STATES_KEYS)[number] | 'textConfig';
declare type ElementState = Pick<ElementProps, ElementStatePropNames> & ElementCommonState;
declare type ElementCommonState = {
    hoverLayer?: boolean;
};
interface Element<Props extends ElementProps = ElementProps> extends Transformable, Eventful, ElementEventHandlerProps {
    on<Ctx>(event: ElementEventName, handler: ElementEventCallback<Ctx, this>, context?: Ctx): this;
    on<Ctx>(event: string, handler: EventCallback<Ctx, this>, context?: Ctx): this;
    on<Ctx>(event: ElementEventName, query: EventQuery, handler: ElementEventCallback<Ctx, this>, context?: Ctx): this;
    on<Ctx>(event: string, query: EventQuery, handler: EventCallback<Ctx, this>, context?: Ctx): this;
}
declare class Element<Props extends ElementProps = ElementProps> {
    id: number;
    type: string;
    name: string;
    ignore: boolean;
    silent: boolean;
    isGroup: boolean;
    draggable: boolean | 'horizontal' | 'vertical';
    dragging: boolean;
    parent: Group;
    animators: Animator<any>[];
    ignoreClip: boolean;
    __hostTarget: Element;
    __zr: ZRenderType;
    __dirty: number;
    __isRendered: boolean;
    __inHover: boolean;
    private _clipPath?;
    private _textContent?;
    private _textGuide?;
    textConfig?: ElementTextConfig;
    textGuideLineConfig?: ElementTextGuideLineConfig;
    anid: string;
    extra: Dictionary<unknown>;
    currentStates?: string[];
    prevStates?: string[];
    states: Dictionary<ElementState>;
    stateTransition: ElementAnimateConfig;
    stateProxy?: (stateName: string, targetStates?: string[]) => ElementState;
    protected _normalState: ElementState;
    private _innerTextDefaultStyle;
    constructor(props?: Props);
    protected _init(props?: Props): void;
    drift(dx: number, dy: number, e?: ElementEvent): void;
    beforeUpdate(): void;
    afterUpdate(): void;
    update(): void;
    updateInnerText(forceUpdate?: boolean): void;
    protected canBeInsideText(): boolean;
    protected getInsideTextFill(): string;
    protected getInsideTextStroke(textFill: string): string;
    protected getOutsideFill(): "#333" | "#ccc";
    protected getOutsideStroke(textFill: string): string;
    traverse<Context>(cb: (this: Context, el: Element<Props>) => void, context?: Context): void;
    protected attrKV(key: string, value: unknown): void;
    hide(): void;
    show(): void;
    attr(keyOrObj: Props): this;
    attr<T extends keyof Props>(keyOrObj: T, value: Props[T]): this;
    saveCurrentToNormalState(toState: ElementState): void;
    protected _innerSaveToNormal(toState: ElementState): void;
    protected _savePrimaryToNormal(toState: Dictionary<any>, normalState: Dictionary<any>, primaryKeys: readonly string[]): void;
    hasState(): boolean;
    getState(name: string): ElementState;
    ensureState(name: string): ElementState;
    clearStates(noAnimation?: boolean): void;
    useState(stateName: string, keepCurrentStates?: boolean, noAnimation?: boolean): ElementState;
    useStates(states: string[], noAnimation?: boolean): void;
    private _updateAnimationTargets;
    removeState(state: string): void;
    replaceState(oldState: string, newState: string, forceAdd: boolean): void;
    toggleState(state: string, enable: boolean): void;
    protected _mergeStates(states: ElementState[]): ElementState;
    protected _applyStateObj(stateName: string, state: ElementState, normalState: ElementState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig): void;
    private _attachComponent;
    private _detachComponent;
    getClipPath(): Path<PathProps>;
    setClipPath(clipPath: Path): void;
    removeClipPath(): void;
    getTextContent(): ZRText;
    setTextContent(textEl: ZRText): void;
    setTextConfig(cfg: ElementTextConfig): void;
    removeTextContent(): void;
    getTextGuideLine(): Polyline;
    setTextGuideLine(guideLine: Polyline): void;
    removeTextGuideLine(): void;
    markRedraw(): void;
    dirty(): void;
    private _toggleHoverLayerFlag;
    addSelfToZr(zr: ZRenderType): void;
    removeSelfFromZr(zr: ZRenderType): void;
    animate(key?: string, loop?: boolean): Animator<any>;
    addAnimator(animator: Animator<any>, key: string): void;
    updateDuringAnimation(key: string): void;
    stopAnimation(scope?: string, forwardToLast?: boolean): this;
    animateTo(target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>): void;
    animateFrom(target: Props, cfg: Omit<ElementAnimateConfig, 'setToFinal'>, animationProps?: MapToType<Props, boolean>): void;
    protected _transitionState(stateName: string, target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>): void;
    getBoundingRect(): BoundingRect;
    getPaintRect(): BoundingRect;
    calculateTextPosition: (out: TextPositionCalculationResult, style: ElementTextConfig, rect: RectLike) => TextPositionCalculationResult;
    static REDARAW_BIT: number;
    protected static initDefaultProps: void;
}

interface GroupProps extends ElementProps {
}
declare class Group extends Element<GroupProps> {
    readonly isGroup = true;
    private _children;
    constructor(opts?: GroupProps);
    childrenRef(): Element<ElementProps>[];
    children(): Element<ElementProps>[];
    childAt(idx: number): Element;
    childOfName(name: string): Element;
    childCount(): number;
    add(child: Element): Group;
    addBefore(child: Element, nextSibling: Element): this;
    replaceAt(child: Element, index: number): this;
    _doAdd(child: Element): void;
    remove(child: Element): this;
    removeAll(): this;
    eachChild<Context>(cb: (this: Context, el: Element, index?: number) => void, context?: Context): this;
    traverse<T>(cb: (this: T, el: Element) => boolean | void, context?: T): this;
    addSelfToZr(zr: ZRenderType): void;
    removeSelfFromZr(zr: ZRenderType): void;
    getBoundingRect(includeChildren?: Element[]): BoundingRect;
}

declare const nativeSlice: (start?: number, end?: number) => any[];
declare function $override(name: string, fn: Function): void;
declare function guid(): number;
declare function logError(...args: any[]): void;
declare function clone$2<T extends any>(source: T): T;
declare function merge<T extends Dictionary<any>, S extends Dictionary<any>>(target: T, source: S, overwrite?: boolean): T & S;
declare function merge<T extends any, S extends any>(target: T, source: S, overwrite?: boolean): T | S;
declare function mergeAll(targetAndSources: any[], overwrite?: boolean): any;
declare function extend<T extends Dictionary<any>, S extends Dictionary<any>>(target: T, source: S): T & S;
declare function defaults<T extends Dictionary<any>, S extends Dictionary<any>>(target: T, source: S, overlay?: boolean): T & S;
declare const createCanvas: () => HTMLCanvasElement;
declare function indexOf<T>(array: T[] | readonly T[] | ArrayLike$1<T>, value: T): number;
declare function inherits(clazz: Function, baseClazz: Function): void;
declare function mixin<T, S>(target: T | Function, source: S | Function, override?: boolean): void;
declare function isArrayLike(data: any): data is ArrayLike$1<any>;
declare function each<I extends Dictionary<any> | any[] | readonly any[] | ArrayLike$1<any>, Context>(arr: I, cb: (this: Context, value: I extends (infer T)[] | readonly (infer T)[] | ArrayLike$1<infer T> ? T : I extends Dictionary<any> ? I extends Record<infer K, infer T> ? T : unknown : unknown, index?: I extends any[] | readonly any[] | ArrayLike$1<any> ? number : keyof I & string, arr?: I) => void, context?: Context): void;
declare function map<T, R, Context>(arr: readonly T[], cb: (this: Context, val: T, index?: number, arr?: readonly T[]) => R, context?: Context): R[];
declare function reduce<T, S, Context>(arr: readonly T[], cb: (this: Context, previousValue: S, currentValue: T, currentIndex?: number, arr?: readonly T[]) => S, memo?: S, context?: Context): S;
declare function filter<T, Context>(arr: readonly T[], cb: (this: Context, value: T, index: number, arr: readonly T[]) => boolean, context?: Context): T[];
declare function find<T, Context>(arr: readonly T[], cb: (this: Context, value: T, index?: number, arr?: readonly T[]) => boolean, context?: Context): T;
declare function keys<T extends object>(obj: T): (KeyOfDistributive<T> & string)[];
declare type Bind1<F, Ctx> = F extends (this: Ctx, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Bind2<F, Ctx, T1> = F extends (this: Ctx, a: T1, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Bind3<F, Ctx, T1, T2> = F extends (this: Ctx, a: T1, b: T2, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Bind4<F, Ctx, T1, T2, T3> = F extends (this: Ctx, a: T1, b: T2, c: T3, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Bind5<F, Ctx, T1, T2, T3, T4> = F extends (this: Ctx, a: T1, b: T2, c: T3, d: T4, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type BindFunc<Ctx> = (this: Ctx, ...arg: any[]) => any;
interface FunctionBind {
    <F extends BindFunc<Ctx>, Ctx>(func: F, ctx: Ctx): Bind1<F, Ctx>;
    <F extends BindFunc<Ctx>, Ctx, T1 extends Parameters<F>[0]>(func: F, ctx: Ctx, a: T1): Bind2<F, Ctx, T1>;
    <F extends BindFunc<Ctx>, Ctx, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1]>(func: F, ctx: Ctx, a: T1, b: T2): Bind3<F, Ctx, T1, T2>;
    <F extends BindFunc<Ctx>, Ctx, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1], T3 extends Parameters<F>[2]>(func: F, ctx: Ctx, a: T1, b: T2, c: T3): Bind4<F, Ctx, T1, T2, T3>;
    <F extends BindFunc<Ctx>, Ctx, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1], T3 extends Parameters<F>[2], T4 extends Parameters<F>[3]>(func: F, ctx: Ctx, a: T1, b: T2, c: T3, d: T4): Bind5<F, Ctx, T1, T2, T3, T4>;
}
declare const bind: FunctionBind;
declare type Curry1<F, T1> = F extends (a: T1, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Curry2<F, T1, T2> = F extends (a: T1, b: T2, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Curry3<F, T1, T2, T3> = F extends (a: T1, b: T2, c: T3, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type Curry4<F, T1, T2, T3, T4> = F extends (a: T1, b: T2, c: T3, d: T4, ...args: infer A) => infer R ? (...args: A) => R : unknown;
declare type CurryFunc = (...arg: any[]) => any;
declare function curry<F extends CurryFunc, T1 extends Parameters<F>[0]>(func: F, a: T1): Curry1<F, T1>;
declare function curry<F extends CurryFunc, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1]>(func: F, a: T1, b: T2): Curry2<F, T1, T2>;
declare function curry<F extends CurryFunc, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1], T3 extends Parameters<F>[2]>(func: F, a: T1, b: T2, c: T3): Curry3<F, T1, T2, T3>;
declare function curry<F extends CurryFunc, T1 extends Parameters<F>[0], T2 extends Parameters<F>[1], T3 extends Parameters<F>[2], T4 extends Parameters<F>[3]>(func: F, a: T1, b: T2, c: T3, d: T4): Curry4<F, T1, T2, T3, T4>;

declare function isArray(value: any): value is any[];
declare function isFunction(value: any): value is Function;
declare function isString(value: any): value is string;
declare function isStringSafe(value: any): value is string;
declare function isNumber(value: any): value is number;
declare function isObject<T = unknown>(value: T): value is (object & T);
declare function isBuiltInObject(value: any): boolean;
declare function isTypedArray(value: any): boolean;
declare function isDom(value: any): value is HTMLElement;
declare function isGradientObject(value: any): value is GradientObject;
declare function isPatternObject(value: any): value is PatternObject;
declare function isRegExp(value: unknown): value is RegExp;
declare function eqNaN(value: any): boolean;
declare function retrieve<T>(...args: T[]): T;
declare function retrieve2<T, R>(value0: T, value1: R): T | R;
declare function retrieve3<T, R, W>(value0: T, value1: R, value2: W): T | R | W;
declare type SliceParams = Parameters<typeof nativeSlice>;
declare function slice<T>(arr: ArrayLike$1<T>, ...args: SliceParams): T[];
declare function normalizeCssArray(val: number | number[]): number[];
declare function assert(condition: any, message?: string): void;
declare function trim(str: string): string;
declare function setAsPrimitive(obj: any): void;
declare function isPrimitive(obj: any): boolean;
declare class HashMap<T, KEY extends string | number = string | number> {
    data: {
        [key in KEY]: T;
    };
    constructor(obj?: HashMap<T, KEY> | Dictionary<T> | any[]);
    get(key: KEY): T;
    set(key: KEY, value: T): T;
    each<Context>(cb: (this: Context, value?: T, key?: KEY) => void, context?: Context): void;
    keys(): KEY[];
    removeKey(key: KEY): void;
}
declare function createHashMap<T, KEY extends string | number = string | number>(obj?: HashMap<T, KEY> | Dictionary<T> | any[]): HashMap<T, KEY>;
declare function concatArray<T, R>(a: ArrayLike$1<T>, b: ArrayLike$1<R>): ArrayLike$1<T | R>;
declare function createObject<T>(proto?: object, properties?: T): T;
declare function hasOwn(own: object, prop: string): boolean;
declare function noop(): void;

declare const util_d_curry: typeof curry;
declare const util_d_$override: typeof $override;
declare const util_d_guid: typeof guid;
declare const util_d_logError: typeof logError;
declare const util_d_merge: typeof merge;
declare const util_d_mergeAll: typeof mergeAll;
declare const util_d_extend: typeof extend;
declare const util_d_defaults: typeof defaults;
declare const util_d_createCanvas: typeof createCanvas;
declare const util_d_indexOf: typeof indexOf;
declare const util_d_inherits: typeof inherits;
declare const util_d_mixin: typeof mixin;
declare const util_d_isArrayLike: typeof isArrayLike;
declare const util_d_each: typeof each;
declare const util_d_map: typeof map;
declare const util_d_reduce: typeof reduce;
declare const util_d_filter: typeof filter;
declare const util_d_find: typeof find;
declare const util_d_keys: typeof keys;
type util_d_Bind1<F, Ctx> = Bind1<F, Ctx>;
type util_d_Bind2<F, Ctx, T1> = Bind2<F, Ctx, T1>;
type util_d_Bind3<F, Ctx, T1, T2> = Bind3<F, Ctx, T1, T2>;
type util_d_Bind4<F, Ctx, T1, T2, T3> = Bind4<F, Ctx, T1, T2, T3>;
type util_d_Bind5<F, Ctx, T1, T2, T3, T4> = Bind5<F, Ctx, T1, T2, T3, T4>;
declare const util_d_bind: typeof bind;
type util_d_Curry1<F, T1> = Curry1<F, T1>;
type util_d_Curry2<F, T1, T2> = Curry2<F, T1, T2>;
type util_d_Curry3<F, T1, T2, T3> = Curry3<F, T1, T2, T3>;
type util_d_Curry4<F, T1, T2, T3, T4> = Curry4<F, T1, T2, T3, T4>;
declare const util_d_isArray: typeof isArray;
declare const util_d_isFunction: typeof isFunction;
declare const util_d_isString: typeof isString;
declare const util_d_isStringSafe: typeof isStringSafe;
declare const util_d_isNumber: typeof isNumber;
declare const util_d_isObject: typeof isObject;
declare const util_d_isBuiltInObject: typeof isBuiltInObject;
declare const util_d_isTypedArray: typeof isTypedArray;
declare const util_d_isDom: typeof isDom;
declare const util_d_isGradientObject: typeof isGradientObject;
declare const util_d_isPatternObject: typeof isPatternObject;
declare const util_d_isRegExp: typeof isRegExp;
declare const util_d_eqNaN: typeof eqNaN;
declare const util_d_retrieve: typeof retrieve;
declare const util_d_retrieve2: typeof retrieve2;
declare const util_d_retrieve3: typeof retrieve3;
declare const util_d_slice: typeof slice;
declare const util_d_normalizeCssArray: typeof normalizeCssArray;
declare const util_d_assert: typeof assert;
declare const util_d_trim: typeof trim;
declare const util_d_setAsPrimitive: typeof setAsPrimitive;
declare const util_d_isPrimitive: typeof isPrimitive;
type util_d_HashMap<T, KEY extends string | number = string | number> = HashMap<T, KEY>;
declare const util_d_HashMap: typeof HashMap;
declare const util_d_createHashMap: typeof createHashMap;
declare const util_d_concatArray: typeof concatArray;
declare const util_d_createObject: typeof createObject;
declare const util_d_hasOwn: typeof hasOwn;
declare const util_d_noop: typeof noop;
declare namespace util_d {
  export {
    util_d_curry as curry,
    util_d_$override as $override,
    util_d_guid as guid,
    util_d_logError as logError,
    clone$2 as clone,
    util_d_merge as merge,
    util_d_mergeAll as mergeAll,
    util_d_extend as extend,
    util_d_defaults as defaults,
    util_d_createCanvas as createCanvas,
    util_d_indexOf as indexOf,
    util_d_inherits as inherits,
    util_d_mixin as mixin,
    util_d_isArrayLike as isArrayLike,
    util_d_each as each,
    util_d_map as map,
    util_d_reduce as reduce,
    util_d_filter as filter,
    util_d_find as find,
    util_d_keys as keys,
    util_d_Bind1 as Bind1,
    util_d_Bind2 as Bind2,
    util_d_Bind3 as Bind3,
    util_d_Bind4 as Bind4,
    util_d_Bind5 as Bind5,
    util_d_bind as bind,
    util_d_Curry1 as Curry1,
    util_d_Curry2 as Curry2,
    util_d_Curry3 as Curry3,
    util_d_Curry4 as Curry4,
    util_d_isArray as isArray,
    util_d_isFunction as isFunction,
    util_d_isString as isString,
    util_d_isStringSafe as isStringSafe,
    util_d_isNumber as isNumber,
    util_d_isObject as isObject,
    util_d_isBuiltInObject as isBuiltInObject,
    util_d_isTypedArray as isTypedArray,
    util_d_isDom as isDom,
    util_d_isGradientObject as isGradientObject,
    util_d_isPatternObject as isPatternObject,
    util_d_isRegExp as isRegExp,
    util_d_eqNaN as eqNaN,
    util_d_retrieve as retrieve,
    util_d_retrieve2 as retrieve2,
    util_d_retrieve3 as retrieve3,
    util_d_slice as slice,
    util_d_normalizeCssArray as normalizeCssArray,
    util_d_assert as assert,
    util_d_trim as trim,
    util_d_setAsPrimitive as setAsPrimitive,
    util_d_isPrimitive as isPrimitive,
    util_d_HashMap as HashMap,
    util_d_createHashMap as createHashMap,
    util_d_concatArray as concatArray,
    util_d_createObject as createObject,
    util_d_hasOwn as hasOwn,
    util_d_noop as noop,
  };
}

declare type AreaStyleProps = Pick<PathStyleProps, 'fill' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'opacity' | 'shadowColor'>;
declare class AreaStyleMixin {
    getAreaStyle(this: Model, excludes?: readonly (keyof AreaStyleOption)[], includes?: readonly (keyof AreaStyleOption)[]): AreaStyleProps;
}

declare type SVGPathOption = Omit<PathProps, 'shape' | 'buildPath'>;
declare class SVGPath extends Path {
    applyTransform(m: MatrixArray): void;
}
declare function extendFromString(str: string, defaultOpts?: SVGPathOption): typeof SVGPath;
declare function mergePath(pathEls: Path[], opts: PathProps): Path<PathProps>;

declare class CircleShape {
    cx: number;
    cy: number;
    r: number;
}
interface CircleProps extends PathProps {
    shape?: Partial<CircleShape>;
}
declare class Circle extends Path<CircleProps> {
    shape: CircleShape;
    constructor(opts?: CircleProps);
    getDefaultShape(): CircleShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: CircleShape, inBundle: boolean): void;
}

declare class EllipseShape {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
}
interface EllipseProps extends PathProps {
    shape?: Partial<EllipseShape>;
}
declare class Ellipse extends Path<EllipseProps> {
    shape: EllipseShape;
    constructor(opts?: EllipseProps);
    getDefaultShape(): EllipseShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: EllipseShape): void;
}

declare class SectorShape {
    cx: number;
    cy: number;
    r0: number;
    r: number;
    startAngle: number;
    endAngle: number;
    clockwise: boolean;
    cornerRadius: number;
    innerCornerRadius: number;
}
interface SectorProps extends PathProps {
    shape?: Partial<SectorShape>;
}
declare class Sector extends Path<SectorProps> {
    shape: SectorShape;
    constructor(opts?: SectorProps);
    getDefaultShape(): SectorShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: SectorShape): void;
    isZeroArea(): boolean;
}

declare class RingShape {
    cx: number;
    cy: number;
    r: number;
    r0: number;
}
interface RingProps extends PathProps {
    shape?: Partial<RingShape>;
}
declare class Ring extends Path<RingProps> {
    shape: RingShape;
    constructor(opts?: RingProps);
    getDefaultShape(): RingShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: RingShape): void;
}

declare class PolygonShape {
    points: VectorArray[];
    smooth?: number | 'spline';
    smoothConstraint?: VectorArray[];
}
interface PolygonProps extends PathProps {
    shape?: Partial<PolygonShape>;
}
declare class Polygon extends Path<PolygonProps> {
    shape: PolygonShape;
    constructor(opts?: PolygonProps);
    getDefaultShape(): PolygonShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: PolygonShape): void;
}

declare class LineShape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    percent: number;
}
interface LineProps extends PathProps {
    shape?: Partial<LineShape>;
}
declare class Line extends Path<LineProps> {
    shape: LineShape;
    constructor(opts?: LineProps);
    getDefaultStyle(): {
        stroke: string;
        fill: string;
    };
    getDefaultShape(): LineShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: LineShape): void;
    pointAt(p: number): VectorArray;
}

declare class BezierCurveShape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cpx1: number;
    cpy1: number;
    cpx2?: number;
    cpy2?: number;
    percent: number;
}
interface BezierCurveProps extends PathProps {
    shape?: Partial<BezierCurveShape>;
}
declare class BezierCurve extends Path<BezierCurveProps> {
    shape: BezierCurveShape;
    constructor(opts?: BezierCurveProps);
    getDefaultStyle(): {
        stroke: string;
        fill: string;
    };
    getDefaultShape(): BezierCurveShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: BezierCurveShape): void;
    pointAt(t: number): number[];
    tangentAt(t: number): number[];
}

declare class ArcShape {
    cx: number;
    cy: number;
    r: number;
    startAngle: number;
    endAngle: number;
    clockwise?: boolean;
}
interface ArcProps extends PathProps {
    shape?: Partial<ArcShape>;
}
declare class Arc extends Path<ArcProps> {
    shape: ArcShape;
    constructor(opts?: ArcProps);
    getDefaultStyle(): {
        stroke: string;
        fill: string;
    };
    getDefaultShape(): ArcShape;
    buildPath(ctx: CanvasRenderingContext2D, shape: ArcShape): void;
}

interface CompoundPathShape {
    paths: Path[];
}
declare class CompoundPath extends Path {
    type: string;
    shape: CompoundPathShape;
    private _updatePathDirty;
    beforeBrush(): void;
    buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: CompoundPathShape): void;
    afterBrush(): void;
    getBoundingRect(): BoundingRect;
}

declare class IncrementalDisplayable extends Displayable {
    notClear: boolean;
    incremental: boolean;
    private _displayables;
    private _temporaryDisplayables;
    private _cursor;
    traverse<T>(cb: (this: T, el: this) => void, context: T): void;
    useStyle(): void;
    getCursor(): number;
    innerAfterBrush(): void;
    clearDisplaybles(): void;
    clearTemporalDisplayables(): void;
    addDisplayable(displayable: Displayable, notPersistent?: boolean): void;
    addDisplayables(displayables: Displayable[], notPersistent?: boolean): void;
    getDisplayables(): Displayable[];
    getTemporalDisplayables(): Displayable[];
    eachPendingDisplayable(cb: (displayable: Displayable) => void): void;
    update(): void;
    getBoundingRect(): BoundingRect;
    contain(x: number, y: number): boolean;
}

declare type ExtendShapeOpt = Parameters<typeof Path.extend>[0];
declare type ExtendShapeReturn = ReturnType<typeof Path.extend>;
declare function extendShape(opts: ExtendShapeOpt): ExtendShapeReturn;
declare const extendPathFromString: typeof extendFromString;
declare type SVGPathOption$1 = Parameters<typeof extendPathFromString>[1];
declare type SVGPathCtor = ReturnType<typeof extendPathFromString>;
declare type SVGPath$1 = InstanceType<SVGPathCtor>;
declare function extendPath(pathData: string, opts: SVGPathOption$1): SVGPathCtor;
declare function registerShape(name: string, ShapeClass: {
    new (): Path;
}): void;
declare function getShapeClass(name: string): {
    new (): Path;
};
declare function makePath(pathData: string, opts: SVGPathOption$1, rect: ZRRectLike, layout?: 'center' | 'cover'): SVGPath$1;
declare function makeImage(imageUrl: string, rect: ZRRectLike, layout?: 'center' | 'cover'): ZRImage;
declare const mergePath$1: typeof mergePath;
declare function resizePath(path: SVGPath$1, rect: ZRRectLike): void;
declare type AnimateOrSetPropsOption = {
    dataIndex?: number;
    cb?: () => void;
    during?: (percent: number) => void;
    removeOpt?: AnimationOption$1;
    isFrom?: boolean;
};
declare function updateProps<Props>(el: Element<Props>, props: Props, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: AnimateOrSetPropsOption['dataIndex'] | AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption, cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'], during?: AnimateOrSetPropsOption['during']): void;

declare function initProps<Props>(el: Element<Props>, props: Props, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: AnimateOrSetPropsOption['dataIndex'] | AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption, cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'], during?: AnimateOrSetPropsOption['during']): void;
declare function getTransform(target: Transformable, ancestor?: Transformable): MatrixArray;
declare function clipPointsByRect(points: VectorArray[], rect: ZRRectLike): number[][];
declare function clipRectByRect(targetRect: ZRRectLike, rect: ZRRectLike): ZRRectLike;
declare function createIcon(iconStr: string, opt?: Omit<DisplayableProps, 'style'>, rect?: ZRRectLike): SVGPath$1 | ZRImage;

declare type LabelFontOption = Pick<LabelOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>;
declare type LabelRectRelatedOption = Pick<LabelOption, 'align' | 'verticalAlign' | 'padding' | 'lineHeight' | 'baseline' | 'rich'> & LabelFontOption;
declare class TextStyleMixin {
    getTextColor(this: Model, isEmphasis?: boolean): ColorString;
    getFont(this: Model<LabelFontOption>): string;
    getTextRect(this: Model<LabelRectRelatedOption> & TextStyleMixin, text: string): BoundingRect;
}

declare type LineStyleKeys = 'lineWidth' | 'stroke' | 'opacity' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowColor' | 'lineDash' | 'lineDashOffset' | 'lineCap' | 'lineJoin' | 'miterLimit';
declare type LineStyleProps = Pick<PathStyleProps, LineStyleKeys>;
declare class LineStyleMixin {
    getLineStyle(this: Model, excludes?: readonly (keyof LineStyleOption)[]): LineStyleProps;
}

declare type ItemStyleKeys = 'fill' | 'stroke' | 'decal' | 'lineWidth' | 'opacity' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowColor' | 'lineDash' | 'lineDashOffset' | 'lineCap' | 'lineJoin' | 'miterLimit';
declare type ItemStyleProps = Pick<PathStyleProps, ItemStyleKeys>;
declare class ItemStyleMixin {
    getItemStyle(this: Model, excludes?: readonly (keyof ItemStyleOption)[], includes?: readonly (keyof ItemStyleOption)[]): ItemStyleProps;
}

interface Model<Opt = ModelOption> extends LineStyleMixin, ItemStyleMixin, TextStyleMixin, AreaStyleMixin {
}
declare class Model<Opt = ModelOption> {
    parentModel: Model;
    ecModel: GlobalModel;
    option: Opt;
    constructor(option?: Opt, parentModel?: Model, ecModel?: GlobalModel);
    init(option: Opt, parentModel?: Model, ecModel?: GlobalModel, ...rest: any): void;
    mergeOption(option: Opt, ecModel?: GlobalModel): void;
    get<R extends keyof Opt>(path: R, ignoreParent?: boolean): Opt[R];
    get<R extends keyof Opt>(path: readonly [R], ignoreParent?: boolean): Opt[R];
    get<R extends keyof Opt, S extends keyof Opt[R]>(path: readonly [R, S], ignoreParent?: boolean): Opt[R][S];
    get<R extends keyof Opt, S extends keyof Opt[R], T extends keyof Opt[R][S]>(path: readonly [R, S, T], ignoreParent?: boolean): Opt[R][S][T];
    getShallow<R extends keyof Opt>(key: R, ignoreParent?: boolean): Opt[R];
    getModel<R extends keyof Opt>(path: R, parentModel?: Model): Model<Opt[R]>;
    getModel<R extends keyof Opt>(path: readonly [R], parentModel?: Model): Model<Opt[R]>;
    getModel<R extends keyof Opt, S extends keyof Opt[R]>(path: readonly [R, S], parentModel?: Model): Model<Opt[R][S]>;
    getModel<Ra extends keyof Opt, Rb extends keyof Opt, S extends keyof Opt[Rb]>(path: readonly [Ra] | readonly [Rb, S], parentModel?: Model): Model<Opt[Ra]> | Model<Opt[Rb][S]>;
    getModel<R extends keyof Opt, S extends keyof Opt[R], T extends keyof Opt[R][S]>(path: readonly [R, S, T], parentModel?: Model): Model<Opt[R][S][T]>;
    isEmpty(): boolean;
    restoreData(): void;
    clone(): Model<Opt>;
    parsePath(path: string | readonly string[]): readonly string[];
    resolveParentPath(path: readonly string[]): string[];
    isAnimationEnabled(): boolean;
    private _doGet;
}

declare type Constructor = new (...args: any) => any;
interface ClassManager {
    registerClass: (clz: Constructor) => Constructor;
    getClass: (componentMainType: ComponentMainType, subType?: ComponentSubType, throwWhenNotFound?: boolean) => Constructor;
    getClassesByMainType: (componentType: ComponentMainType) => Constructor[];
    hasClass: (componentType: ComponentFullType) => boolean;
    getAllClassMainTypes: () => ComponentMainType[];
    hasSubTypes: (componentType: ComponentFullType) => boolean;
}

interface SubTypeDefaulter {
    (option: ComponentOption): ComponentSubType;
}
interface SubTypeDefaulterManager {
    registerSubTypeDefaulter: (componentType: string, defaulter: SubTypeDefaulter) => void;
    determineSubType: (componentType: string, option: ComponentOption) => string;
}

declare type DiffKeyGetter<CTX = unknown> = (this: DataDiffer<CTX>, value: unknown, index: number) => string;
declare type DiffCallbackAdd = (newIndex: number) => void;
declare type DiffCallbackUpdate = (newIndex: number, oldIndex: number) => void;
declare type DiffCallbackRemove = (oldIndex: number) => void;
declare type DiffCallbackUpdateManyToOne = (newIndex: number, oldIndex: number[]) => void;
declare type DiffCallbackUpdateOneToMany = (newIndex: number[], oldIndex: number) => void;
declare type DataDiffMode = 'oneToOne' | 'multiple';
declare class DataDiffer<CTX = unknown> {
    private _old;
    private _new;
    private _oldKeyGetter;
    private _newKeyGetter;
    private _add;
    private _update;
    private _updateManyToOne;
    private _updateOneToMany;
    private _remove;
    private _diffModeMultiple;
    readonly context: CTX;
    constructor(oldArr: ArrayLike$1<unknown>, newArr: ArrayLike$1<unknown>, oldKeyGetter?: DiffKeyGetter<CTX>, newKeyGetter?: DiffKeyGetter<CTX>, context?: CTX, diffMode?: DataDiffMode);
    add(func: DiffCallbackAdd): this;
    update(func: DiffCallbackUpdate): this;
    updateManyToOne(func: DiffCallbackUpdateManyToOne): this;
    updateOneToMany(func: DiffCallbackUpdateOneToMany): this;
    remove(func: DiffCallbackRemove): this;
    execute(): void;
    private _executeOneToOne;
    private _executeMultiple;
    private _performRestAdd;
    private _initIndexMap;
}

declare type PipedDataTransformOption = DataTransformOption[];
declare type DataTransformType = string;
declare type DataTransformConfig = unknown;
interface DataTransformOption {
    type: DataTransformType;
    config: DataTransformConfig;
    print?: boolean;
}
interface ExternalDataTransform<TO extends DataTransformOption = DataTransformOption> {
    type: string;
    __isBuiltIn?: boolean;
    transform: (param: ExternalDataTransformParam<TO>) => ExternalDataTransformResultItem | ExternalDataTransformResultItem[];
}
interface ExternalDataTransformParam<TO extends DataTransformOption = DataTransformOption> {
    upstream: ExternalSource;
    upstreamList: ExternalSource[];
    config: TO['config'];
}
interface ExternalDataTransformResultItem {
    data: OptionSourceDataArrayRows | OptionSourceDataObjectRows;
    dimensions?: DimensionDefinitionLoose[];
}
declare type DataTransformDataItem = ExternalDataTransformResultItem['data'][number];
interface ExternalDimensionDefinition extends Partial<DimensionDefinition> {
    index: DimensionIndex;
}
declare class ExternalSource {
    sourceFormat: SourceFormat;
    getRawData(): Source['data'];
    getRawDataItem(dataIndex: number): DataTransformDataItem;
    cloneRawData(): Source['data'];
    getDimensionInfo(dim: DimensionLoose): ExternalDimensionDefinition;
    cloneAllDimensionInfo(): ExternalDimensionDefinition[];
    count(): number;
    retrieveValue(dataIndex: number, dimIndex: DimensionIndex): OptionDataValue;
    retrieveValueFromItem(dataItem: DataTransformDataItem, dimIndex: DimensionIndex): OptionDataValue;
    convertValue(rawVal: unknown, dimInfo: ExternalDimensionDefinition): ParsedValue;
}
declare function registerExternalTransform(externalTransform: ExternalDataTransform): void;

declare type MorphDividingMethod = 'split' | 'duplicate';

interface PaletteMixin<T extends PaletteOptionMixin = PaletteOptionMixin> extends Pick<Model<T>, 'get'> {
}
declare class PaletteMixin<T extends PaletteOptionMixin = PaletteOptionMixin> {
    getColorFromPalette(this: PaletteMixin<T>, name: string, scope?: any, requestNum?: number): ZRColor;
    clearColorPalette(this: PaletteMixin<T>): void;
}

interface NameMap {
    [regionName: string]: string;
}
interface GeoSpecialAreas {
    [areaName: string]: {
        left: number;
        top: number;
        width?: number;
        height?: number;
    };
}
interface GeoJSON extends GeoJSONFeatureCollection<GeoJSONGeometry> {
}
interface GeoJSONCompressed extends GeoJSONFeatureCollection<GeoJSONGeometryCompressed> {
    UTF8Encoding?: boolean;
    UTF8Scale?: number;
}
interface GeoJSONFeatureCollection<G> {
    type: 'FeatureCollection';
    features: GeoJSONFeature<G>[];
}
interface GeoJSONFeature<G = GeoJSONGeometry> {
    type: 'Feature';
    id?: string | number;
    properties: {
        name?: string;
        cp?: number[];
        [key: string]: any;
    };
    geometry: G;
}
declare type GeoJSONGeometry = GeoJSONGeometryPoint | GeoJSONGeometryMultiPoint | GeoJSONGeometryLineString | GeoJSONGeometryMultiLineString | GeoJSONGeometryPolygon | GeoJSONGeometryMultiPolygon;
declare type GeoJSONGeometryCompressed = GeoJSONGeometryPoint | GeoJSONGeometryMultiPoint | GeoJSONGeometryLineString | GeoJSONGeometryMultiLineString | GeoJSONGeometryPolygonCompressed | GeoJSONGeometryMultiPolygonCompressed;
interface GeoJSONGeometryPoint {
    type: 'Point';
    coordinates: number[];
}
interface GeoJSONGeometryMultiPoint {
    type: 'MultiPoint';
    coordinates: number[][];
}
interface GeoJSONGeometryLineString {
    type: 'LineString';
    coordinates: number[][];
}
interface GeoJSONGeometryMultiLineString {
    type: 'MultiLineString';
    coordinates: number[][][];
}
interface GeoJSONGeometryPolygon {
    type: 'Polygon';
    coordinates: number[][][];
}
interface GeoJSONGeometryPolygonCompressed {
    type: 'Polygon';
    coordinates: string[];
    encodeOffsets: number[][];
}
interface GeoJSONGeometryMultiPolygon {
    type: 'MultiPolygon';
    coordinates: number[][][][];
}
interface GeoJSONGeometryMultiPolygonCompressed {
    type: 'MultiPolygon';
    coordinates: string[][];
    encodeOffsets: number[][][];
}

declare function parseXML(svg: Document | string | SVGElement): SVGElement;

declare type SVGMapSource = 'string' | Document | SVGElement;
declare type GeoJSONMapSource = 'string' | GeoJSON | GeoJSONCompressed;
declare type MapInputObject = {
    geoJSON?: GeoJSONMapSource;
    geoJson?: GeoJSONMapSource;
    svg?: SVGMapSource;
    specialAreas?: GeoSpecialAreas;
};
declare type MapRecord = GeoJSONMapRecord | SVGMapRecord;
interface GeoJSONMapRecord {
    type: 'geoJSON';
    source: GeoJSONMapSource;
    specialAreas: GeoSpecialAreas;
    geoJSON: GeoJSON | GeoJSONCompressed;
}
interface SVGMapRecord {
    type: 'svg';
    source: SVGMapSource;
    specialAreas: GeoSpecialAreas;
    svgXML: ReturnType<typeof parseXML>;
}
declare const _default: {
    registerMap: (mapName: string, rawDef: MapInputObject | MapRecord[] | GeoJSONMapSource, rawSpecialAreas?: GeoSpecialAreas) => MapRecord[];
    retrieveMap: (mapName: string) => MapRecord[];
};

declare const _default$1: {
    time: {
        month: string[];
        monthAbbr: string[];
        dayOfWeek: string[];
        dayOfWeekAbbr: string[];
    };
    legend: {
        selector: {
            all: string;
            inverse: string;
        };
    };
    toolbox: {
        brush: {
            title: {
                rect: string;
                polygon: string;
                lineX: string;
                lineY: string;
                keep: string;
                clear: string;
            };
        };
        dataView: {
            title: string;
            lang: string[];
        };
        dataZoom: {
            title: {
                zoom: string;
                back: string;
            };
        };
        magicType: {
            title: {
                line: string;
                bar: string;
                stack: string;
                tiled: string;
            };
        };
        restore: {
            title: string;
        };
        saveAsImage: {
            title: string;
            lang: string[];
        };
    };
    series: {
        typeNames: {
            pie: string;
            bar: string;
            line: string;
            scatter: string;
            effectScatter: string;
            radar: string;
            tree: string;
            treemap: string;
            boxplot: string;
            candlestick: string;
            k: string;
            heatmap: string;
            map: string;
            parallel: string;
            lines: string;
            graph: string;
            sankey: string;
            funnel: string;
            gauge: string;
            pictorialBar: string;
            themeRiver: string;
            sunburst: string;
        };
    };
    aria: {
        general: {
            withTitle: string;
            withoutTitle: string;
        };
        series: {
            single: {
                prefix: string;
                withName: string;
                withoutName: string;
            };
            multiple: {
                prefix: string;
                withName: string;
                withoutName: string;
                separator: {
                    middle: string;
                    end: string;
                };
            };
        };
        data: {
            allData: string;
            partialData: string;
            withName: string;
            withoutName: string;
            separator: {
                middle: string;
                end: string;
            };
        };
    };
};

declare type LocaleOption = typeof _default$1;
declare function registerLocale(locale: string, localeObj: LocaleOption): void;

declare type ModelFinder = ModelFinder$1;
declare const version$1 = "5.0.1";
declare const dependencies: {
    zrender: string;
};
declare const PRIORITY: {
    PROCESSOR: {
        FILTER: number;
        SERIES_FILTER: number;
        STATISTIC: number;
    };
    VISUAL: {
        LAYOUT: number;
        PROGRESSIVE_LAYOUT: number;
        GLOBAL: number;
        CHART: number;
        POST_CHART_LAYOUT: number;
        COMPONENT: number;
        BRUSH: number;
        CHART_ITEM: number;
        ARIA: number;
        DECAL: number;
    };
};
declare const IN_MAIN_PROCESS_KEY: "__flagInMainProcess";
declare const OPTION_UPDATED_KEY: "__optionUpdated";
declare const STATUS_NEEDS_UPDATE_KEY: "__needsUpdateStatus";
declare const CONNECT_STATUS_KEY: "__connectUpdateStatus";
interface SetOptionOpts {
    notMerge?: boolean;
    lazyUpdate?: boolean;
    silent?: boolean;
    replaceMerge?: GlobalModelSetOptionOpts['replaceMerge'];
    transition?: SetOptionTransitionOpt;
}
interface SetOptionTransitionOptItem {
    from?: SetOptionTransitionOptFinder;
    to: SetOptionTransitionOptFinder;
    dividingMethod: MorphDividingMethod;
}
interface SetOptionTransitionOptFinder extends ModelFinderObject {
    dimension: DimensionLoose;
}
declare type SetOptionTransitionOpt = SetOptionTransitionOptItem | SetOptionTransitionOptItem[];
interface PostIniter {
    (chart: EChartsType): void;
}
declare class ECharts extends Eventful {
    id: string;
    group: string;
    private _zr;
    private _dom;
    private _model;
    private _throttledZrFlush;
    private _theme;
    private _locale;
    private _chartsViews;
    private _chartsMap;
    private _componentsViews;
    private _componentsMap;
    private _coordSysMgr;
    private _api;
    private _scheduler;
    private _messageCenter;
    private _pendingActions;
    protected _$eventProcessor: never;
    private _disposed;
    private _loadingFX;
    private _labelManager;
    private [OPTION_UPDATED_KEY];
    private [IN_MAIN_PROCESS_KEY];
    private [CONNECT_STATUS_KEY];
    private [STATUS_NEEDS_UPDATE_KEY];
    constructor(dom: HTMLElement, theme?: string | ThemeOption, opts?: {
        locale?: string | LocaleOption;
        renderer?: RendererType;
        devicePixelRatio?: number;
        useDirtyRect?: boolean;
        width?: number;
        height?: number;
    });
    private _onframe;
    getDom(): HTMLElement;
    getId(): string;
    getZr(): ZRenderType;
    setOption<Opt extends ECBasicOption>(option: Opt, notMerge?: boolean, lazyUpdate?: boolean): void;
    setOption<Opt extends ECBasicOption>(option: Opt, opts?: SetOptionOpts): void;
    private setTheme;
    private getModel;
    getOption(): ECBasicOption;
    getWidth(): number;
    getHeight(): number;
    getDevicePixelRatio(): number;
    getRenderedCanvas(opts?: {
        backgroundColor?: ZRColor;
        pixelRatio?: number;
    }): HTMLCanvasElement;
    getSvgDataURL(): string;
    getDataURL(opts?: {
        type?: 'png' | 'jpg' | 'svg';
        pixelRatio?: number;
        backgroundColor?: ZRColor;
        excludeComponents?: ComponentMainType[];
    }): string;
    getConnectedDataURL(opts?: {
        type?: 'png' | 'jpg' | 'svg';
        pixelRatio?: number;
        backgroundColor?: ZRColor;
        connectedBackgroundColor?: ZRColor;
        excludeComponents?: string[];
    }): string;
    convertToPixel(finder: ModelFinder, value: ScaleDataValue): number;
    convertToPixel(finder: ModelFinder, value: ScaleDataValue[]): number[];
    convertFromPixel(finder: ModelFinder, value: number): number;
    convertFromPixel(finder: ModelFinder, value: number[]): number[];
    containPixel(finder: ModelFinder, value: number[]): boolean;
    getVisual(finder: ModelFinder, visualType: string): string | number | number[] | PatternObject | LinearGradientObject | RadialGradientObject;
    private getViewOfComponentModel;
    private getViewOfSeriesModel;
    private _initEvents;
    isDisposed(): boolean;
    clear(): void;
    dispose(): void;
    resize(opts?: {
        width?: number | 'auto';
        height?: number | 'auto';
        silent?: boolean;
    }): void;
    showLoading(cfg?: object): void;
    showLoading(name?: string, cfg?: object): void;
    hideLoading(): void;
    makeActionFromEvent(eventObj: ECEvent): Payload;
    dispatchAction(payload: Payload, opt?: boolean | {
        silent?: boolean;
        flush?: boolean | undefined;
    }): void;
    updateLabelLayout(): void;
    appendData(params: {
        seriesIndex: number;
        data: any;
    }): void;
    private static internalField;
}
declare function init$1(dom: HTMLElement, theme?: string | object, opts?: {
    renderer?: RendererType;
    devicePixelRatio?: number;
    width?: number;
    height?: number;
    locale?: string | LocaleOption;
}): EChartsType;
declare function connect(groupId: string | EChartsType[]): string;
declare function disConnect(groupId: string): void;
declare const disconnect: typeof disConnect;
declare function dispose$1(chart: EChartsType | HTMLElement | string): void;
declare function getInstanceByDom(dom: HTMLElement): EChartsType;
declare function getInstanceById(key: string): EChartsType;
declare function registerTheme(name: string, theme: ThemeOption): void;
declare function registerPreprocessor(preprocessorFunc: OptionPreprocessor): void;
declare function registerProcessor(priority: number | StageHandler | StageHandlerOverallReset, processor?: StageHandler | StageHandlerOverallReset): void;
declare function registerPostInit(postInitFunc: PostIniter): void;
declare function registerPostUpdate(postUpdateFunc: PostUpdater): void;
declare function registerAction(type: string, eventName: string, action: ActionHandler): void;
declare function registerAction(type: string, action: ActionHandler): void;
declare function registerAction(actionInfo: ActionInfo, action: ActionHandler): void;
declare function registerCoordinateSystem(type: string, coordSysCreator: CoordinateSystemCreator): void;
declare function getCoordinateSystemDimensions(type: string): DimensionDefinitionLoose[];

declare function registerLayout(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerLayout(layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerVisual(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerVisual(layoutTask: StageHandler | StageHandlerOverallReset): void;

declare function registerLoading(name: string, loadingFx: LoadingEffectCreator): void;
declare function setCanvasCreator(creator: () => HTMLCanvasElement): void;
declare function registerMap(mapName: Parameters<typeof _default.registerMap>[0], geoJson: Parameters<typeof _default.registerMap>[1], specialAreas?: Parameters<typeof _default.registerMap>[2]): void;
declare function getMap(mapName: string): {
    geoJson: any;
    specialAreas: GeoSpecialAreas;
};
declare const registerTransform: typeof registerExternalTransform;
declare const dataTool: {};
interface EChartsType extends ECharts {
}

interface ComponentView {
    updateTransform?(seriesModel: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void | {
        update: true;
    };
    filterForExposedEvent(eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECEvent): boolean;
}
declare class ComponentView {
    readonly group: ViewRootGroup;
    readonly uid: string;
    __model: ComponentModel;
    __alive: boolean;
    __id: string;
    constructor();
    init(ecModel: GlobalModel, api: ExtensionAPI): void;
    render(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    updateView(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateLayout(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateVisual(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    blurSeries(seriesModels: SeriesModel[], ecModel: GlobalModel): void;
    static registerClass: ClassManager['registerClass'];
}

interface TaskContext {
    outputData?: List;
    data?: List;
    payload?: Payload;
    model?: SeriesModel;
}
declare type TaskResetCallback<Ctx extends TaskContext> = (this: Task<Ctx>, context: Ctx) => TaskResetCallbackReturn<Ctx>;
declare type TaskResetCallbackReturn<Ctx extends TaskContext> = void | (TaskProgressCallback<Ctx> | TaskProgressCallback<Ctx>[]) | {
    forceFirstProgress?: boolean;
    progress: TaskProgressCallback<Ctx> | TaskProgressCallback<Ctx>[];
};
declare type TaskProgressCallback<Ctx extends TaskContext> = (this: Task<Ctx>, params: TaskProgressParams, context: Ctx) => void;
declare type TaskProgressParams = {
    start: number;
    end: number;
    count: number;
    next?: TaskDataIteratorNext;
};
declare type TaskPlanCallback<Ctx extends TaskContext> = (this: Task<Ctx>, context: Ctx) => TaskPlanCallbackReturn;
declare type TaskPlanCallbackReturn = 'reset' | false | null | undefined;
declare type TaskCountCallback<Ctx extends TaskContext> = (this: Task<Ctx>, context: Ctx) => number;
declare type TaskOnDirtyCallback<Ctx extends TaskContext> = (this: Task<Ctx>, context: Ctx) => void;
declare type TaskDataIteratorNext = () => number;
declare type TaskDefineParam<Ctx extends TaskContext> = {
    reset?: TaskResetCallback<Ctx>;
    plan?: TaskPlanCallback<Ctx>;
    count?: TaskCountCallback<Ctx>;
    onDirty?: TaskOnDirtyCallback<Ctx>;
};
declare type PerformArgs = {
    step?: number;
    skip?: boolean;
    modBy?: number;
    modDataCount?: number;
};
declare class Task<Ctx extends TaskContext> {
    private _reset;
    private _plan;
    private _count;
    private _onDirty;
    private _progress;
    private _callingProgress;
    private _dirty;
    private _modBy;
    private _modDataCount;
    private _upstream;
    private _downstream;
    private _dueEnd;
    private _outputDueEnd;
    private _settedOutputEnd;
    private _dueIndex;
    private _disposed;
    __pipeline: Pipeline;
    __idxInPipeline: number;
    __block: boolean;
    context: Ctx;
    constructor(define: TaskDefineParam<Ctx>);
    perform(performArgs?: PerformArgs): boolean;
    dirty(): void;
    private _doProgress;
    private _doReset;
    unfinished(): boolean;
    pipe(downTask: Task<Ctx>): void;
    dispose(): void;
    getUpstream(): Task<Ctx>;
    getDownstream(): Task<Ctx>;
    setOutputEnd(end: number): void;
}

declare type GeneralTask = Task<TaskContext>;
declare type SeriesTask = Task<SeriesTaskContext>;
declare type Pipeline = {
    id: string;
    head: GeneralTask;
    tail: GeneralTask;
    threshold: number;
    progressiveEnabled: boolean;
    blockIndex: number;
    step: number;
    count: number;
    currentTask?: GeneralTask;
    context?: PipelineContext;
};
declare type PipelineContext = {
    progressiveRender: boolean;
    modDataCount: number;
    large: boolean;
};
declare type PerformStageTaskOpt = {
    block?: boolean;
    setDirty?: boolean;
    visualType?: StageHandlerInternal['visualType'];
    dirtyMap?: HashMap<any>;
};
interface SeriesTaskContext extends TaskContext {
    model?: SeriesModel;
    data?: List;
    view?: ChartView;
    ecModel?: GlobalModel;
    api?: ExtensionAPI;
    useClearVisual?: boolean;
    plan?: StageHandlerPlan;
    reset?: StageHandlerReset;
    scheduler?: Scheduler;
    payload?: Payload;
    resetDefines?: StageHandlerProgressExecutor[];
}
interface OverallTaskContext extends TaskContext {
    ecModel: GlobalModel;
    api: ExtensionAPI;
    overallReset: StageHandlerOverallReset;
    scheduler: Scheduler;
    payload?: Payload;
}
declare class Scheduler {
    readonly ecInstance: EChartsType;
    readonly api: ExtensionAPI;
    unfinished: boolean;
    private _dataProcessorHandlers;
    private _visualHandlers;
    private _allHandlers;
    private _stageTaskMap;
    private _pipelineMap;
    constructor(ecInstance: EChartsType, api: ExtensionAPI, dataProcessorHandlers: StageHandlerInternal[], visualHandlers: StageHandlerInternal[]);
    restoreData(ecModel: GlobalModel, payload: Payload): void;
    getPerformArgs(task: GeneralTask, isBlock?: boolean): {
        step: number;
        modBy: number;
        modDataCount: number;
    };
    getPipeline(pipelineId: string): Pipeline;
    updateStreamModes(seriesModel: SeriesModel<SeriesOption & SeriesLargeOptionMixin>, view: ChartView): void;
    restorePipelines(ecModel: GlobalModel): void;
    prepareStageTasks(): void;
    prepareView(view: ChartView, model: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void;
    performDataProcessorTasks(ecModel: GlobalModel, payload?: Payload): void;
    performVisualTasks(ecModel: GlobalModel, payload?: Payload, opt?: PerformStageTaskOpt): void;
    private _performStageTasks;
    performSeriesTasks(ecModel: GlobalModel): void;
    plan(): void;
    updatePayload(task: Task<SeriesTaskContext | OverallTaskContext>, payload: Payload | 'remain'): void;
    private _createSeriesStageTask;
    private _createOverallStageTask;
    private _pipe;
    static wrapStageHandler(stageHandler: StageHandler | StageHandlerOverallReset, visualType: StageHandlerInternal['visualType']): StageHandlerInternal;
}

interface ChartView {
    incrementalPrepareRender(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    incrementalRender(params: StageHandlerProgressParams, seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateTransform(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void | {
        update: true;
    };
    containPoint(point: number[], seriesModel: SeriesModel): boolean;
    filterForExposedEvent(eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECEvent): boolean;
}
declare class ChartView {
    type: string;
    readonly group: ViewRootGroup;
    readonly uid: string;
    readonly renderTask: SeriesTask;
    ignoreLabelLineUpdate: boolean;
    __alive: boolean;
    __model: SeriesModel;
    __id: string;
    static protoInitialize: void;
    constructor();
    init(ecModel: GlobalModel, api: ExtensionAPI): void;
    render(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    highlight(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    downplay(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    remove(ecModel: GlobalModel, api: ExtensionAPI): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    updateView(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateLayout(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateVisual(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    static markUpdateMethod(payload: Payload, methodName: keyof ChartView): void;
    static registerClass: ClassManager['registerClass'];
}

declare const availableMethods: (keyof EChartsType)[];
interface ExtensionAPI extends Pick<EChartsType, (typeof availableMethods)[number]> {
}
declare abstract class ExtensionAPI {
    constructor(ecInstance: EChartsType);
    abstract getCoordinateSystems(): CoordinateSystemMaster[];
    abstract getComponentByElement(el: Element): ComponentModel;
    abstract enterEmphasis(el: Element, highlightDigit?: number): void;
    abstract leaveEmphasis(el: Element, highlightDigit?: number): void;
    abstract enterSelect(el: Element): void;
    abstract leaveSelect(el: Element): void;
    abstract enterBlur(el: Element): void;
    abstract leaveBlur(el: Element): void;
    abstract getViewOfComponentModel(componentModel: ComponentModel): ComponentView;
    abstract getViewOfSeriesModel(seriesModel: SeriesModel): ChartView;
    abstract getModel(): GlobalModel;
}

declare const AXIS_TYPES: {
    readonly value: 1;
    readonly category: 1;
    readonly time: 1;
    readonly log: 1;
};
declare type OptionAxisType = keyof typeof AXIS_TYPES;
interface AxisBaseOption extends ComponentOption, AnimationOptionMixin {
    type?: OptionAxisType;
    show?: boolean;
    inverse?: boolean;
    name?: string;
    nameLocation?: 'start' | 'middle' | 'end';
    nameRotate?: number;
    nameTruncate?: {
        maxWidth?: number;
        ellipsis?: string;
        placeholder?: string;
    };
    nameTextStyle?: AxisNameTextStyleOption;
    nameGap?: number;
    silent?: boolean;
    triggerEvent?: boolean;
    tooltip?: {
        show?: boolean;
    };
    axisPointer?: any;
    axisLine?: AxisLineOption;
    axisTick?: AxisTickOption;
    axisLabel?: AxisLabelOption;
    minorTick?: MinorTickOption;
    splitLine?: SplitLineOption;
    minorSplitLine?: MinorSplitLineOption;
    splitArea?: SplitAreaOption;
    boundaryGap?: boolean | [number | string, number | string];
    min?: ScaleDataValue | 'dataMin' | ((extent: {
        min: number;
        max: number;
    }) => ScaleDataValue);
    max?: ScaleDataValue | 'dataMax' | ((extent: {
        min: number;
        max: number;
    }) => ScaleDataValue);
    scale?: boolean;
    deduplication?: boolean;
    data?: (OrdinalRawValue | {
        value: OrdinalRawValue;
        textStyle?: TextCommonOption;
    })[];
    splitNumber?: number;
    interval?: number;
    minInterval?: number;
    maxInterval?: number;
    logBase?: number;
}
interface AxisNameTextStyleOption extends TextCommonOption {
    rich?: Dictionary<TextCommonOption>;
}
interface AxisLineOption {
    show?: boolean | 'auto';
    onZero?: boolean;
    onZeroAxisIndex?: number;
    symbol?: string | [string, string];
    symbolSize?: number[];
    symbolOffset?: number[];
    lineStyle?: LineStyleOption;
}
interface AxisTickOption {
    show?: boolean | 'auto';
    inside?: boolean;
    length?: number;
    lineStyle?: LineStyleOption;
    alignWithLabel?: boolean;
    interval?: 'auto' | number | ((index: number, value: string) => boolean);
}
declare type AxisLabelFormatterOption = string | ((value: OrdinalRawValue | number, index: number) => string);
declare type TimeAxisLabelUnitFormatter = AxisLabelFormatterOption | string[];
declare type TimeAxisLabelFormatterOption = string | ((value: number, index: number, extra: {
    level: number;
}) => string) | {
    year?: TimeAxisLabelUnitFormatter;
    month?: TimeAxisLabelUnitFormatter;
    week?: TimeAxisLabelUnitFormatter;
    day?: TimeAxisLabelUnitFormatter;
    hour?: TimeAxisLabelUnitFormatter;
    minute?: TimeAxisLabelUnitFormatter;
    second?: TimeAxisLabelUnitFormatter;
    millisecond?: TimeAxisLabelUnitFormatter;
    inherit?: boolean;
};
interface AxisLabelOption extends Omit<TextCommonOption, 'color'> {
    show?: boolean;
    inside?: boolean;
    rotate?: number;
    showMinLabel?: boolean;
    showMaxLabel?: boolean;
    margin?: number;
    formatter?: AxisLabelFormatterOption | TimeAxisLabelFormatterOption;
    interval?: 'auto' | number | ((index: number, value: string) => boolean);
    color?: ColorString | ((value?: string | number, index?: number) => ColorString);
    rich?: Dictionary<TextCommonOption>;
}
interface MinorTickOption {
    show?: boolean;
    splitNumber?: number;
    length?: number;
    lineStyle?: LineStyleOption;
}
interface SplitLineOption {
    show?: boolean;
    interval?: 'auto' | number | ((index: number, value: string) => boolean);
    lineStyle?: LineStyleOption<ZRColor | ZRColor[]>;
}
interface MinorSplitLineOption {
    show?: boolean;
    lineStyle?: LineStyleOption;
}
interface SplitAreaOption {
    show?: boolean;
    interval?: 'auto' | number | ((index: number, value: string) => boolean);
    areaStyle?: AreaStyleOption<ZRColor[]>;
}

interface AxisModelCommonMixin<Opt extends AxisBaseOption> extends Pick<Model<Opt>, 'option'> {
    axis: Axis;
}
declare class AxisModelCommonMixin<Opt extends AxisBaseOption> {
    getNeedCrossZero(): boolean;
    getCoordSysModel(): CoordinateSystemHostModel;
}

declare class OrdinalMeta {
    readonly categories: OrdinalRawValue[];
    private _needCollect;
    private _deduplication;
    private _map;
    constructor(opt: {
        categories?: OrdinalRawValue[];
        needCollect?: boolean;
        deduplication?: boolean;
    });
    static createByAxisModel(axisModel: Model): OrdinalMeta;
    getOrdinal(category: OrdinalRawValue): OrdinalNumber;
    parseAndCollect(category: OrdinalRawValue | OrdinalNumber): OrdinalNumber;
    private _getOrCreateMap;
}

declare const extensionRegisters: {
    registerPreprocessor: typeof registerPreprocessor;
    registerProcessor: typeof registerProcessor;
    registerPostInit: typeof registerPostInit;
    registerPostUpdate: typeof registerPostUpdate;
    registerAction: typeof registerAction;
    registerCoordinateSystem: typeof registerCoordinateSystem;
    registerLayout: typeof registerLayout;
    registerVisual: typeof registerVisual;
    registerTransform: typeof registerExternalTransform;
    registerLoading: typeof registerLoading;
    registerMap: typeof registerMap;
    PRIORITY: {
        PROCESSOR: {
            FILTER: number;
            SERIES_FILTER: number;
            STATISTIC: number;
        };
        VISUAL: {
            LAYOUT: number;
            PROGRESSIVE_LAYOUT: number;
            GLOBAL: number;
            CHART: number;
            POST_CHART_LAYOUT: number;
            COMPONENT: number;
            BRUSH: number;
            CHART_ITEM: number;
            ARIA: number;
            DECAL: number;
        };
    };
    ComponentModel: typeof ComponentModel;
    ComponentView: typeof ComponentView;
    SeriesModel: typeof SeriesModel;
    ChartView: typeof ChartView;
    registerComponentModel(ComponentModelClass: Constructor): void;
    registerComponentView(ComponentViewClass: typeof ComponentView): void;
    registerSeriesModel(SeriesModelClass: Constructor): void;
    registerChartView(ChartViewClass: typeof ChartView): void;
    registerSubTypeDefaulter(componentType: string, defaulter: SubTypeDefaulter): void;
    registerPainter(painterType: string, PainterCtor: Parameters<typeof registerPainter>[1]): void;
};
declare type EChartsExtensionInstallRegisters = typeof extensionRegisters;
declare type EChartsExtensionInstaller = (ec: EChartsExtensionInstallRegisters) => void;
interface EChartsExtension {
    install: EChartsExtensionInstaller;
}
declare function use(ext: EChartsExtensionInstaller | EChartsExtension | (EChartsExtensionInstaller | EChartsExtension)[]): void;

interface AxisModelExtendedInCreator<Opt extends AxisBaseOption> {
    getCategories(rawData?: boolean): OrdinalRawValue[] | Opt['data'];
    getOrdinalMeta(): OrdinalMeta;
}

interface AxisBaseModel<T extends AxisBaseOption = AxisBaseOption> extends ComponentModel<T>, AxisModelCommonMixin<T>, AxisModelExtendedInCreator<T> {
    axis: Axis;
}

declare function createAxisLabels(axis: Axis): {
    labels: {
        formattedLabel: string;
        rawLabel: string;
        tickValue: number;
    }[];
    labelCategoryInterval?: number;
};
declare function calculateCategoryInterval(axis: Axis): number;

interface ScaleRawExtentResult {
    readonly min: number;
    readonly max: number;
    readonly minFixed: boolean;
    readonly maxFixed: boolean;
    readonly isBlank: boolean;
}
declare class ScaleRawExtentInfo {
    private _needCrossZero;
    private _isOrdinal;
    private _axisDataLen;
    private _boundaryGapInner;
    private _modelMinRaw;
    private _modelMaxRaw;
    private _modelMinNum;
    private _modelMaxNum;
    private _dataMin;
    private _dataMax;
    private _determinedMin;
    private _determinedMax;
    readonly frozen: boolean;
    constructor(scale: Scale, model: AxisBaseModel, originalExtent: number[]);
    private _prepareParams;
    calculate(): ScaleRawExtentResult;
    modifyDataMinMax(minMaxName: 'min' | 'max', val: number): void;
    setDeterminedMinMax(minMaxName: 'min' | 'max', val: number): void;
    freeze(): void;
}

declare abstract class Scale<SETTING extends Dictionary<unknown> = Dictionary<unknown>> {
    type: string;
    private _setting;
    protected _extent: [number, number];
    private _isBlank;
    readonly rawExtentInfo: ScaleRawExtentInfo;
    constructor(setting?: SETTING);
    getSetting<KEY extends keyof SETTING>(name: KEY): SETTING[KEY];
    abstract parse(val: OptionDataValue): number;
    abstract contain(val: ScaleDataValue): boolean;
    abstract normalize(val: ScaleDataValue): number;
    abstract scale(val: number): number;
    unionExtent(other: [number, number]): void;
    unionExtentFromData(data: List, dim: DimensionName | DimensionLoose): void;
    getExtent(): [number, number];
    setExtent(start: number, end: number): void;
    isInExtentRange(value: number): boolean;
    isBlank(): boolean;
    setBlank(isBlank: boolean): void;
    abstract niceTicks(splitNumber?: number, minInterval?: number, maxInterval?: number): void;
    abstract niceExtent(opt?: {
        splitNumber?: number;
        fixMin?: boolean;
        fixMax?: boolean;
        minInterval?: number;
        maxInterval?: number;
    }): void;
    abstract getLabel(tick: ScaleTick): string;
    abstract getTicks(expandToNicedExtent?: boolean): ScaleTick[];
    abstract getMinorTicks(splitNumber: number): number[][];
    static registerClass: ClassManager['registerClass'];
    static getClass: ClassManager['getClass'];
}

interface TickCoord {
    coord: number;
    tickValue?: ScaleTick['value'];
}
declare class Axis {
    type: OptionAxisType;
    readonly dim: DimensionName;
    scale: Scale;
    private _extent;
    model: AxisBaseModel;
    onBand: AxisBaseOption['boundaryGap'];
    inverse: AxisBaseOption['inverse'];
    constructor(dim: DimensionName, scale: Scale, extent: [number, number]);
    contain(coord: number): boolean;
    containData(data: ScaleDataValue): boolean;
    getExtent(): [number, number];
    getPixelPrecision(dataExtent?: [number, number]): number;
    setExtent(start: number, end: number): void;
    dataToCoord(data: ScaleDataValue, clamp?: boolean): number;
    coordToData(coord: number, clamp?: boolean): number;
    pointToData(point: number[], clamp?: boolean): number;
    getTicksCoords(opt?: {
        tickModel?: Model;
        clamp?: boolean;
    }): TickCoord[];
    getMinorTicksCoords(): TickCoord[][];
    getViewLabels(): ReturnType<typeof createAxisLabels>['labels'];
    getLabelModel(): Model<AxisBaseOption['axisLabel']>;
    getTickModel(): Model;
    getBandWidth(): number;
    getRotate: () => number;
    calculateCategoryInterval(): ReturnType<typeof calculateCategoryInterval>;
}

interface BaseBarSeriesOption<StateOption, ExtraStateOption = DefaultExtraStateOpts> extends SeriesOption<StateOption, ExtraStateOption>, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin {
    barMinHeight?: number;
    barMinAngle?: number;
    barMaxWidth?: number;
    barMinWidth?: number;
    barWidth?: number | string;
    barGap?: string | number;
    barCategoryGap?: string | number;
    large?: boolean;
    largeThreshold?: number;
}

interface LayoutRect extends BoundingRect {
    margin: number[];
}
declare function getLayoutRect(positionInfo: BoxLayoutOptionMixin & {
    aspect?: number;
}, containerRect: {
    width: number;
    height: number;
}, margin?: number | number[]): LayoutRect;

interface GridOption extends ComponentOption, BoxLayoutOptionMixin, ShadowOptionMixin {
    mainType?: 'grid';
    show?: boolean;
    containLabel?: boolean;
    backgroundColor?: ZRColor;
    borderWidth?: number;
    borderColor?: ZRColor;
    tooltip?: any;
}

declare type CartesianAxisPosition = 'top' | 'bottom' | 'left' | 'right';
interface CartesianAxisOption extends AxisBaseOption {
    gridIndex?: number;
    gridId?: string;
    position?: CartesianAxisPosition;
    offset?: number;
    categorySortInfo?: OrdinalSortInfo;
}
interface XAXisOption extends CartesianAxisOption {
    mainType?: 'xAxis';
}
interface YAXisOption extends CartesianAxisOption {
    mainType?: 'yAxis';
}

interface AngleAxisOption extends AxisBaseOption {
    mainType?: 'angleAxis';
    polarIndex?: number;
    polarId?: string;
    startAngle?: number;
    clockwise?: boolean;
    splitNumber?: number;
    axisLabel?: AxisBaseOption['axisLabel'];
}
interface RadiusAxisOption extends AxisBaseOption {
    mainType?: 'radiusAxis';
    polarIndex?: number;
    polarId?: string;
}

interface PolarOption extends ComponentOption, CircleLayoutOptionMixin {
    mainType?: 'polar';
}

declare type BrushType = 'polygon' | 'rect' | 'lineX' | 'lineY';
declare type BrushTypeUncertain = BrushType | false | 'auto';
declare type BrushMode = 'single' | 'multiple';
declare type BrushDimensionMinMax = number[];
declare type BrushAreaRange = BrushDimensionMinMax | BrushDimensionMinMax[];
interface BrushCoverConfig {
    brushType: BrushType;
    id?: string;
    range?: BrushAreaRange;
    panelId?: string;
    brushMode?: BrushMode;
    brushStyle?: Pick<PathStyleProps, BrushStyleKey>;
    transformable?: boolean;
    removeOnClick?: boolean;
    z?: number;
}
declare type BrushStyleKey = 'fill' | 'stroke' | 'lineWidth' | 'opacity' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowColor';

declare class Region {
    readonly geometries: {
        type: 'polygon';
        exterior: number[][];
        interiors?: number[][][];
    }[];
    readonly name: string;
    center: number[];
    properties: GeoJSON['features'][0]['properties'];
    private _rect;
    constructor(name: string, geometries: Region['geometries'], cp: GeoJSON['features'][0]['properties']['cp']);
    getBoundingRect(): BoundingRect;
    contain(coord: number[]): boolean;
    transformTo(x: number, y: number, width: number, height: number): void;
    cloneShallow(name: string): Region;
}

interface InnerTruncateOption {
    maxIteration?: number;
    minChar?: number;
    placeholder?: string;
    maxIterations?: number;
}
declare function truncateText(text: string, containerWidth: number, font: string, ellipsis: string, options: InnerTruncateOption): string;

declare type TextStyleProps$1 = ZRText['style'];
declare function getTextRect(text: TextStyleProps$1['text'], font?: TextStyleProps$1['font'], align?: TextStyleProps$1['align'], verticalAlign?: TextStyleProps$1['verticalAlign'], padding?: TextStyleProps$1['padding'], rich?: TextStyleProps$1['rich'], truncate?: boolean, lineHeight?: number): BoundingRect;

declare function addCommas(x: string | number): string;
declare function toCamelCase(str: string, upperCaseFirst?: boolean): string;
declare const normalizeCssArray$1: typeof normalizeCssArray;
declare function encodeHTML(source: string): string;
interface TplFormatterParam extends Dictionary<any> {
    $vars: string[];
}
declare function formatTpl(tpl: string, paramsList: TplFormatterParam | TplFormatterParam[], encode?: boolean): string;
interface RichTextTooltipMarker {
    renderMode: TooltipRenderMode;
    content: string;
    style: Dictionary<unknown>;
}
declare type TooltipMarker = string | RichTextTooltipMarker;
declare type TooltipMarkerType = 'item' | 'subItem';
interface GetTooltipMarkerOpt {
    color?: ColorString;
    extraCssText?: string;
    type?: TooltipMarkerType;
    renderMode?: TooltipRenderMode;
    markerId?: string;
}
declare function getTooltipMarker(color: ColorString, extraCssText?: string): TooltipMarker;
declare function getTooltipMarker(opt: GetTooltipMarkerOpt): TooltipMarker;
declare function formatTime(tpl: string, value: unknown, isUTC: boolean): string;
declare function capitalFirst(str: string): string;

interface MapperParamAxisInfo {
    axisIndex: number;
    axisName: string;
    axisId: string;
    axisDim: string;
}
interface AxisPointerLink {
    xAxisIndex?: number[] | 'all';
    yAxisIndex?: number[] | 'all';
    xAxisId?: string[];
    yAxisId?: string[];
    xAxisName?: string[] | string;
    yAxisName?: string[] | string;
    radiusAxisIndex?: number[] | 'all';
    angleAxisIndex?: number[] | 'all';
    radiusAxisId?: string[];
    angleAxisId?: string[];
    radiusAxisName?: string[] | string;
    angleAxisName?: string[] | string;
    singleAxisIndex?: number[] | 'all';
    singleAxisId?: string[];
    singleAxisName?: string[] | string;
    mapper?(sourceVal: ScaleDataValue, sourceAxisInfo: MapperParamAxisInfo, targetAxisInfo: MapperParamAxisInfo): CommonAxisPointerOption['value'];
}
interface AxisPointerOption extends ComponentOption, Omit<CommonAxisPointerOption, 'type'> {
    mainType?: 'axisPointer';
    type?: 'line' | 'shadow' | 'cross' | 'none';
    link?: AxisPointerLink[];
}

declare type TopLevelFormatterParams = CallbackDataParams | CallbackDataParams[];
interface TooltipOption extends CommonTooltipOption<TopLevelFormatterParams>, ComponentOption {
    mainType?: 'tooltip';
    axisPointer?: AxisPointerOption & {
        axis?: 'auto' | 'x' | 'y' | 'angle' | 'radius';
        crossStyle?: LineStyleOption & {
            textStyle?: LabelOption;
        };
    };
    showContent?: boolean;
    trigger?: 'item' | 'axis' | 'none';
    displayMode?: 'single' | 'multipleByCoordSys';
    renderMode?: 'auto' | TooltipRenderMode;
    appendToBody?: boolean;
    className?: string;
    order?: TooltipOrderMode;
}

declare type TooltipMarkupBlockFragment = TooltipMarkupSection | TooltipMarkupNameValueBlock;
interface TooltipMarkupBlock {
    sortParam?: unknown;
    __gapLevelBetweenSubBlocks?: number;
}
interface TooltipMarkupSection extends TooltipMarkupBlock {
    type: 'section';
    header?: unknown;
    noHeader?: boolean;
    blocks?: TooltipMarkupBlockFragment[];
    sortBlocks?: boolean;
}
interface TooltipMarkupNameValueBlock extends TooltipMarkupBlock {
    type: 'nameValue';
    markerType?: TooltipMarkerType;
    markerColor?: ColorString;
    name?: string;
    value?: unknown | unknown[];
    valueType?: DimensionType | DimensionType[];
    noName?: boolean;
    noValue?: boolean;
}

interface MapStateOption {
    itemStyle?: GeoItemStyleOption;
    label?: SeriesLabelOption;
}
interface MapDataItemOption extends MapStateOption, StatesOptionMixin<MapStateOption>, OptionDataItemObject<OptionDataValueNumeric> {
    cursor?: string;
}
declare type MapValueCalculationType = 'sum' | 'average' | 'min' | 'max';
interface MapSeriesOption extends SeriesOption<MapStateOption>, MapStateOption, GeoCommonOptionMixin, SeriesOnGeoOptionMixin, BoxLayoutOptionMixin, SeriesEncodeOptionMixin {
    type?: 'map';
    coordinateSystem?: string;
    silent?: boolean;
    markLine?: any;
    markPoint?: any;
    markArea?: any;
    mapValueCalculation?: MapValueCalculationType;
    showLegendSymbol?: boolean;
    geoCoord?: Dictionary<number[]>;
    data?: OptionDataValueNumeric[] | OptionDataValueNumeric[][] | MapDataItemOption[];
    nameProperty?: string;
}

interface GeoItemStyleOption extends ItemStyleOption {
    areaColor?: ZRColor;
}
interface GeoLabelOption extends LabelOption {
    formatter?: string | ((params: GeoLabelFormatterDataParams) => string);
}
interface GeoStateOption {
    itemStyle?: GeoItemStyleOption;
    label?: GeoLabelOption;
}
interface GeoLabelFormatterDataParams {
    name: string;
    status: DisplayState;
}
interface RegoinOption extends GeoStateOption, StatesOptionMixin<GeoStateOption> {
    name?: string;
    selected?: boolean;
}
interface GeoCommonOptionMixin extends RoamOptionMixin {
    map: string;
    aspectScale?: number;
    layoutCenter?: (number | string)[];
    layoutSize?: number | string;
    boundingCoords?: number[][];
    nameMap?: NameMap;
}
interface GeoOption extends ComponentOption, BoxLayoutOptionMixin, AnimationOptionMixin, GeoCommonOptionMixin, StatesOptionMixin<GeoStateOption>, GeoStateOption {
    mainType?: 'geo';
    show?: boolean;
    silent?: boolean;
    regions?: RegoinOption[];
    stateAnimation?: AnimationOptionMixin;
    selectedMode?: 'single' | 'multiple' | boolean;
    selectedMap?: Dictionary<boolean>;
}

interface BrushAreaParam extends ModelFinderObject {
    brushType: BrushCoverConfig['brushType'];
    id?: BrushCoverConfig['id'];
    range?: BrushCoverConfig['range'];
    panelId?: BrushCoverConfig['panelId'];
    coordRange?: BrushAreaRange;
    coordRanges?: BrushAreaRange[];
}
interface BrushAreaParamInternal extends BrushAreaParam {
    brushMode: BrushMode;
    brushStyle: BrushCoverConfig['brushStyle'];
    transformable: BrushCoverConfig['transformable'];
    removeOnClick: BrushCoverConfig['removeOnClick'];
    z: BrushCoverConfig['z'];
    __rangeOffset?: {
        offset: BrushDimensionMinMax | BrushDimensionMinMax[];
        xyMinMax: BrushDimensionMinMax[];
    };
}
declare type BrushToolboxIconType = BrushType | 'keep' | 'clear';
interface BrushOption extends ComponentOption, ModelFinderObject {
    mainType?: 'brush';
    toolbox?: BrushToolboxIconType[];
    brushLink?: number[] | 'all' | 'none';
    throttleType?: 'fixRate' | 'debounce';
    throttleDelay?: number;
    inBrush?: VisualOptionFixed;
    outOfBrush?: VisualOptionFixed;
    brushType?: BrushTypeUncertain;
    brushStyle?: {
        borderWidth?: number;
        color?: ZRColor;
        borderColor?: ZRColor;
    };
    transformable?: boolean;
    brushMode?: BrushMode;
    removeOnClick?: boolean;
}

interface BrushSelectableArea extends BrushAreaParamInternal {
    boundingRect: BoundingRect;
    selectors: BrushCommonSelectorsForSeries;
}
interface BrushCommonSelectorsForSeries {
    point(itemLayout: number[]): boolean;
    rect(itemLayout: RectLike): boolean;
}

interface BarStateOption {
    itemStyle?: BarItemStyleOption;
    label?: SeriesLabelOption;
}
interface BarItemStyleOption extends ItemStyleOption {
    borderRadius?: number | number[];
}
interface BarDataItemOption extends BarStateOption, StatesOptionMixin<BarStateOption>, OptionDataItemObject<OptionDataValue> {
    cursor?: string;
}
interface BarSeriesOption extends BaseBarSeriesOption<BarStateOption>, BarStateOption, SeriesStackOptionMixin, SeriesSamplingOptionMixin, SeriesEncodeOptionMixin {
    type?: 'bar';
    coordinateSystem?: 'cartesian2d' | 'polar';
    clip?: boolean;
    roundCap?: boolean;
    showBackground?: boolean;
    backgroundStyle?: ItemStyleOption & {
        borderRadius?: number | number[];
    };
    data?: (BarDataItemOption | OptionDataValue | OptionDataValue[])[];
    realtimeSort?: boolean;
}

declare type BarWidthAndOffset = Dictionary<Dictionary<{
    bandWidth: number;
    offset: number;
    offsetCenter: number;
    width: number;
}>>;
interface BarGridLayoutOptionForCustomSeries {
    count: number;
    barWidth?: number;
    barMaxWidth?: number;
    barMinWidth?: number;
    barGap?: number;
    barCategoryGap?: number;
}
declare type BarGridLayoutResult = BarWidthAndOffset[string][string][];

declare type CustomExtraElementInfo = Dictionary<unknown>;
declare const TRANSFORM_PROPS: {
    readonly x: 1;
    readonly y: 1;
    readonly scaleX: 1;
    readonly scaleY: 1;
    readonly originX: 1;
    readonly originY: 1;
    readonly rotation: 1;
};
declare type TransformProp = keyof typeof TRANSFORM_PROPS;
declare type TransitionAnyOption = {
    transition?: TransitionAnyProps;
    enterFrom?: Dictionary<unknown>;
    leaveTo?: Dictionary<unknown>;
};
declare type TransitionAnyProps = string | string[];
declare type TransitionTransformOption = {
    transition?: ElementRootTransitionProp | ElementRootTransitionProp[];
    enterFrom?: Dictionary<unknown>;
    leaveTo?: Dictionary<unknown>;
};
declare type ElementRootTransitionProp = TransformProp | 'shape' | 'extra' | 'style';
declare type ShapeMorphingOption = {
    morph?: boolean;
};
interface CustomBaseElementOption extends Partial<Pick<Element, TransformProp | 'silent' | 'ignore' | 'textConfig'>>, TransitionTransformOption {
    type: string;
    id?: string;
    name?: string;
    info?: CustomExtraElementInfo;
    textContent?: CustomTextOption | false;
    clipPath?: CustomZRPathOption | false;
    extra?: TransitionAnyOption;
    during?(params: typeof customDuringAPI): void;
    focus?: 'none' | 'self' | 'series' | ArrayLike<number>;
    blurScope?: BlurScope;
}
interface CustomDisplayableOption extends CustomBaseElementOption, Partial<Pick<Displayable, 'zlevel' | 'z' | 'z2' | 'invisible'>> {
    style?: ZRStyleProps & TransitionAnyOption;
    styleEmphasis?: ZRStyleProps | false;
    emphasis?: CustomDisplayableOptionOnState;
    blur?: CustomDisplayableOptionOnState;
    select?: CustomDisplayableOptionOnState;
}
interface CustomDisplayableOptionOnState extends Partial<Pick<Displayable, TransformProp | 'textConfig' | 'z2'>> {
    style?: (ZRStyleProps & TransitionAnyOption) | false;
}
interface CustomZRPathOption extends CustomDisplayableOption, ShapeMorphingOption {
    shape?: PathProps['shape'] & TransitionAnyOption;
    style?: CustomDisplayableOption['style'] & {
        decal?: DecalObject;
        __decalPattern?: PatternObject;
    };
}
interface CustomSVGPathOption extends CustomDisplayableOption, ShapeMorphingOption {
    type: 'path';
    shape?: {
        pathData?: string;
        d?: string;
        layout?: 'center' | 'cover';
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    } & TransitionAnyOption;
}
interface CustomImageOption extends CustomDisplayableOption {
    type: 'image';
    style?: ImageStyleProps & TransitionAnyOption;
    emphasis?: CustomImageOptionOnState;
    blur?: CustomImageOptionOnState;
    select?: CustomImageOptionOnState;
}
interface CustomImageOptionOnState extends CustomDisplayableOptionOnState {
    style?: ImageStyleProps & TransitionAnyOption;
}
interface CustomTextOption extends CustomDisplayableOption {
    type: 'text';
}
declare type CustomElementOption = CustomZRPathOption | CustomSVGPathOption | CustomImageOption | CustomTextOption;
interface CustomSeriesRenderItemAPI extends CustomSeriesRenderItemCoordinateSystemAPI {
    getWidth(): number;
    getHeight(): number;
    getZr(): ZRenderType;
    getDevicePixelRatio(): number;
    value(dim: DimensionLoose, dataIndexInside?: number): ParsedValue;
    ordinalRawValue(dim: DimensionLoose, dataIndexInside?: number): ParsedValue | OrdinalRawValue;
    style(userProps?: ZRStyleProps, dataIndexInside?: number): ZRStyleProps;
    styleEmphasis(userProps?: ZRStyleProps, dataIndexInside?: number): ZRStyleProps;
    visual<VT extends NonStyleVisualProps | StyleVisualProps>(visualType: VT, dataIndexInside?: number): VT extends NonStyleVisualProps ? DefaultDataVisual[VT] : VT extends StyleVisualProps ? PathStyleProps[typeof STYLE_VISUAL_TYPE[VT]] : void;
    barLayout(opt: BarGridLayoutOptionForCustomSeries): BarGridLayoutResult;
    currentSeriesIndices(): number[];
    font(opt: Pick<TextCommonOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>): string;
}
interface CustomSeriesRenderItemParamsCoordSys {
    type: string;
}
interface CustomSeriesRenderItemCoordinateSystemAPI {
    coord(data: OptionDataValue | OptionDataValue[], clamp?: boolean): number[];
    size?(dataSize: OptionDataValue | OptionDataValue[], dataItem: OptionDataValue | OptionDataValue[]): number | number[];
}
interface CustomSeriesRenderItemParams {
    context: Dictionary<unknown>;
    seriesId: string;
    seriesName: string;
    seriesIndex: number;
    coordSys: CustomSeriesRenderItemParamsCoordSys;
    dataInsideLength: number;
    encode: WrapEncodeDefRet;
}
declare type CustomSeriesRenderItem = (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => CustomElementOption;
interface CustomSeriesOption extends SeriesOption<never>, SeriesEncodeOptionMixin, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, SeriesOnSingleOptionMixin, SeriesOnGeoOptionMixin, SeriesOnCalendarOptionMixin {
    type?: 'custom';
    coordinateSystem?: string | 'none';
    renderItem?: CustomSeriesRenderItem;
    clip?: boolean;
}
declare const STYLE_VISUAL_TYPE: {
    readonly color: "fill";
    readonly borderColor: "stroke";
};
declare type StyleVisualProps = keyof typeof STYLE_VISUAL_TYPE;
declare const NON_STYLE_VISUAL_PROPS: {
    readonly symbol: 1;
    readonly symbolSize: 1;
    readonly symbolKeepAspect: 1;
    readonly legendSymbol: 1;
    readonly visualMeta: 1;
    readonly liftZ: 1;
    readonly decal: 1;
};
declare type NonStyleVisualProps = keyof typeof NON_STYLE_VISUAL_PROPS;
declare type PrepareCustomInfo = (coordSys: CoordinateSystem) => {
    coordSys: CustomSeriesRenderItemParamsCoordSys;
    api: CustomSeriesRenderItemCoordinateSystemAPI;
};
declare const customDuringAPI: {
    setTransform(key: TransformProp, val: unknown): any;
    getTransform(key: TransformProp): unknown;
    setShape(key: string, val: unknown): any;
    getShape(key: string): unknown;
    setStyle(key: string, val: unknown): any;
    getStyle(key: string): unknown;
    setExtra(key: string, val: unknown): any;
    getExtra(key: string): unknown;
};
declare type WrapEncodeDefRet = Dictionary<number[]>;
declare function install(registers: EChartsExtensionInstallRegisters): void;

interface CoordinateSystemCreator {
    create: (ecModel: GlobalModel, api: ExtensionAPI) => CoordinateSystemMaster[];
    dimensions?: DimensionName[];
    getDimensionsInfo?: () => DimensionDefinitionLoose[];
}
interface CoordinateSystemMaster {
    dimensions: DimensionName[];
    model?: ComponentModel;
    update?: (ecModel: GlobalModel, api: ExtensionAPI) => void;
    convertToPixel?(ecModel: GlobalModel, finder: ParsedModelFinder, value: ScaleDataValue | ScaleDataValue[]): number | number[];
    convertFromPixel?(ecModel: GlobalModel, finder: ParsedModelFinder, pixelValue: number | number[]): number | number[];
    containPoint(point: number[]): boolean;
    getAxes?: () => Axis[];
    axisPointerEnabled?: boolean;
    getTooltipAxes?: (dim: DimensionName | 'auto') => {
        baseAxes: Axis[];
        otherAxes: Axis[];
    };
    getRect?: () => RectLike;
}
interface CoordinateSystem {
    type: string;
    master?: CoordinateSystemMaster;
    dimensions: DimensionName[];
    model?: ComponentModel;
    dataToPoint(data: ScaleDataValue | ScaleDataValue[], reserved?: any, out?: number[]): number[];
    pointToData?(point: number[], reserved?: any, out?: number[]): number | number[];
    containPoint(point: number[]): boolean;
    getAxis?: (dim?: DimensionName) => Axis;
    getBaseAxis?: () => Axis;
    getOtherAxis?: (baseAxis: Axis) => Axis;
    clampData?: (data: ScaleDataValue[], out?: number[]) => number[];
    getRoamTransform?: () => MatrixArray;
    getArea?: () => CoordinateSystemClipArea;
    getBoundingRect?: () => BoundingRect;
    getAxesByScale?: (scaleType: string) => Axis[];
    prepareCustoms?: PrepareCustomInfo;
}
interface CoordinateSystemHostModel extends ComponentModel {
    coordinateSystem?: CoordinateSystemMaster;
}
interface CoordinateSystemClipArea {
    contain(x: number, y: number): boolean;
}

declare class LegendVisualProvider {
    private _getDataWithEncodedVisual;
    private _getRawData;
    constructor(getDataWithEncodedVisual: () => List, getRawData: () => List);
    getAllNames(): string[];
    containName(name: string): boolean;
    indexOfName(name: string): number;
    getItemVisual(dataIndex: number, key: string): any;
}

declare function makeStyleMapper(properties: readonly string[][], ignoreParent?: boolean): (model: Model, excludes?: readonly string[], includes?: readonly string[]) => PathStyleProps;

interface SeriesModel {
    preventIncremental(): boolean;
    getTooltipPosition(dataIndex: number): number[];
    getAxisTooltipData(dim: DimensionName[], value: ScaleDataValue, baseAxis: Axis): {
        dataIndices: number[];
        nestestValue: any;
    };
    getMarkerPosition(value: ScaleDataValue[]): number[];
    brushSelector(dataIndex: number, data: List, selectors: BrushCommonSelectorsForSeries, area: BrushSelectableArea): boolean;
    enableAriaDecal(): void;
}
declare class SeriesModel<Opt extends SeriesOption = SeriesOption> extends ComponentModel<Opt> {
    type: string;
    defaultOption: SeriesOption;
    seriesIndex: number;
    coordinateSystem: CoordinateSystem;
    dataTask: SeriesTask;
    pipelineContext: PipelineContext;
    __transientTransitionOpt: {
        from: DimensionLoose;
        to: DimensionLoose;
        dividingMethod: MorphDividingMethod;
    };
    legendVisualProvider: LegendVisualProvider;
    visualStyleAccessPath: string;
    visualDrawType: 'fill' | 'stroke';
    visualStyleMapper: ReturnType<typeof makeStyleMapper>;
    ignoreStyleOnData: boolean;
    useColorPaletteOnData: boolean;
    hasSymbolVisual: boolean;
    defaultSymbol: string;
    legendSymbol: string;
    private _selectedDataIndicesMap;
    readonly preventUsingHoverLayer: boolean;
    static protoInitialize: void;
    init(option: Opt, parentModel: Model, ecModel: GlobalModel): void;
    mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void;
    mergeOption(newSeriesOption: Opt, ecModel: GlobalModel): void;
    fillDataTextStyle(data: ArrayLike<any>): void;
    getInitialData(option: Opt, ecModel: GlobalModel): List;
    appendData(params: {
        data: ArrayLike<any>;
    }): void;
    getData(dataType?: SeriesDataType): List<this>;
    getAllData(): ({
        data: List;
        type?: SeriesDataType;
    })[];
    setData(data: List): void;
    getSource(): Source;
    getRawData(): List;
    getBaseAxis(): Axis;
    formatTooltip(dataIndex: number, multipleSeries?: boolean, dataType?: SeriesDataType): ReturnType<DataFormatMixin['formatTooltip']>;
    isAnimationEnabled(): boolean;
    restoreData(): void;
    getColorFromPalette(name: string, scope: any, requestColorNum?: number): ZRColor;
    coordDimToDataDim(coordDim: DimensionName): DimensionName[];
    getProgressive(): number | false;
    getProgressiveThreshold(): number;
    select(innerDataIndices: number[], dataType?: SeriesDataType): void;
    unselect(innerDataIndices: number[], dataType?: SeriesDataType): void;
    toggleSelect(innerDataIndices: number[], dataType?: SeriesDataType): void;
    getSelectedDataIndices(): number[];
    isSelected(dataIndex: number, dataType?: SeriesDataType): boolean;
    private _innerSelect;
    private _initSelectedMapFromData;
    static registerClass(clz: Constructor): Constructor;
}
interface SeriesModel<Opt extends SeriesOption = SeriesOption> extends DataFormatMixin, PaletteMixin<Opt>, DataHost {
    getShadowDim?(): string;
}

interface DatasetOption extends Pick<ComponentOption, 'type' | 'id' | 'name'>, Pick<SeriesEncodeOptionMixin, 'dimensions'> {
    mainType?: 'dataset';
    seriesLayoutBy?: SeriesLayoutBy;
    sourceHeader?: OptionSourceHeader;
    source?: OptionSourceData;
    fromDatasetIndex?: number;
    fromDatasetId?: string;
    transform?: DataTransformOption | PipedDataTransformOption;
    fromTransformResult?: number;
}
declare function install$1(registers: EChartsExtensionInstallRegisters): void;

interface SourceMetaRawOption {
    seriesLayoutBy: SeriesLayoutBy;
    sourceHeader: OptionSourceHeader;
    dimensions: DimensionDefinitionLoose[];
}
interface Source extends SourceImpl {
}
declare class SourceImpl {
    readonly data: OptionSourceData;
    readonly sourceFormat: SourceFormat;
    readonly seriesLayoutBy: SeriesLayoutBy;
    readonly dimensionsDefine: DimensionDefinition[];
    readonly encodeDefine: HashMap<OptionEncodeValue, DimensionName>;
    readonly startIndex: number;
    readonly dimensionsDetectedCount: number;
    readonly metaRawOption: SourceMetaRawOption;
    constructor(fields: {
        data: OptionSourceData;
        sourceFormat: SourceFormat;
        seriesLayoutBy?: SeriesLayoutBy;
        dimensionsDefine?: DimensionDefinition[];
        startIndex?: number;
        dimensionsDetectedCount?: number;
        metaRawOption?: SourceMetaRawOption;
        encodeDefine?: HashMap<OptionEncodeValue, DimensionName>;
    });
}

interface DataProvider {
    pure?: boolean;
    persistent?: boolean;
    getSource(): Source;
    count(): number;
    getItem(idx: number, out?: OptionDataItem): OptionDataItem;
    fillStorage?(start: number, end: number, out: ArrayLike$1<ParsedValue>[], extent: number[][]): void;
    appendData?(newData: ArrayLike$1<OptionDataItem>): void;
    clean?(): void;
}

declare class DataDimensionInfo {
    type?: DimensionType;
    name: string;
    displayName?: string;
    tooltip?: boolean;
    coordDim?: string;
    coordDimIndex?: number;
    index?: number;
    otherDims?: DataVisualDimensions;
    isExtraCoord?: boolean;
    isCalculationCoord?: boolean;
    defaultTooltip?: boolean;
    ordinalMeta?: OrdinalMeta;
    createInvertedIndices?: boolean;
    constructor(opt?: object | DataDimensionInfo);
}

declare class Graph {
    type: 'graph';
    readonly nodes: GraphNode[];
    readonly edges: GraphEdge[];
    data: List;
    edgeData: List;
    private _directed;
    private _nodesMap;
    private _edgesMap;
    constructor(directed?: boolean);
    isDirected(): boolean;
    addNode(id: string | number, dataIndex?: number): GraphNode;
    getNodeByIndex(dataIndex: number): GraphNode;
    getNodeById(id: string): GraphNode;
    addEdge(n1: GraphNode | number | string, n2: GraphNode | number | string, dataIndex?: number): GraphEdge;
    getEdgeByIndex(dataIndex: number): GraphEdge;
    getEdge(n1: string | GraphNode, n2: string | GraphNode): GraphEdge;
    eachNode<Ctx>(cb: (this: Ctx, node: GraphNode, idx: number) => void, context?: Ctx): void;
    eachEdge<Ctx>(cb: (this: Ctx, edge: GraphEdge, idx: number) => void, context?: Ctx): void;
    breadthFirstTraverse<Ctx>(cb: (this: Ctx, node: GraphNode, fromNode: GraphNode) => boolean | void, startNode: GraphNode | string, direction: 'none' | 'in' | 'out', context?: Ctx): void;
    update(): void;
    clone(): Graph;
}
interface GraphDataProxyMixin {
    getValue(dimension?: DimensionLoose): ParsedValue;
    setVisual(key: string | Dictionary<any>, value?: any): void;
    getVisual(key: string): any;
    setLayout(layout: any, merge?: boolean): void;
    getLayout(): any;
    getGraphicEl(): Element;
    getRawIndex(): number;
}
declare class GraphEdge {
    node1: GraphNode;
    node2: GraphNode;
    dataIndex: number;
    hostGraph: Graph;
    constructor(n1: GraphNode, n2: GraphNode, dataIndex?: number);
    getModel<T = unknown>(): Model<T>;
    getModel<T = unknown, S extends keyof T = keyof T>(path: S): Model<T[S]>;
    getAdjacentDataIndices(): {
        node: number[];
        edge: number[];
    };
}
interface GraphEdge extends GraphDataProxyMixin {
}
declare class GraphNode {
    id: string;
    inEdges: GraphEdge[];
    outEdges: GraphEdge[];
    edges: GraphEdge[];
    hostGraph: Graph;
    dataIndex: number;
    __visited: boolean;
    constructor(id?: string, dataIndex?: number);
    degree(): number;
    inDegree(): number;
    outDegree(): number;
    getModel<T = unknown>(): Model<T>;
    getModel<T = unknown, S extends keyof T = keyof T>(path: S): Model<T[S]>;
    getAdjacentDataIndices(): {
        node: number[];
        edge: number[];
    };
}
interface GraphNode extends GraphDataProxyMixin {
}

declare type TreeTraverseOrder = 'preorder' | 'postorder';
declare type TreeTraverseCallback<Ctx> = (this: Ctx, node: TreeNode) => boolean | void;
declare type TreeTraverseOption = {
    order?: TreeTraverseOrder;
    attr?: 'children' | 'viewChildren';
};
interface TreeNodeOption extends Pick<OptionDataItemObject<OptionDataValue>, 'name' | 'value'> {
    children?: TreeNodeOption[];
}
declare class TreeNode {
    name: string;
    depth: number;
    height: number;
    parentNode: TreeNode;
    dataIndex: number;
    children: TreeNode[];
    viewChildren: TreeNode[];
    isExpand: boolean;
    readonly hostTree: Tree<Model>;
    constructor(name: string, hostTree: Tree<Model>);
    isRemoved(): boolean;
    eachNode<Ctx>(options: TreeTraverseOrder, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(options: TreeTraverseOption, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    updateDepthAndHeight(depth: number): void;
    getNodeById(id: string): TreeNode;
    contains(node: TreeNode): boolean;
    getAncestors(includeSelf?: boolean): TreeNode[];
    getAncestorsIndices(): number[];
    getDescendantIndices(): number[];
    getValue(dimension?: DimensionLoose): ParsedValue;
    setLayout(layout: any, merge?: boolean): void;
    getLayout(): any;
    getModel<T = unknown>(): Model<T>;
    getLevelModel(): Model;
    setVisual(key: string, value: any): void;
    setVisual(obj: Dictionary<any>): void;
    getVisual(key: string): any;
    getRawIndex(): number;
    getId(): string;
    isAncestorOf(node: TreeNode): boolean;
    isDescendantOf(node: TreeNode): boolean;
}
declare class Tree<HostModel extends Model = Model, LevelOption = any> {
    type: 'tree';
    root: TreeNode;
    data: List;
    hostModel: HostModel;
    levelModels: Model<LevelOption>[];
    private _nodes;
    constructor(hostModel: HostModel);
    eachNode<Ctx>(options: TreeTraverseOrder, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(options: TreeTraverseOption, cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    eachNode<Ctx>(cb: TreeTraverseCallback<Ctx>, context?: Ctx): void;
    getNodeByDataIndex(dataIndex: number): TreeNode;
    getNodeById(name: string): TreeNode;
    update(): void;
    clearLayouts(): void;
    static createTree<T extends TreeNodeOption, HostModel extends Model, LevelOption>(dataRoot: T, hostModel: HostModel, beforeLink?: (data: List) => void): Tree<HostModel, any>;
}

declare type VisualOptionBase = {
    [key in BuiltinVisualProperty]?: any;
};
declare type LabelFormatter = (min: OptionDataValue, max?: OptionDataValue) => string;
interface VisualMapOption<T extends VisualOptionBase = VisualOptionBase> extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'visualMap';
    show?: boolean;
    align?: string;
    realtime?: boolean;
    seriesIndex?: 'all' | number[] | number;
    min?: number;
    max?: number;
    dimension?: number;
    inRange?: T;
    outOfRange?: T;
    controller?: {
        inRange?: T;
        outOfRange?: T;
    };
    target?: {
        inRange?: T;
        outOfRange?: T;
    };
    itemWidth?: number;
    itemHeight?: number;
    inverse?: boolean;
    orient?: 'horizontal' | 'vertical';
    backgroundColor?: ZRColor;
    contentColor?: ZRColor;
    inactiveColor?: ZRColor;
    padding?: number[] | number;
    textGap?: number;
    precision?: number;
    color?: ColorString[];
    formatter?: string | LabelFormatter;
    text?: string[];
    textStyle?: LabelOption;
    categories?: unknown;
}
interface VisualMeta {
    stops: {
        value: number;
        color: ColorString;
    }[];
    outerColors: ColorString[];
    dimension?: number;
}

declare const dataCtors: {
    float: ArrayConstructor | Float64ArrayConstructor;
    int: ArrayConstructor | Int32ArrayConstructor;
    ordinal: ArrayConstructor;
    number: ArrayConstructor;
    time: ArrayConstructor;
};
declare type ListDimensionType = keyof typeof dataCtors;
declare type DimValueGetter = (this: List, dataItem: any, dimName: DimensionName, dataIndex: number, dimIndex: DimensionIndex) => ParsedValue;
declare type ItrParamDims = DimensionLoose | Array<DimensionLoose>;
declare type CtxOrList<Ctx> = unknown extends Ctx ? List : Ctx;
declare type EachCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => void;
declare type EachCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => void;
declare type EachCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => void;
declare type EachCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => void;
declare type FilterCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => boolean;
declare type FilterCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => boolean;
declare type FilterCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => boolean;
declare type FilterCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => boolean;
declare type MapArrayCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => any;
declare type MapArrayCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => any;
declare type MapArrayCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => any;
declare type MapArrayCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => any;
declare type MapCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => ParsedValue | ParsedValue[];
declare type MapCb2<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, y: ParsedValue, idx: number) => ParsedValue | ParsedValue[];
interface DefaultDataVisual {
    style: PathStyleProps;
    drawType: 'fill' | 'stroke';
    symbol?: string;
    symbolSize?: number | number[];
    symbolRotate?: number;
    symbolKeepAspect?: boolean;
    liftZ?: number;
    legendSymbol?: string;
    visualMeta?: VisualMeta[];
    colorFromPalette?: boolean;
    decal?: DecalObject;
}
interface DataCalculationInfo<SERIES_MODEL> {
    stackedDimension: string;
    stackedByDimension: string;
    isStackedByIndex: boolean;
    stackedOverDimension: string;
    stackResultDimension: string;
    stackedOnSeries?: SERIES_MODEL;
}
declare class List<HostModel extends Model = Model, Visual extends DefaultDataVisual = DefaultDataVisual> {
    readonly type = "list";
    readonly dimensions: string[];
    private _dimensionInfos;
    readonly hostModel: HostModel;
    dataType: SeriesDataType;
    graph?: Graph;
    tree?: Tree;
    private _indices;
    private _count;
    private _rawCount;
    private _storage;
    private _storageArr;
    private _nameList;
    private _idList;
    private _visual;
    private _layout;
    private _itemVisuals;
    private _itemLayouts;
    private _graphicEls;
    private _rawData;
    private _rawExtent;
    private _extent;
    private _approximateExtent;
    private _dimensionsSummary;
    private _invertedIndicesMap;
    private _calculationInfo;
    readonly userOutput: DimensionUserOuput;
    hasItemOption: boolean;
    defaultDimValueGetter: DimValueGetter;
    private _dimValueGetter;
    private _dimValueGetterArrayRows;
    private _nameRepeatCount;
    private _nameDimIdx;
    private _nameOrdinalMeta;
    private _idDimIdx;
    private _idOrdinalMeta;
    private _dontMakeIdFromName;
    private __wrappedMethods;
    TRANSFERABLE_METHODS: readonly ["cloneShallow", "downSample", "lttbDownSample", "map"];
    CHANGABLE_METHODS: readonly ["filterSelf", "selectRange"];
    DOWNSAMPLE_METHODS: readonly ["downSample", "lttbDownSample"];
    constructor(dimensions: Array<string | object | DataDimensionInfo>, hostModel: HostModel);
    getDimension(dim: DimensionLoose): DimensionName;
    getDimensionInfo(dim: DimensionLoose): DataDimensionInfo;
    getDimensionsOnCoord(): DimensionName[];
    mapDimension(coordDim: DimensionName): DimensionName;
    mapDimension(coordDim: DimensionName, idx: number): DimensionName;
    mapDimensionsAll(coordDim: DimensionName): DimensionName[];
    initData(data: Source | OptionSourceData | DataProvider, nameList?: string[], dimValueGetter?: DimValueGetter): void;
    getProvider(): DataProvider;
    appendData(data: ArrayLike$1<any>): void;
    appendValues(values: any[][], names?: string[]): void;
    private _initDataFromProvider;
    count(): number;
    getIndices(): ArrayLike$1<number>;
    getByDimIdx(dimIdx: number, idx: number): ParsedValue;
    get(dim: DimensionName, idx: number): ParsedValue;
    getByRawIndex(dim: DimensionName, rawIdx: number): ParsedValue;
    getValues(idx: number): ParsedValue[];
    getValues(dimensions: readonly DimensionName[], idx: number): ParsedValue[];
    hasValue(idx: number): boolean;
    getDataExtent(dim: DimensionLoose): [number, number];
    getApproximateExtent(dim: DimensionLoose): [number, number];
    setApproximateExtent(extent: [number, number], dim: DimensionLoose): void;
    getCalculationInfo<CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>>(key: CALC_INFO_KEY): DataCalculationInfo<HostModel>[CALC_INFO_KEY];
    setCalculationInfo(key: DataCalculationInfo<HostModel>): void;
    setCalculationInfo<CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>>(key: CALC_INFO_KEY, value: DataCalculationInfo<HostModel>[CALC_INFO_KEY]): void;
    getSum(dim: DimensionName): number;
    getMedian(dim: DimensionLoose): number;
    rawIndexOf(dim: DimensionName, value: OrdinalNumber): number;
    indexOfName(name: string): number;
    indexOfRawIndex(rawIndex: number): number;
    indicesOfNearest(dim: DimensionName, value: number, maxDistance?: number): number[];
    getRawIndex: (idx: number) => number;
    getRawDataItem(idx: number): OptionDataItem;
    getName(idx: number): string;
    getId(idx: number): string;
    each<Ctx>(cb: EachCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: DimensionLoose, cb: EachCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: [DimensionLoose], cb: EachCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: EachCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    each<Ctx>(dims: ItrParamDims, cb: EachCb<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void;
    filterSelf<Ctx>(cb: FilterCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: DimensionLoose, cb: FilterCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: [DimensionLoose], cb: FilterCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: FilterCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    filterSelf<Ctx>(dims: ItrParamDims, cb: FilterCb<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this;
    selectRange(range: {
        [dimName: string]: [number, number];
    }): List;
    mapArray<Ctx, Cb extends MapArrayCb0<Ctx>>(cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb1<Ctx>>(dims: DimensionLoose, cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb1<Ctx>>(dims: [DimensionLoose], cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb2<Ctx>>(dims: [DimensionLoose, DimensionLoose], cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    mapArray<Ctx, Cb extends MapArrayCb<Ctx>>(dims: ItrParamDims, cb: Cb, ctx?: Ctx, ctxCompat?: Ctx): ReturnType<Cb>[];
    map<Ctx>(dims: DimensionLoose, cb: MapCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    map<Ctx>(dims: [DimensionLoose], cb: MapCb1<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    map<Ctx>(dims: [DimensionLoose, DimensionLoose], cb: MapCb2<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): List<HostModel>;
    downSample(dimension: DimensionName, rate: number, sampleValue: (frameValues: ArrayLike$1<ParsedValue>) => ParsedValueNumeric, sampleIndex: (frameValues: ArrayLike$1<ParsedValue>, value: ParsedValueNumeric) => number): List<HostModel>;
    lttbDownSample(valueDimension: DimensionName, rate: number): List<Model<any>, DefaultDataVisual>;
    getItemModel<ItemOpts extends unknown = unknown>(idx: number): Model<ItemOpts>;
    diff(otherList: List): DataDiffer;
    getVisual<K extends keyof Visual>(key: K): Visual[K];
    setVisual<K extends keyof Visual>(key: K, val: Visual[K]): void;
    setVisual(kvObj: Partial<Visual>): void;
    getItemVisual<K extends keyof Visual>(idx: number, key: K): Visual[K];
    hasItemVisual(): boolean;
    ensureUniqueItemVisual<K extends keyof Visual>(idx: number, key: K): Visual[K];
    setItemVisual<K extends keyof Visual>(idx: number, key: K, value: Visual[K]): void;
    setItemVisual(idx: number, kvObject: Partial<Visual>): void;
    clearAllVisual(): void;
    setLayout(key: string, val: any): void;
    setLayout(kvObj: Dictionary<any>): void;
    getLayout(key: string): any;
    getItemLayout(idx: number): any;
    setItemLayout<M = false>(idx: number, layout: (M extends true ? Dictionary<any> : any), merge?: M): void;
    clearItemLayouts(): void;
    setItemGraphicEl(idx: number, el: Element): void;
    getItemGraphicEl(idx: number): Element;
    eachItemGraphicEl<Ctx = unknown>(cb: (this: Ctx, el: Element, idx: number) => void, context?: Ctx): void;
    cloneShallow(list?: List<HostModel>): List<HostModel>;
    wrapMethod(methodName: FunctionPropertyNames<List>, injectFunction: (...args: any) => any): void;
    private static internalField;
}
interface List {
    getLinkedData(dataType?: SeriesDataType): List;
    getLinkedDataAll(): {
        data: List;
        type?: SeriesDataType;
    }[];
}

declare type ModelFinderIndexQuery = number | number[] | 'all' | 'none' | false;
declare type ModelFinderIdQuery = OptionId | OptionId[];
declare type ModelFinderNameQuery = OptionId | OptionId[];
declare type ModelFinder$1 = string | ModelFinderObject;
declare type ModelFinderObject = {
    seriesIndex?: ModelFinderIndexQuery;
    seriesId?: ModelFinderIdQuery;
    seriesName?: ModelFinderNameQuery;
    geoIndex?: ModelFinderIndexQuery;
    geoId?: ModelFinderIdQuery;
    geoName?: ModelFinderNameQuery;
    bmapIndex?: ModelFinderIndexQuery;
    bmapId?: ModelFinderIdQuery;
    bmapName?: ModelFinderNameQuery;
    xAxisIndex?: ModelFinderIndexQuery;
    xAxisId?: ModelFinderIdQuery;
    xAxisName?: ModelFinderNameQuery;
    yAxisIndex?: ModelFinderIndexQuery;
    yAxisId?: ModelFinderIdQuery;
    yAxisName?: ModelFinderNameQuery;
    gridIndex?: ModelFinderIndexQuery;
    gridId?: ModelFinderIdQuery;
    gridName?: ModelFinderNameQuery;
    [key: string]: unknown;
};
declare type ParsedModelFinder = {
    [key: string]: ComponentModel | ComponentModel[] | undefined;
};
declare type QueryReferringOpt = {
    useDefault?: boolean;
    enableAll?: boolean;
    enableNone?: boolean;
};

declare class ComponentModel<Opt extends ComponentOption = ComponentOption> extends Model<Opt> {
    type: ComponentFullType;
    id: string;
    name: string;
    mainType: ComponentMainType;
    subType: ComponentSubType;
    componentIndex: number;
    protected defaultOption: ComponentOption;
    ecModel: GlobalModel;
    static dependencies: string[];
    readonly uid: string;
    static layoutMode: ComponentLayoutMode | ComponentLayoutMode['type'];
    preventAutoZ: boolean;
    __viewId: string;
    __requireNewView: boolean;
    static protoInitialize: void;
    constructor(option: Opt, parentModel: Model, ecModel: GlobalModel);
    init(option: Opt, parentModel: Model, ecModel: GlobalModel): void;
    mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void;
    mergeOption(option: Opt, ecModel: GlobalModel): void;
    optionUpdated(newCptOption: Opt, isInit: boolean): void;
    getDefaultOption(): Opt;
    getReferringComponents(mainType: ComponentMainType, opt: QueryReferringOpt): {
        models: ComponentModel[];
        specified: boolean;
    };
    getBoxLayoutParams(): {
        left: string | number;
        top: string | number;
        right: string | number;
        bottom: string | number;
        width: string | number;
        height: string | number;
    };
    static registerClass: ClassManager['registerClass'];
    static hasClass: ClassManager['hasClass'];
    static registerSubTypeDefaulter: SubTypeDefaulterManager['registerSubTypeDefaulter'];
}

declare class OptionManager {
    private _api;
    private _timelineOptions;
    private _mediaList;
    private _mediaDefault;
    private _currentMediaIndices;
    private _optionBackup;
    private _newBaseOption;
    constructor(api: ExtensionAPI);
    setOption(rawOption: ECBasicOption, optionPreprocessorFuncs: OptionPreprocessor[], opt: InnerSetOptionOpts): void;
    mountOption(isRecreate: boolean): ECUnitOption;
    getTimelineOption(ecModel: GlobalModel): ECUnitOption;
    getMediaOption(ecModel: GlobalModel): ECUnitOption[];
}

interface GlobalModelSetOptionOpts {
    replaceMerge: ComponentMainType | ComponentMainType[];
}
interface InnerSetOptionOpts {
    replaceMergeMainTypeMap: HashMap<boolean, string>;
}
interface QueryConditionKindA {
    mainType: ComponentMainType;
    subType?: ComponentSubType;
    query?: {
        [k: string]: number | number[] | string | string[];
    };
    filter?: (cmpt: ComponentModel) => boolean;
}
interface QueryConditionKindB {
    mainType: ComponentMainType;
    subType?: ComponentSubType;
    index?: number | number[];
    id?: OptionId | OptionId[];
    name?: OptionName | OptionName[];
}
interface EachComponentAllCallback {
    (mainType: string, model: ComponentModel, componentIndex: number): void;
}
interface EachComponentInMainTypeCallback {
    (model: ComponentModel, componentIndex: number): void;
}
declare class GlobalModel extends Model<ECUnitOption> {
    option: ECUnitOption;
    private _theme;
    private _locale;
    private _optionManager;
    private _componentsMap;
    private _componentsCount;
    private _seriesIndices;
    private _seriesIndicesMap;
    private _payload;
    scheduler: Scheduler;
    init(option: ECBasicOption, parentModel: Model, ecModel: GlobalModel, theme: object, locale: object, optionManager: OptionManager): void;
    setOption(option: ECBasicOption, opts: GlobalModelSetOptionOpts, optionPreprocessorFuncs: OptionPreprocessor[]): void;
    resetOption(type: 'recreate' | 'timeline' | 'media', opt?: Pick<GlobalModelSetOptionOpts, 'replaceMerge'>): boolean;
    private _resetOption;
    mergeOption(option: ECUnitOption): void;
    private _mergeOption;
    getOption(): ECUnitOption;
    getTheme(): Model;
    getLocaleModel(): Model<LocaleOption>;
    getLocale(localePosition: Parameters<Model<LocaleOption>['get']>[0]): any;
    setUpdatePayload(payload: Payload): void;
    getUpdatePayload(): Payload;
    getComponent(mainType: ComponentMainType, idx?: number): ComponentModel;
    queryComponents(condition: QueryConditionKindB): ComponentModel[];
    findComponents(condition: QueryConditionKindA): ComponentModel[];
    eachComponent<T>(cb: EachComponentAllCallback, context?: T): void;
    eachComponent<T>(mainType: string, cb: EachComponentInMainTypeCallback, context?: T): void;
    eachComponent<T>(mainType: QueryConditionKindA, cb: EachComponentInMainTypeCallback, context?: T): void;
    getSeriesByName(name: OptionName): SeriesModel[];
    getSeriesByIndex(seriesIndex: number): SeriesModel;
    getSeriesByType(subType: ComponentSubType): SeriesModel[];
    getSeries(): SeriesModel[];
    getSeriesCount(): number;
    eachSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachRawSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachSeriesByType<T>(subType: ComponentSubType, cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachRawSeriesByType<T>(subType: ComponentSubType, cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    isSeriesFiltered(seriesModel: SeriesModel): boolean;
    getCurrentSeriesIndices(): number[];
    filterSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => boolean, context?: T): void;
    restoreData(payload?: Payload): void;
    private static internalField;
}
interface GlobalModel extends PaletteMixin<ECUnitOption> {
}

interface DataFormatMixin extends DataHost {
    ecModel: GlobalModel;
    mainType: ComponentMainType;
    subType: ComponentSubType;
    componentIndex: number;
    id: string;
    name: string;
    animatedValue: OptionDataValue[];
}
declare class DataFormatMixin {
    getDataParams(dataIndex: number, dataType?: SeriesDataType): CallbackDataParams;
    getFormattedLabel(dataIndex: number, status?: DisplayState, dataType?: SeriesDataType, labelDimIndex?: number, formatter?: string | ((params: object) => string), extendParams?: {
        interpolatedValue: InterpolatableValue;
    }): string;
    getRawValue(idx: number, dataType?: SeriesDataType): unknown;
    formatTooltip(dataIndex: number, multipleSeries?: boolean, dataType?: string): TooltipFormatResult;
}
declare type TooltipFormatResult = string | TooltipMarkupBlockFragment;

declare type RendererType = 'canvas' | 'svg';
declare type LayoutOrient = 'vertical' | 'horizontal';
declare type HorizontalAlign = 'left' | 'center' | 'right';
declare type VerticalAlign = 'top' | 'middle' | 'bottom';
declare type ColorString = string;
declare type ZRColor = ColorString | LinearGradientObject | RadialGradientObject | PatternObject;
declare type ZRLineType = 'solid' | 'dotted' | 'dashed' | number | number[];
declare type ZRFontStyle = 'normal' | 'italic' | 'oblique';
declare type ZRFontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
declare type ZREasing = AnimationEasing;
declare type ZRTextAlign = TextAlign;
declare type ZRTextVerticalAlign = TextVerticalAlign;
declare type ZRRectLike = RectLike;
declare type ZRStyleProps = PathStyleProps | ImageStyleProps | TSpanStyleProps | TextStyleProps;
declare type ComponentFullType = string;
declare type ComponentMainType = keyof ECUnitOption & string;
declare type ComponentSubType = Exclude<ComponentOption['type'], undefined>;
interface DataHost {
    getData(dataType?: SeriesDataType): List;
}
interface DataModel extends DataHost, DataFormatMixin {
}
interface PayloadItem {
    excludeSeriesId?: OptionId | OptionId[];
    animation?: PayloadAnimationPart;
    [other: string]: any;
}
interface Payload extends PayloadItem {
    type: string;
    escapeConnect?: boolean;
    batch?: PayloadItem[];
}
interface PayloadAnimationPart {
    duration?: number;
    easing?: AnimationEasing;
    delay?: number;
}
interface ViewRootGroup extends Group {
    __ecComponentInfo?: {
        mainType: string;
        index: number;
    };
}
interface ECEvent extends ECEventData {
    type: string;
    componentType?: string;
    componentIndex?: number;
    seriesIndex?: number;
    escapeConnect?: boolean;
    event?: ElementEvent;
    batch?: ECEventData;
}
interface ECEventData {
    [key: string]: any;
}
interface EventQueryItem {
    [key: string]: any;
}
interface ActionInfo {
    type: string;
    event?: string;
    update?: string;
}
interface ActionHandler {
    (payload: Payload, ecModel: GlobalModel, api: ExtensionAPI): void | ECEventData;
}
interface OptionPreprocessor {
    (option: ECUnitOption, isTheme: boolean): void;
}
interface PostUpdater {
    (ecModel: GlobalModel, api: ExtensionAPI): void;
}
interface StageHandlerReset {
    (seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): StageHandlerProgressExecutor | StageHandlerProgressExecutor[] | void;
}
interface StageHandlerOverallReset {
    (ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void;
}
interface StageHandler {
    createOnAllSeries?: boolean;
    seriesType?: string;
    getTargetSeries?: (ecModel: GlobalModel, api: ExtensionAPI) => HashMap<SeriesModel>;
    performRawSeries?: boolean;
    plan?: StageHandlerPlan;
    overallReset?: StageHandlerOverallReset;
    reset?: StageHandlerReset;
}
interface StageHandlerInternal extends StageHandler {
    uid: string;
    visualType?: 'layout' | 'visual';
    __prio: number;
    __raw: StageHandler | StageHandlerOverallReset;
    isVisual?: boolean;
    isLayout?: boolean;
}
declare type StageHandlerProgressParams = TaskProgressParams;
interface StageHandlerProgressExecutor {
    dataEach?: (data: List, idx: number) => void;
    progress?: (params: StageHandlerProgressParams, data: List) => void;
}
declare type StageHandlerPlanReturn = TaskPlanCallbackReturn;
interface StageHandlerPlan {
    (seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): StageHandlerPlanReturn;
}
interface LoadingEffectCreator {
    (api: ExtensionAPI, cfg: object): LoadingEffect;
}
interface LoadingEffect extends Element {
    resize: () => void;
}
declare type TooltipRenderMode = 'html' | 'richText';
declare type TooltipOrderMode = 'valueAsc' | 'valueDesc' | 'seriesAsc' | 'seriesDesc';
declare type OrdinalRawValue = string | number;
declare type OrdinalNumber = number;
declare type OrdinalSortInfo = {
    ordinalNumbers: OrdinalNumber[];
};
declare type ParsedValue = ParsedValueNumeric | OrdinalRawValue;
declare type ParsedValueNumeric = number | OrdinalNumber;
declare type ScaleDataValue = ParsedValueNumeric | OrdinalRawValue | Date;
interface ScaleTick {
    value: number;
}
declare type DimensionIndex = number;
declare type DimensionIndexLoose = DimensionIndex | string;
declare type DimensionName = string;
declare type DimensionLoose = DimensionName | DimensionIndexLoose;
declare type DimensionType = ListDimensionType;
interface DataVisualDimensions {
    tooltip?: DimensionIndex | false;
    label?: DimensionIndex;
    itemName?: DimensionIndex;
    itemId?: DimensionIndex;
    seriesName?: DimensionIndex;
}
declare type DimensionDefinition = {
    type?: ListDimensionType;
    name?: DimensionName;
    displayName?: string;
};
declare type DimensionDefinitionLoose = DimensionDefinition['name'] | DimensionDefinition;
declare const SOURCE_FORMAT_ORIGINAL: "original";
declare const SOURCE_FORMAT_ARRAY_ROWS: "arrayRows";
declare const SOURCE_FORMAT_OBJECT_ROWS: "objectRows";
declare const SOURCE_FORMAT_KEYED_COLUMNS: "keyedColumns";
declare const SOURCE_FORMAT_TYPED_ARRAY: "typedArray";
declare const SOURCE_FORMAT_UNKNOWN: "unknown";
declare type SourceFormat = typeof SOURCE_FORMAT_ORIGINAL | typeof SOURCE_FORMAT_ARRAY_ROWS | typeof SOURCE_FORMAT_OBJECT_ROWS | typeof SOURCE_FORMAT_KEYED_COLUMNS | typeof SOURCE_FORMAT_TYPED_ARRAY | typeof SOURCE_FORMAT_UNKNOWN;
declare const SERIES_LAYOUT_BY_COLUMN: "column";
declare const SERIES_LAYOUT_BY_ROW: "row";
declare type SeriesLayoutBy = typeof SERIES_LAYOUT_BY_COLUMN | typeof SERIES_LAYOUT_BY_ROW;
declare type OptionSourceHeader = boolean | 'auto' | number;
declare type SeriesDataType = 'main' | 'node' | 'edge';
declare type ECUnitOption = {
    baseOption?: unknown;
    options?: unknown;
    media?: unknown;
    timeline?: ComponentOption | ComponentOption[];
    backgroundColor?: ZRColor;
    darkMode?: boolean | 'auto';
    textStyle?: Pick<LabelOption, 'color' | 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>;
    useUTC?: boolean;
    [key: string]: ComponentOption | ComponentOption[] | Dictionary<unknown> | unknown;
    stateAnimation?: AnimationOption$1;
} & AnimationOptionMixin & ColorPaletteOptionMixin;
interface ECBasicOption extends ECUnitOption {
    baseOption?: ECUnitOption;
    timeline?: ComponentOption | ComponentOption[];
    options?: ECUnitOption[];
    media?: MediaUnit[];
}
declare type OptionSourceData<VAL extends OptionDataValue = OptionDataValue, ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>> = OptionSourceDataOriginal<VAL, ORIITEM> | OptionSourceDataObjectRows<VAL> | OptionSourceDataArrayRows<VAL> | OptionSourceDataKeyedColumns<VAL> | OptionSourceDataTypedArray;
declare type OptionDataItemOriginal<VAL extends OptionDataValue = OptionDataValue> = VAL | VAL[] | OptionDataItemObject<VAL>;
declare type OptionSourceDataOriginal<VAL extends OptionDataValue = OptionDataValue, ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>> = ArrayLike<ORIITEM>;
declare type OptionSourceDataObjectRows<VAL extends OptionDataValue = OptionDataValue> = Array<Dictionary<VAL>>;
declare type OptionSourceDataArrayRows<VAL extends OptionDataValue = OptionDataValue> = Array<Array<VAL>>;
declare type OptionSourceDataKeyedColumns<VAL extends OptionDataValue = OptionDataValue> = Dictionary<ArrayLike<VAL>>;
declare type OptionSourceDataTypedArray = ArrayLike<number>;
declare type OptionDataItem = OptionDataValue | Dictionary<OptionDataValue> | OptionDataValue[] | OptionDataItemObject<OptionDataValue>;
declare type OptionDataItemObject<T> = {
    id?: OptionId;
    name?: OptionName;
    value?: T[] | T;
    selected?: boolean;
};
declare type OptionId = string | number;
declare type OptionName = string | number;
interface GraphEdgeItemObject<VAL extends OptionDataValue> extends OptionDataItemObject<VAL> {
    source?: string | number;
    target?: string | number;
}
declare type OptionDataValue = string | number | Date;
declare type OptionDataValueNumeric = number | '-';
declare type OptionDataValueDate = Date | string | number;
declare type ModelOption = any;
declare type ThemeOption = Dictionary<any>;
declare type DisplayState = 'normal' | 'emphasis' | 'blur' | 'select';
interface OptionEncodeVisualDimensions {
    tooltip?: OptionEncodeValue;
    label?: OptionEncodeValue;
    itemName?: OptionEncodeValue;
    itemId?: OptionEncodeValue;
    seriesName?: OptionEncodeValue;
}
interface OptionEncode extends OptionEncodeVisualDimensions {
    [coordDim: string]: OptionEncodeValue | undefined;
}
declare type OptionEncodeValue = DimensionLoose | DimensionLoose[];
declare type EncodeDefaulter = (source: Source, dimCount: number) => OptionEncode;
interface CallbackDataParams {
    componentType: string;
    componentSubType: string;
    componentIndex: number;
    seriesType?: string;
    seriesIndex?: number;
    seriesId?: string;
    seriesName?: string;
    name: string;
    dataIndex: number;
    data: OptionDataItem;
    dataType?: SeriesDataType;
    value: OptionDataItem | OptionDataValue;
    color?: ZRColor;
    borderColor?: string;
    dimensionNames?: DimensionName[];
    encode?: DimensionUserOuputEncode;
    marker?: TooltipMarker;
    status?: DisplayState;
    dimensionIndex?: number;
    percent?: number;
    $vars: string[];
}
declare type InterpolatableValue = ParsedValue | ParsedValue[];
declare type DimensionUserOuputEncode = {
    [coordOrVisualDimName: string]: DimensionIndex[];
};
declare type DimensionUserOuput = {
    dimensionNames: DimensionName[];
    encode: DimensionUserOuputEncode;
};
declare type DecalDashArrayX = number | (number | number[])[];
declare type DecalDashArrayY = number | number[];
interface DecalObject {
    symbol?: string | string[];
    symbolSize?: number;
    symbolKeepAspect?: boolean;
    color?: string;
    backgroundColor?: string;
    dashArrayX?: DecalDashArrayX;
    dashArrayY?: DecalDashArrayY;
    rotation?: number;
    maxTileWidth?: number;
    maxTileHeight?: number;
}
interface MediaQuery {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    minAspectRatio?: number;
    maxAspectRatio?: number;
}
declare type MediaUnit = {
    query?: MediaQuery;
    option: ECUnitOption;
};
declare type ComponentLayoutMode = {
    type?: 'box';
    ignoreSize?: boolean | boolean[];
};
declare type PaletteOptionMixin = ColorPaletteOptionMixin;
interface ColorPaletteOptionMixin {
    color?: ZRColor | ZRColor[];
    colorLayer?: ZRColor[][];
}
interface AriaLabelOption {
    enabled?: boolean;
    description?: string;
    general?: {
        withTitle?: string;
        withoutTitle?: string;
    };
    series?: {
        maxCount?: number;
        single?: {
            prefix?: string;
            withName?: string;
            withoutName?: string;
        };
        multiple?: {
            prefix?: string;
            withName?: string;
            withoutName?: string;
            separator?: {
                middle?: string;
                end?: string;
            };
        };
    };
    data?: {
        maxCount?: number;
        allData?: string;
        partialData?: string;
        withName?: string;
        withoutName?: string;
        separator?: {
            middle?: string;
            end?: string;
        };
    };
}
interface AriaOption extends AriaLabelOption {
    mainType?: 'aria';
    enabled?: boolean;
    label?: AriaLabelOption;
    decal?: {
        show?: boolean;
        decals?: DecalObject | DecalObject[];
    };
}
interface BoxLayoutOptionMixin {
    width?: number | string;
    height?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
}
interface CircleLayoutOptionMixin {
    center?: (number | string)[];
    radius?: (number | string)[] | number | string;
}
interface ShadowOptionMixin {
    shadowBlur?: number;
    shadowColor?: ColorString;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}
interface BorderOptionMixin {
    borderColor?: string;
    borderWidth?: number;
    borderType?: ZRLineType;
    borderCap?: CanvasLineCap;
    borderJoin?: CanvasLineJoin;
    borderDashOffset?: number;
    borderMiterLimit?: number;
}
declare type AnimationDelayCallbackParam = {
    count: number;
    index: number;
};
declare type AnimationDurationCallback = (idx: number) => number;
declare type AnimationDelayCallback = (idx: number, params?: AnimationDelayCallbackParam) => number;
interface AnimationOption$1 {
    duration?: number;
    easing?: AnimationEasing;
    delay?: number;
}
interface AnimationOptionMixin {
    animation?: boolean;
    animationThreshold?: number;
    animationDuration?: number | AnimationDurationCallback;
    animationEasing?: AnimationEasing;
    animationDelay?: number | AnimationDelayCallback;
    animationDurationUpdate?: number | AnimationDurationCallback;
    animationEasingUpdate?: AnimationEasing;
    animationDelayUpdate?: number | AnimationDelayCallback;
}
interface RoamOptionMixin {
    roam?: boolean | 'pan' | 'move' | 'zoom' | 'scale';
    center?: number[];
    zoom?: number;
    scaleLimit?: {
        min?: number;
        max?: number;
    };
}
declare type SymbolSizeCallback<T> = (rawValue: any, params: T) => number | number[];
declare type SymbolCallback<T> = (rawValue: any, params: T) => string;
declare type SymbolRotateCallback<T> = (rawValue: any, params: T) => number;
interface SymbolOptionMixin<T = unknown> {
    symbol?: string | (unknown extends T ? never : SymbolCallback<T>);
    symbolSize?: number | number[] | (unknown extends T ? never : SymbolSizeCallback<T>);
    symbolRotate?: number | (unknown extends T ? never : SymbolRotateCallback<T>);
    symbolKeepAspect?: boolean;
    symbolOffset?: (string | number)[];
}
interface ItemStyleOption extends ShadowOptionMixin, BorderOptionMixin {
    color?: ZRColor;
    opacity?: number;
    decal?: DecalObject | 'none';
}
interface LineStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
    width?: number;
    color?: Clr;
    opacity?: number;
    type?: ZRLineType;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    dashOffset?: number;
    miterLimit?: number;
}
interface AreaStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
    color?: Clr;
    opacity?: number;
}
interface VisualOptionUnit {
    symbol?: string;
    symbolSize?: number;
    color?: ColorString;
    colorAlpha?: number;
    opacity?: number;
    colorLightness?: number;
    colorSaturation?: number;
    colorHue?: number;
    decal?: DecalObject;
    liftZ?: number;
}
declare type VisualOptionFixed = VisualOptionUnit;
declare type VisualOptionPiecewise = VisualOptionUnit;
declare type BuiltinVisualProperty = keyof VisualOptionUnit;
interface TextCommonOption extends ShadowOptionMixin {
    color?: string;
    fontStyle?: ZRFontStyle;
    fontWeight?: ZRFontWeight;
    fontFamily?: string;
    fontSize?: number | string;
    align?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    baseline?: VerticalAlign;
    opacity?: number;
    lineHeight?: number;
    backgroundColor?: ColorString | {
        image: ImageLike | string;
    };
    borderColor?: string;
    borderWidth?: number;
    borderType?: ZRLineType;
    borderDashOffset?: number;
    borderRadius?: number | number[];
    padding?: number | number[];
    width?: number | string;
    height?: number;
    textBorderColor?: string;
    textBorderWidth?: number;
    textBorderType?: ZRLineType;
    textBorderDashOffset?: number;
    textShadowBlur?: number;
    textShadowColor?: string;
    textShadowOffsetX?: number;
    textShadowOffsetY?: number;
    tag?: string;
}
interface LabelFormatterCallback<T = CallbackDataParams> {
    (params: T): string;
}
interface LabelOption extends TextCommonOption {
    show?: boolean;
    position?: ElementTextConfig['position'];
    distance?: number;
    rotate?: number;
    offset?: number[];
    minMargin?: number;
    overflow?: TextStyleProps['overflow'];
    silent?: boolean;
    precision?: number | 'auto';
    valueAnimation?: boolean;
    rich?: Dictionary<TextCommonOption>;
}
interface SeriesLabelOption extends LabelOption {
    formatter?: string | LabelFormatterCallback<CallbackDataParams>;
}
interface LineLabelOption extends Omit<LabelOption, 'distance' | 'position'> {
    position?: 'start' | 'middle' | 'end' | 'insideStart' | 'insideStartTop' | 'insideStartBottom' | 'insideMiddle' | 'insideMiddleTop' | 'insideMiddleBottom' | 'insideEnd' | 'insideEndTop' | 'insideEndBottom' | 'insideMiddleBottom';
    distance?: number | number[];
}
interface LabelLineOption {
    show?: boolean;
    showAbove?: boolean;
    length?: number;
    length2?: number;
    smooth?: boolean | number;
    minTurnAngle?: number;
    lineStyle?: LineStyleOption;
}
interface SeriesLineLabelOption extends LineLabelOption {
    formatter?: string | LabelFormatterCallback<CallbackDataParams>;
}
interface LabelLayoutOptionCallbackParams {
    dataIndex?: number;
    dataType?: SeriesDataType;
    seriesIndex: number;
    text: string;
    align: ZRTextAlign;
    verticalAlign: ZRTextVerticalAlign;
    rect: RectLike;
    labelRect: RectLike;
    labelLinePoints?: number[][];
}
interface LabelLayoutOption {
    moveOverlap?: 'shiftX' | 'shiftY' | 'shuffleX' | 'shuffleY';
    hideOverlap?: boolean;
    draggable?: boolean;
    x?: number | string;
    y?: number | string;
    dx?: number;
    dy?: number;
    rotate?: number;
    align?: ZRTextAlign;
    verticalAlign?: ZRTextVerticalAlign;
    width?: number;
    height?: number;
    fontSize?: number;
    labelLinePoints?: number[][];
}
declare type LabelLayoutOptionCallback = (params: LabelLayoutOptionCallbackParams) => LabelLayoutOption;
interface TooltipFormatterCallback<T> {
    (params: T, asyncTicket: string): string | HTMLElement[];
    (params: T, asyncTicket: string, callback: (cbTicket: string, htmlOrDomNodes: string | HTMLElement[]) => void): string | HTMLElement[];
}
declare type TooltipBuiltinPosition = 'inside' | 'top' | 'left' | 'right' | 'bottom';
declare type TooltipBoxLayoutOption = Pick<BoxLayoutOptionMixin, 'top' | 'left' | 'right' | 'bottom'>;
interface PositionCallback {
    (point: [number, number], params: CallbackDataParams | CallbackDataParams[], el: HTMLDivElement | ZRText | null, rect: RectLike | null, size: {
        contentSize: [number, number];
        viewSize: [number, number];
    }): number[] | string[] | TooltipBuiltinPosition | TooltipBoxLayoutOption;
}
interface CommonTooltipOption<FormatterParams> {
    show?: boolean;
    triggerOn?: 'mousemove' | 'click' | 'none' | 'mousemove|click';
    alwaysShowContent?: boolean;
    formatter?: string | TooltipFormatterCallback<FormatterParams>;
    position?: (number | string)[] | TooltipBuiltinPosition | PositionCallback | TooltipBoxLayoutOption;
    confine?: boolean;
    align?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    showDelay?: number;
    hideDelay?: number;
    transitionDuration?: number;
    enterable?: boolean;
    backgroundColor?: ColorString;
    borderColor?: ColorString;
    borderRadius?: number;
    borderWidth?: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    padding?: number | number[];
    extraCssText?: string;
    textStyle?: Pick<LabelOption, 'color' | 'fontStyle' | 'fontWeight' | 'fontFamily' | 'fontSize' | 'lineHeight' | 'width' | 'height' | 'textBorderColor' | 'textBorderWidth' | 'textShadowColor' | 'textShadowBlur' | 'textShadowOffsetX' | 'textShadowOffsetY' | 'align'> & {
        decoration?: string;
    };
}
declare type SeriesTooltipOption = CommonTooltipOption<CallbackDataParams> & {
    trigger?: 'item' | 'axis' | boolean | 'none';
};
declare type LabelFormatterParams = {
    value: ScaleDataValue;
    axisDimension: string;
    axisIndex: number;
    seriesData: CallbackDataParams[];
};
interface CommonAxisPointerOption {
    show?: boolean | 'auto';
    z?: number;
    zlevel?: number;
    triggerOn?: 'click' | 'mousemove' | 'none' | 'mousemove|click';
    type?: 'line' | 'shadow' | 'none';
    snap?: boolean;
    triggerTooltip?: boolean;
    value?: ScaleDataValue;
    status?: 'show' | 'hide';
    label?: LabelOption & {
        precision?: 'auto' | number;
        margin?: number;
        formatter?: string | ((params: LabelFormatterParams) => string);
    };
    animation?: boolean | 'auto';
    animationDurationUpdate?: number;
    animationEasingUpdate?: ZREasing;
    lineStyle?: LineStyleOption;
    shadowStyle?: AreaStyleOption;
    handle?: {
        show?: boolean;
        icon?: string;
        size?: number | number[];
        margin?: number;
        color?: ColorString;
        throttle?: number;
    } & ShadowOptionMixin;
    seriesDataIndices?: {
        seriesIndex: number;
        dataIndex: number;
        dataIndexInside: number;
    }[];
}
interface ComponentOption {
    mainType?: string;
    type?: string;
    id?: OptionId;
    name?: OptionName;
    z?: number;
    zlevel?: number;
}
declare type BlurScope = 'coordinateSystem' | 'series' | 'global';
declare type InnerFocus = string | ArrayLike<number> | Dictionary<ArrayLike<number>>;
interface DefaultExtraStateOpts {
    emphasis: any;
    select: any;
    blur: any;
}
declare type DefaultEmphasisFocus = 'none' | 'self' | 'series';
interface ExtraStateOptsBase {
    emphasis?: {
        focus?: string;
    };
    select?: any;
    blur?: any;
}
interface StatesOptionMixin<StateOption, ExtraStateOpts extends ExtraStateOptsBase = DefaultExtraStateOpts> {
    emphasis?: StateOption & ExtraStateOpts['emphasis'] & {
        blurScope?: BlurScope;
    };
    select?: StateOption & ExtraStateOpts['select'];
    blur?: StateOption & ExtraStateOpts['blur'];
}
interface SeriesOption<StateOption = any, ExtraStateOpts extends ExtraStateOptsBase = DefaultExtraStateOpts> extends ComponentOption, AnimationOptionMixin, ColorPaletteOptionMixin, StatesOptionMixin<StateOption, ExtraStateOpts> {
    mainType?: 'series';
    silent?: boolean;
    blendMode?: string;
    cursor?: string;
    data?: unknown;
    legendHoverLink?: boolean;
    progressive?: number | false;
    progressiveThreshold?: number;
    progressiveChunkMode?: 'mod';
    coordinateSystem?: string;
    hoverLayerThreshold?: number;
    seriesLayoutBy?: 'column' | 'row';
    labelLine?: LabelLineOption;
    labelLayout?: LabelLayoutOption | LabelLayoutOptionCallback;
    stateAnimation?: AnimationOption$1;
    selectedMap?: Dictionary<boolean>;
    selectedMode?: 'single' | 'multiple' | boolean;
}
interface SeriesOnCartesianOptionMixin {
    xAxisIndex?: number;
    yAxisIndex?: number;
    xAxisId?: string;
    yAxisId?: string;
}
interface SeriesOnPolarOptionMixin {
    radiusAxisIndex?: number;
    angleAxisIndex?: number;
    radiusAxisId?: string;
    angleAxisId?: string;
}
interface SeriesOnSingleOptionMixin {
    singleAxisIndex?: number;
    singleAxisId?: string;
}
interface SeriesOnGeoOptionMixin {
    geoIndex?: number;
    geoId?: string;
}
interface SeriesOnCalendarOptionMixin {
    calendarIndex?: number;
    calendarId?: string;
}
interface SeriesLargeOptionMixin {
    large?: boolean;
    largeThreshold?: number;
}
interface SeriesStackOptionMixin {
    stack?: string;
}
declare type SamplingFunc = (frame: ArrayLike<number>) => number;
interface SeriesSamplingOptionMixin {
    sampling?: 'none' | 'average' | 'min' | 'max' | 'sum' | 'lttb' | SamplingFunc;
}
interface SeriesEncodeOptionMixin {
    datasetIndex?: number;
    datasetId?: string | number;
    seriesLayoutBy?: SeriesLayoutBy;
    sourceHeader?: OptionSourceHeader;
    dimensions?: DimensionDefinitionLoose[];
    encode?: OptionEncode;
}

declare type ParallelLayoutDirection = 'horizontal' | 'vertical';
interface ParallelCoordinateSystemOption extends ComponentOption, BoxLayoutOptionMixin {
    mainType?: 'parallel';
    layout?: ParallelLayoutDirection;
    axisExpandable?: boolean;
    axisExpandCenter?: number;
    axisExpandCount?: number;
    axisExpandWidth?: number;
    axisExpandTriggerOn?: 'click' | 'mousemove';
    axisExpandRate?: number;
    axisExpandDebounce?: number;
    axisExpandSlideTriggerArea?: [number, number, number];
    axisExpandWindow?: number[];
    parallelAxisDefault?: ParallelAxisOption;
}

interface ParallelAxisOption extends AxisBaseOption {
    dim?: number | number[];
    parallelIndex?: number;
    areaSelectStyle?: {
        width?: number;
        borderWidth?: number;
        borderColor?: ZRColor;
        color?: ZRColor;
        opacity?: number;
    };
    realtime?: boolean;
}

declare function parse(colorStr: string, rgbaArr?: number[]): number[];
declare function lift(color: string, level: number): string;
declare function toHex(color: string): string;
declare function fastLerp(normalizedValue: number, colors: number[][], out?: number[]): number[];
declare const fastMapToColor: typeof fastLerp;
declare type LerpFullOutput = {
    color: string;
    leftIndex: number;
    rightIndex: number;
    value: number;
};
declare function lerp$1(normalizedValue: number, colors: string[], fullOutput?: boolean): string | LerpFullOutput;
declare const mapToColor: typeof lerp$1;
declare function modifyHSL(color: string, h?: number, s?: number, l?: number): string;
declare function modifyAlpha(color: string, alpha?: number): string;
declare function stringify(arrColor: number[], type: string): string;
declare function lum(color: string, backgroundLum: number): number;
declare function random(): string;

declare const color_d_parse: typeof parse;
declare const color_d_lift: typeof lift;
declare const color_d_toHex: typeof toHex;
declare const color_d_fastLerp: typeof fastLerp;
declare const color_d_fastMapToColor: typeof fastMapToColor;
declare const color_d_mapToColor: typeof mapToColor;
declare const color_d_modifyHSL: typeof modifyHSL;
declare const color_d_modifyAlpha: typeof modifyAlpha;
declare const color_d_stringify: typeof stringify;
declare const color_d_lum: typeof lum;
declare const color_d_random: typeof random;
declare namespace color_d {
  export {
    color_d_parse as parse,
    color_d_lift as lift,
    color_d_toHex as toHex,
    color_d_fastLerp as fastLerp,
    color_d_fastMapToColor as fastMapToColor,
    lerp$1 as lerp,
    color_d_mapToColor as mapToColor,
    color_d_modifyHSL as modifyHSL,
    color_d_modifyAlpha as modifyAlpha,
    color_d_stringify as stringify,
    color_d_lum as lum,
    color_d_random as random,
  };
}

declare type ThrottleFunction = (this: unknown, ...args: unknown[]) => void;
interface ThrottleController {
    clear(): void;
    debounceNextCall(debounceDelay: number): void;
}
declare function throttle<T extends ThrottleFunction>(fn: T, delay?: number, debounce?: boolean): T & ThrottleController;

declare function enableDataStack(seriesModel: SeriesModel<SeriesOption & SeriesStackOptionMixin>, dimensionInfoList: (DataDimensionInfo | string)[], opt?: {
    stackedCoordDimension?: string;
    byIndex?: boolean;
}): Pick<DataCalculationInfo<unknown>, 'stackedDimension' | 'stackedByDimension' | 'isStackedByIndex' | 'stackedOverDimension' | 'stackResultDimension'>;
declare function isDimensionStacked(data: List, stackedDim: string): boolean;
declare function getStackedDimension(data: List, targetDim: string): DimensionName;

interface ECData {
    dataIndex?: number;
    dataModel?: DataModel;
    eventData?: ECEventData;
    seriesIndex?: number;
    dataType?: SeriesDataType;
    focus?: InnerFocus;
    blurScope?: BlurScope;
}
declare const getECData: (hostObj: Element<ElementProps>) => ECData;

interface CoordDimensionDefinition extends DimensionDefinition {
    dimsDef?: (DimensionName | {
        name: DimensionName;
        defaultTooltip?: boolean;
    })[];
    otherDims?: DataVisualDimensions;
    ordinalMeta?: OrdinalMeta;
    coordDim?: DimensionName;
    coordDimIndex?: DimensionIndex;
}
declare type CoordDimensionDefinitionLoose = CoordDimensionDefinition['name'] | CoordDimensionDefinition;
declare type CreateDimensionsParams = {
    coordDimensions?: CoordDimensionDefinitionLoose[];
    dimensionsDefine?: DimensionDefinitionLoose[];
    encodeDefine?: HashMap<OptionEncodeValue, DimensionName> | OptionEncode;
    dimensionsCount?: number;
    encodeDefaulter?: EncodeDefaulter;
    generateCoord?: string;
    generateCoordCount?: number;
};
declare function createDimensions(source: Source | List | OptionSourceData, opt?: CreateDimensionsParams): DataDimensionInfo[];

declare type ECSymbol = Path & {
    __isEmptyBrush?: boolean;
    setColor: (color: ZRColor, innerColor?: string) => void;
    getColor: () => ZRColor;
};
declare function createSymbol(symbolType: string, x: number, y: number, w: number, h: number, color?: ZRColor, keepAspect?: boolean): ECSymbol;

declare function enableHoverEmphasis(el: Element, focus?: InnerFocus, blurScope?: BlurScope): void;

declare function createList(seriesModel: SeriesModel): List<Model<any>, DefaultDataVisual>;

declare const dataStack: {
    isDimensionStacked: typeof isDimensionStacked;
    enableDataStack: typeof enableDataStack;
    getStackedDimension: typeof getStackedDimension;
};

declare function createScale(dataExtent: number[], option: object | AxisBaseModel): Scale<Dictionary<unknown>>;
declare function mixinAxisModelCommonMethods(Model: Model): void;

declare function createTextStyle(textStyleModel: Model<TextCommonOption>, opts?: {
    state?: DisplayState;
}): TextStyleProps;

declare const helper_d_getLayoutRect: typeof getLayoutRect;
declare const helper_d_getECData: typeof getECData;
declare const helper_d_createList: typeof createList;
declare const helper_d_dataStack: typeof dataStack;
declare const helper_d_createScale: typeof createScale;
declare const helper_d_mixinAxisModelCommonMethods: typeof mixinAxisModelCommonMethods;
declare const helper_d_createTextStyle: typeof createTextStyle;
declare const helper_d_createDimensions: typeof createDimensions;
declare const helper_d_createSymbol: typeof createSymbol;
declare const helper_d_enableHoverEmphasis: typeof enableHoverEmphasis;
declare namespace helper_d {
  export {
    helper_d_getLayoutRect as getLayoutRect,
    helper_d_getECData as getECData,
    helper_d_createList as createList,
    helper_d_dataStack as dataStack,
    helper_d_createScale as createScale,
    helper_d_mixinAxisModelCommonMethods as mixinAxisModelCommonMethods,
    helper_d_createTextStyle as createTextStyle,
    helper_d_createDimensions as createDimensions,
    helper_d_createSymbol as createSymbol,
    helper_d_enableHoverEmphasis as enableHoverEmphasis,
  };
}

declare function parseGeoJSON(geoJson: GeoJSON | GeoJSONCompressed, nameProperty: string): Region[];

declare function linearMap(val: number, domain: number[], range: number[], clamp?: boolean): number;
declare function round(x: number | string, precision?: number): number;
declare function round(x: number | string, precision: number, returnStr: false): number;
declare function round(x: number | string, precision: number, returnStr: true): string;
declare function asc<T extends number[]>(arr: T): T;
declare function getPrecision(val: string | number): number;
declare function getPrecisionSafe(val: string | number): number;
declare function getPixelPrecision(dataExtent: [number, number], pixelExtent: [number, number]): number;
declare function getPercentWithPrecision(valueList: number[], idx: number, precision: number): number;
declare const MAX_SAFE_INTEGER = 9007199254740991;
declare function remRadian(radian: number): number;
declare function isRadianAroundZero(val: number): boolean;
declare function parseDate(value: unknown): Date;
declare function quantity(val: number): number;
declare function quantityExponent(val: number): number;
declare function nice(val: number, round?: boolean): number;
declare function quantile(ascArr: number[], p: number): number;
declare type IntervalItem = {
    interval: [number, number];
    close: [0 | 1, 0 | 1];
};
declare function reformIntervals(list: IntervalItem[]): IntervalItem[];
declare function numericToNumber(val: unknown): number;
declare function isNumeric(val: unknown): val is number;

declare const number_d_linearMap: typeof linearMap;
declare const number_d_round: typeof round;
declare const number_d_asc: typeof asc;
declare const number_d_getPrecision: typeof getPrecision;
declare const number_d_getPrecisionSafe: typeof getPrecisionSafe;
declare const number_d_getPixelPrecision: typeof getPixelPrecision;
declare const number_d_getPercentWithPrecision: typeof getPercentWithPrecision;
declare const number_d_MAX_SAFE_INTEGER: typeof MAX_SAFE_INTEGER;
declare const number_d_remRadian: typeof remRadian;
declare const number_d_isRadianAroundZero: typeof isRadianAroundZero;
declare const number_d_parseDate: typeof parseDate;
declare const number_d_quantity: typeof quantity;
declare const number_d_quantityExponent: typeof quantityExponent;
declare const number_d_nice: typeof nice;
declare const number_d_quantile: typeof quantile;
declare const number_d_reformIntervals: typeof reformIntervals;
declare const number_d_isNumeric: typeof isNumeric;
declare const number_d_numericToNumber: typeof numericToNumber;
declare namespace number_d {
  export {
    number_d_linearMap as linearMap,
    number_d_round as round,
    number_d_asc as asc,
    number_d_getPrecision as getPrecision,
    number_d_getPrecisionSafe as getPrecisionSafe,
    number_d_getPixelPrecision as getPixelPrecision,
    number_d_getPercentWithPrecision as getPercentWithPrecision,
    number_d_MAX_SAFE_INTEGER as MAX_SAFE_INTEGER,
    number_d_remRadian as remRadian,
    number_d_isRadianAroundZero as isRadianAroundZero,
    number_d_parseDate as parseDate,
    number_d_quantity as quantity,
    number_d_quantityExponent as quantityExponent,
    number_d_nice as nice,
    number_d_quantile as quantile,
    number_d_reformIntervals as reformIntervals,
    number_d_isNumeric as isNumeric,
    number_d_numericToNumber as numericToNumber,
  };
}

declare function format(time: unknown, template: string, isUTC: boolean, lang?: string | Model<LocaleOption>): string;

declare const time_d_format: typeof format;
declare namespace time_d {
  export {
    parseDate as parse,
    time_d_format as format,
  };
}

declare const graphic_d_extendShape: typeof extendShape;
declare const graphic_d_extendPath: typeof extendPath;
declare const graphic_d_makePath: typeof makePath;
declare const graphic_d_makeImage: typeof makeImage;
declare const graphic_d_resizePath: typeof resizePath;
declare const graphic_d_createIcon: typeof createIcon;
declare const graphic_d_updateProps: typeof updateProps;
declare const graphic_d_initProps: typeof initProps;
declare const graphic_d_getTransform: typeof getTransform;
declare const graphic_d_clipPointsByRect: typeof clipPointsByRect;
declare const graphic_d_clipRectByRect: typeof clipRectByRect;
declare const graphic_d_registerShape: typeof registerShape;
declare const graphic_d_getShapeClass: typeof getShapeClass;
type graphic_d_Group = Group;
declare const graphic_d_Group: typeof Group;
type graphic_d_Circle = Circle;
declare const graphic_d_Circle: typeof Circle;
type graphic_d_Ellipse = Ellipse;
declare const graphic_d_Ellipse: typeof Ellipse;
type graphic_d_Sector = Sector;
declare const graphic_d_Sector: typeof Sector;
type graphic_d_Ring = Ring;
declare const graphic_d_Ring: typeof Ring;
type graphic_d_Polygon = Polygon;
declare const graphic_d_Polygon: typeof Polygon;
type graphic_d_Polyline = Polyline;
declare const graphic_d_Polyline: typeof Polyline;
type graphic_d_Rect = Rect;
declare const graphic_d_Rect: typeof Rect;
type graphic_d_Line = Line;
declare const graphic_d_Line: typeof Line;
type graphic_d_BezierCurve = BezierCurve;
declare const graphic_d_BezierCurve: typeof BezierCurve;
type graphic_d_Arc = Arc;
declare const graphic_d_Arc: typeof Arc;
type graphic_d_IncrementalDisplayable = IncrementalDisplayable;
declare const graphic_d_IncrementalDisplayable: typeof IncrementalDisplayable;
type graphic_d_CompoundPath = CompoundPath;
declare const graphic_d_CompoundPath: typeof CompoundPath;
type graphic_d_LinearGradient = LinearGradient;
declare const graphic_d_LinearGradient: typeof LinearGradient;
type graphic_d_RadialGradient = RadialGradient;
declare const graphic_d_RadialGradient: typeof RadialGradient;
type graphic_d_BoundingRect = BoundingRect;
declare const graphic_d_BoundingRect: typeof BoundingRect;
declare namespace graphic_d {
  export {
    graphic_d_extendShape as extendShape,
    graphic_d_extendPath as extendPath,
    graphic_d_makePath as makePath,
    graphic_d_makeImage as makeImage,
    mergePath$1 as mergePath,
    graphic_d_resizePath as resizePath,
    graphic_d_createIcon as createIcon,
    graphic_d_updateProps as updateProps,
    graphic_d_initProps as initProps,
    graphic_d_getTransform as getTransform,
    graphic_d_clipPointsByRect as clipPointsByRect,
    graphic_d_clipRectByRect as clipRectByRect,
    graphic_d_registerShape as registerShape,
    graphic_d_getShapeClass as getShapeClass,
    graphic_d_Group as Group,
    ZRImage as Image,
    ZRText as Text,
    graphic_d_Circle as Circle,
    graphic_d_Ellipse as Ellipse,
    graphic_d_Sector as Sector,
    graphic_d_Ring as Ring,
    graphic_d_Polygon as Polygon,
    graphic_d_Polyline as Polyline,
    graphic_d_Rect as Rect,
    graphic_d_Line as Line,
    graphic_d_BezierCurve as BezierCurve,
    graphic_d_Arc as Arc,
    graphic_d_IncrementalDisplayable as IncrementalDisplayable,
    graphic_d_CompoundPath as CompoundPath,
    graphic_d_LinearGradient as LinearGradient,
    graphic_d_RadialGradient as RadialGradient,
    graphic_d_BoundingRect as BoundingRect,
  };
}

declare const format_d_addCommas: typeof addCommas;
declare const format_d_toCamelCase: typeof toCamelCase;
declare const format_d_encodeHTML: typeof encodeHTML;
declare const format_d_formatTpl: typeof formatTpl;
declare const format_d_getTooltipMarker: typeof getTooltipMarker;
declare const format_d_formatTime: typeof formatTime;
declare const format_d_capitalFirst: typeof capitalFirst;
declare const format_d_truncateText: typeof truncateText;
declare const format_d_getTextRect: typeof getTextRect;
declare namespace format_d {
  export {
    format_d_addCommas as addCommas,
    format_d_toCamelCase as toCamelCase,
    normalizeCssArray$1 as normalizeCssArray,
    format_d_encodeHTML as encodeHTML,
    format_d_formatTpl as formatTpl,
    format_d_getTooltipMarker as getTooltipMarker,
    format_d_formatTime as formatTime,
    format_d_capitalFirst as capitalFirst,
    format_d_truncateText as truncateText,
    format_d_getTextRect as getTextRect,
  };
}

declare const util_d$1_map: typeof map;
declare const util_d$1_each: typeof each;
declare const util_d$1_indexOf: typeof indexOf;
declare const util_d$1_inherits: typeof inherits;
declare const util_d$1_reduce: typeof reduce;
declare const util_d$1_filter: typeof filter;
declare const util_d$1_bind: typeof bind;
declare const util_d$1_curry: typeof curry;
declare const util_d$1_isArray: typeof isArray;
declare const util_d$1_isString: typeof isString;
declare const util_d$1_isObject: typeof isObject;
declare const util_d$1_isFunction: typeof isFunction;
declare const util_d$1_extend: typeof extend;
declare const util_d$1_defaults: typeof defaults;
declare const util_d$1_merge: typeof merge;
declare namespace util_d$1 {
  export {
    util_d$1_map as map,
    util_d$1_each as each,
    util_d$1_indexOf as indexOf,
    util_d$1_inherits as inherits,
    util_d$1_reduce as reduce,
    util_d$1_filter as filter,
    util_d$1_bind as bind,
    util_d$1_curry as curry,
    util_d$1_isArray as isArray,
    util_d$1_isString as isString,
    util_d$1_isObject as isObject,
    util_d$1_isFunction as isFunction,
    util_d$1_extend as extend,
    util_d$1_defaults as defaults,
    clone$2 as clone,
    util_d$1_merge as merge,
  };
}

declare class Browser {
    firefox: boolean;
    ie: boolean;
    edge: boolean;
    newEdge: boolean;
    weChat: boolean;
    version: string | number;
}
declare class Env {
    browser: Browser;
    node: boolean;
    wxa: boolean;
    worker: boolean;
    canvasSupported: boolean;
    svgSupported: boolean;
    touchEventsSupported: boolean;
    pointerEventsSupported: boolean;
    domSupported: boolean;
}
declare const env: Env;

declare function brushSingle(ctx: CanvasRenderingContext2D, el: Displayable): void;

declare function extendComponentModel(proto: object): ComponentModel;
declare function extendComponentView(proto: object): ChartView;
declare function extendSeriesModel(proto: object): SeriesModel;
declare function extendChartView(proto: object): ChartView;

declare type Dependencies = {
    grid: XAXisOption | YAXisOption | AxisPointerOption;
    polar: AngleAxisOption | RadiusAxisOption;
    parallel: ParallelAxisOption;
};
declare type DependenciesKeys = keyof Dependencies & string;
declare type Arrayable<T> = T | T[];
declare type GetMainType<OptionUnion extends ComponentOption> = Exclude<OptionUnion['mainType'], undefined>;
declare type ExtractComponentOption<OptionUnion, ExtractMainType> = OptionUnion extends {
    mainType?: ExtractMainType;
} ? OptionUnion : never;
declare type GetDependency<DependencyOption extends ComponentOption> = {
    [key in GetMainType<DependencyOption>]?: Arrayable<ExtractComponentOption<DependencyOption, key>>;
};
declare type GetDependencies<MainType extends string> = GetDependency<Dependencies[Extract<MainType, DependenciesKeys>]>;
declare type ComposeUnitOption<OptionUnion extends ComponentOption> = CheckMainType<GetMainType<OptionUnion>> & Omit<ECBasicOption, 'baseOption' | 'options'> & {
    [key in GetMainType<OptionUnion>]?: Arrayable<ExtractComponentOption<OptionUnion, key>>;
} & GetDependencies<GetMainType<OptionUnion>>;
declare type CheckMainType<OptionUnionMainType extends string> = string extends OptionUnionMainType ? never : {};
declare type ComposeOption<OptionUnion extends ComponentOption> = ComposeUnitOption<OptionUnion> & {
    baseOption?: ComposeUnitOption<OptionUnion>;
    options?: ComposeUnitOption<OptionUnion>[];
};

declare function install$2(registers: EChartsExtensionInstallRegisters): void;

declare function install$3(registers: EChartsExtensionInstallRegisters): void;

declare function install$4(registers: EChartsExtensionInstallRegisters): void;

declare function install$5(registers: EChartsExtensionInstallRegisters): void;

declare function install$6(registers: EChartsExtensionInstallRegisters): void;

declare function install$7(registers: EChartsExtensionInstallRegisters): void;

declare function install$8(registers: EChartsExtensionInstallRegisters): void;

declare function install$9(registers: EChartsExtensionInstallRegisters): void;

declare function install$a(registers: EChartsExtensionInstallRegisters): void;

declare function install$b(registers: EChartsExtensionInstallRegisters): void;

declare function install$c(registers: EChartsExtensionInstallRegisters): void;

declare function install$d(registers: EChartsExtensionInstallRegisters): void;

declare function install$e(registers: EChartsExtensionInstallRegisters): void;

declare function install$f(registers: EChartsExtensionInstallRegisters): void;

declare function install$g(registers: EChartsExtensionInstallRegisters): void;

declare function install$h(registers: EChartsExtensionInstallRegisters): void;

declare function install$i(registers: EChartsExtensionInstallRegisters): void;

declare function install$j(registers: EChartsExtensionInstallRegisters): void;

declare function install$k(registers: EChartsExtensionInstallRegisters): void;

declare function install$l(registers: EChartsExtensionInstallRegisters): void;

declare function install$m(registers: EChartsExtensionInstallRegisters): void;

interface RadarIndicatorOption {
    text?: string;
    min?: number;
    max?: number;
    color?: ColorString;
    axisType?: 'value' | 'log';
}
interface RadarOption extends ComponentOption, CircleLayoutOptionMixin {
    mainType?: 'radar';
    startAngle?: number;
    shape?: 'polygon' | 'circle';
    axisLine?: AxisBaseOption['axisLine'];
    axisTick?: AxisBaseOption['axisTick'];
    axisLabel?: AxisBaseOption['axisLabel'];
    splitLine?: AxisBaseOption['splitLine'];
    splitArea?: AxisBaseOption['splitArea'];
    axisName?: {
        show?: boolean;
        formatter?: string | ((name?: string, indicatorOpt?: InnerIndicatorAxisOption) => string);
    } & LabelOption;
    axisNameGap?: number;
    triggerEvent?: boolean;
    scale?: boolean;
    splitNumber?: number;
    boundaryGap?: AxisBaseOption['boundaryGap'];
    indicator?: RadarIndicatorOption[];
}
interface InnerIndicatorAxisOption extends AxisBaseOption {
}

declare type SingleAxisPosition = 'top' | 'bottom' | 'left' | 'right';
interface SingleAxisOption extends AxisBaseOption, BoxLayoutOptionMixin {
    mainType?: 'singleAxis';
    position?: SingleAxisPosition;
    orient?: LayoutOrient;
}

interface CalendarMonthLabelFormatterCallbackParams {
    nameMap: string;
    yyyy: string;
    yy: string;
    MM: string;
    M: number;
}
interface CalendarYearLabelFormatterCallbackParams {
    nameMap: string;
    start: string;
    end: string;
}
interface CalendarOption extends ComponentOption, BoxLayoutOptionMixin {
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

declare type IconStyle = ItemStyleOption & {
    textFill?: LabelOption['color'];
    textBackgroundColor?: LabelOption['backgroundColor'];
    textPosition?: LabelOption['position'];
    textAlign?: LabelOption['align'];
    textBorderRadius?: LabelOption['borderRadius'];
    textPadding?: LabelOption['padding'];
};
interface ToolboxFeatureOption {
    show?: boolean;
    title?: string | Partial<Dictionary<string>>;
    icon?: string | Partial<Dictionary<string>>;
    iconStyle?: IconStyle;
    emphasis?: {
        iconStyle?: IconStyle;
    };
    iconStatus?: Partial<Dictionary<DisplayState>>;
    onclick?: () => void;
}

interface ToolboxTooltipFormatterParams {
    componentType: 'toolbox';
    name: string;
    title: string;
    $vars: ['name', 'title'];
}
interface ToolboxOption extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'toolbox';
    show?: boolean;
    orient?: LayoutOrient;
    backgroundColor?: ZRColor;
    borderRadius?: number | number[];
    padding?: number | number[];
    itemSize?: number;
    itemGap?: number;
    showTitle?: boolean;
    iconStyle?: ItemStyleOption;
    emphasis?: {
        iconStyle?: ItemStyleOption;
    };
    textStyle?: LabelOption;
    tooltip?: CommonTooltipOption<ToolboxTooltipFormatterParams>;
    feature?: Partial<Dictionary<ToolboxFeatureOption>>;
}

interface TitleOption extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'title';
    show?: boolean;
    text?: string;
    link?: string;
    target?: 'self' | 'blank';
    subtext?: string;
    sublink?: string;
    subtarget?: 'self' | 'blank';
    textAlign?: ZRTextAlign;
    textVerticalAlign?: ZRTextVerticalAlign;
    textBaseline?: ZRTextVerticalAlign;
    backgroundColor?: ZRColor;
    padding?: number | number[];
    itemGap?: number;
    textStyle?: LabelOption;
    subtextStyle?: LabelOption;
    triggerEvent?: boolean;
    borderRadius?: number | number[];
}
declare function install$n(registers: EChartsExtensionInstallRegisters): void;

interface TimelineControlStyle extends ItemStyleOption {
    show?: boolean;
    showPlayBtn?: boolean;
    showPrevBtn?: boolean;
    showNextBtn?: boolean;
    itemSize?: number;
    itemGap?: number;
    position?: 'left' | 'right' | 'top' | 'bottom';
    playIcon?: string;
    stopIcon?: string;
    prevIcon?: string;
    nextIcon?: string;
    playBtnSize?: number | string;
    stopBtnSize?: number | string;
    nextBtnSize?: number | string;
    prevBtnSize?: number | string;
}
interface TimelineCheckpointStyle extends ItemStyleOption, SymbolOptionMixin {
    animation?: boolean;
    animationDuration?: number;
    animationEasing?: ZREasing;
}
interface TimelineLineStyleOption extends LineStyleOption {
    show?: boolean;
}
interface TimelineLabelOption extends Omit<LabelOption, 'position'> {
    show?: boolean;
    position?: 'auto' | 'left' | 'right' | 'top' | 'bottom' | number;
    interval?: 'auto' | number;
    formatter?: string | ((value: string | number, index: number) => string);
}
interface TimelineDataItemOption extends SymbolOptionMixin {
    value?: OptionDataValue;
    itemStyle?: ItemStyleOption;
    label?: TimelineLabelOption;
    checkpointStyle?: TimelineCheckpointStyle;
    emphasis?: {
        itemStyle?: ItemStyleOption;
        label?: TimelineLabelOption;
        checkpointStyle?: TimelineCheckpointStyle;
    };
    progress?: {
        lineStyle?: TimelineLineStyleOption;
        itemStyle?: ItemStyleOption;
        label?: TimelineLabelOption;
    };
    tooltip?: boolean;
}
interface TimelineOption extends ComponentOption, BoxLayoutOptionMixin, SymbolOptionMixin {
    mainType?: 'timeline';
    backgroundColor?: ZRColor;
    borderColor?: ColorString;
    borderWidth?: number;
    tooltip?: CommonTooltipOption<CallbackDataParams> & {
        trigger?: 'item';
    };
    show?: boolean;
    axisType?: 'category' | 'time' | 'value';
    currentIndex?: number;
    autoPlay?: boolean;
    rewind?: boolean;
    loop?: boolean;
    playInterval?: number;
    realtime?: boolean;
    controlPosition?: 'left' | 'right' | 'top' | 'bottom';
    padding?: number | number[];
    orient?: LayoutOrient;
    inverse?: boolean;
    replaceMerge?: GlobalModelSetOptionOpts['replaceMerge'];
    lineStyle?: TimelineLineStyleOption;
    itemStyle?: ItemStyleOption;
    checkpointStyle?: TimelineCheckpointStyle;
    controlStyle?: TimelineControlStyle;
    label?: TimelineLabelOption;
    emphasis?: {
        lineStyle?: TimelineLineStyleOption;
        itemStyle?: ItemStyleOption;
        checkpointStyle?: TimelineCheckpointStyle;
        controlStyle?: TimelineControlStyle;
        label?: TimelineLabelOption;
    };
    progress?: {
        lineStyle?: TimelineLineStyleOption;
        itemStyle?: ItemStyleOption;
        label?: TimelineLabelOption;
    };
    data?: (OptionDataValue | TimelineDataItemOption)[];
}

interface SliderTimelineOption extends TimelineOption {
}

declare type SelectorType = 'all' | 'inverse';
interface LegendSelectorButtonOption {
    type?: SelectorType;
    title?: string;
}
interface DataItem {
    name?: string;
    icon?: string;
    textStyle?: LabelOption;
    tooltip?: unknown;
}
interface LegendTooltipFormatterParams {
    componentType: 'legend';
    legendIndex: number;
    name: string;
    $vars: ['name'];
}
interface LegendOption extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'legend';
    show?: boolean;
    orient?: LayoutOrient;
    align?: 'auto' | 'left' | 'right';
    backgroundColor?: ColorString;
    borderRadius?: number | number[];
    padding?: number | number[];
    itemGap?: number;
    itemWidth?: number;
    itemHeight?: number;
    inactiveColor?: ColorString;
    inactiveBorderColor?: ColorString;
    itemStyle?: ItemStyleOption;
    formatter?: string | ((name: string) => string);
    textStyle?: LabelOption;
    selectedMode?: boolean | 'single' | 'multiple';
    selected?: Dictionary<boolean>;
    selector?: (LegendSelectorButtonOption | SelectorType)[] | boolean;
    selectorLabel?: LabelOption;
    emphasis?: {
        selectorLabel?: LabelOption;
    };
    selectorPosition?: 'auto' | 'start' | 'end';
    selectorItemGap?: number;
    selectorButtonGap?: number;
    data?: (string | DataItem)[];
    symbolKeepAspect?: boolean;
    tooltip?: CommonTooltipOption<LegendTooltipFormatterParams>;
}

interface ScrollableLegendOption extends LegendOption {
    scrollDataIndex?: number;
    pageButtonItemGap?: number;
    pageButtonGap?: number;
    pageButtonPosition?: 'start' | 'end';
    pageFormatter?: string | ((param: {
        current: number;
        total: number;
    }) => string);
    pageIcons?: {
        horizontal?: string[];
        vertical?: string[];
    };
    pageIconColor?: ZRColor;
    pageIconInactiveColor?: ZRColor;
    pageIconSize?: number;
    pageTextStyle?: LabelOption;
    animationDurationUpdate?: number;
}

interface DataZoomOption extends ComponentOption {
    mainType?: 'dataZoom';
    orient?: LayoutOrient;
    xAxisIndex?: number | number[];
    xAxisId?: string | string[];
    yAxisIndex?: number | number[];
    yAxisId?: string | string[];
    radiusAxisIndex?: number | number[];
    radiusAxisId?: string | string[];
    angleAxisIndex?: number | number[];
    angleAxisId?: string | string[];
    singleAxisIndex?: number | number[];
    singleAxisId?: string | string[];
    filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none';
    throttle?: number | null | undefined;
    start?: number;
    end?: number;
    startValue?: number;
    endValue?: number;
    minSpan?: number;
    maxSpan?: number;
    minValueSpan?: number;
    maxValueSpan?: number;
    rangeMode?: ['value' | 'percent', 'value' | 'percent'];
    realtime?: boolean;
    textStyle?: LabelOption;
}

interface SliderDataZoomOption extends DataZoomOption, BoxLayoutOptionMixin {
    show?: boolean;
    backgroundColor?: ZRColor;
    borderColor?: ZRColor;
    borderRadius?: number | number[];
    dataBackground?: {
        lineStyle?: LineStyleOption;
        areaStyle?: AreaStyleOption;
    };
    selectedDataBackground?: {
        lineStyle?: LineStyleOption;
        areaStyle?: AreaStyleOption;
    };
    fillerColor?: ZRColor;
    handleIcon?: string;
    handleSize?: string | number;
    handleStyle?: ItemStyleOption;
    moveHandleIcon?: string;
    moveHandleStyle?: ItemStyleOption;
    moveHandleSize?: number;
    labelPrecision?: number | 'auto';
    labelFormatter?: string | ((value: number, valueStr: string) => string);
    showDetail?: boolean;
    showDataShadow?: 'auto' | boolean;
    zoomLock?: boolean;
    textStyle?: LabelOption;
    brushSelect?: boolean;
    brushStyle?: ItemStyleOption;
    emphasis?: {
        handleStyle?: ItemStyleOption;
        moveHandleStyle?: ItemStyleOption;
    };
}

interface InsideDataZoomOption extends DataZoomOption {
    disabled?: boolean;
    zoomLock?: boolean;
    zoomOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt';
    moveOnMouseMove?: boolean | 'shift' | 'ctrl' | 'alt';
    moveOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt';
    preventDefaultMouseMove?: boolean;
    textStyle?: never;
}

interface ContinousVisualMapOption extends VisualMapOption {
    align?: 'auto' | 'left' | 'right' | 'top' | 'bottom';
    calculable?: boolean;
    range?: number[];
    hoverLink?: boolean;
    hoverLinkDataSize?: number;
    hoverLinkOnHandle?: boolean;
    handleIcon?: string;
    handleSize?: string | number;
    handleStyle?: ItemStyleOption;
    indicatorIcon?: string;
    indicatorSize?: string | number;
    indicatorStyle?: ItemStyleOption;
    emphasis?: {
        handleStyle?: ItemStyleOption;
    };
}

interface VisualPiece extends VisualOptionPiecewise {
    min?: number;
    max?: number;
    lt?: number;
    gt?: number;
    lte?: number;
    gte?: number;
    value?: number;
    label?: string;
}
interface PiecewiseVisualMapOption extends VisualMapOption {
    align?: 'auto' | 'left' | 'right';
    minOpen?: boolean;
    maxOpen?: boolean;
    itemWidth?: number;
    itemHeight?: number;
    itemSymbol?: string;
    pieces?: VisualPiece[];
    categories?: string[];
    splitNumber?: number;
    selected?: Dictionary<boolean>;
    selectedMode?: 'multiple' | 'single';
    showLabel?: boolean;
    itemGap?: number;
    hoverLink?: boolean;
}

declare type MarkerStatisticType = 'average' | 'min' | 'max' | 'median';
interface MarkerPositionOption {
    x?: number | string;
    y?: number | string;
    coord?: (ScaleDataValue | MarkerStatisticType)[];
    xAxis?: ScaleDataValue;
    yAxis?: ScaleDataValue;
    radiusAxis?: ScaleDataValue;
    angleAxis?: ScaleDataValue;
    type?: MarkerStatisticType;
    valueIndex?: number;
    valueDim?: string;
    value?: string | number;
}
interface MarkerOption extends ComponentOption, AnimationOptionMixin {
    silent?: boolean;
    data?: unknown[];
    tooltip?: CommonTooltipOption<unknown> & {
        trigger?: 'item' | 'axis' | boolean | 'none';
    };
}

interface MarkLineStateOption {
    lineStyle?: LineStyleOption;
    itemStyle?: ItemStyleOption;
    label?: SeriesLineLabelOption;
}
interface MarkLineDataItemOptionBase extends MarkLineStateOption, StatesOptionMixin<MarkLineStateOption> {
    name?: string;
}
interface MarkLine1DDataItemOption extends MarkLineDataItemOptionBase {
    xAxis?: number;
    yAxis?: number;
    type?: MarkerStatisticType;
    valueIndex?: number;
    valueDim?: string;
    symbol?: string[] | string;
    symbolSize?: number[] | number;
}
interface MarkLine2DDataItemDimOption extends MarkLineDataItemOptionBase, SymbolOptionMixin, MarkerPositionOption {
}
declare type MarkLine2DDataItemOption = [
    MarkLine2DDataItemDimOption,
    MarkLine2DDataItemDimOption
];
interface MarkLineOption extends MarkerOption, MarkLineStateOption, StatesOptionMixin<MarkLineStateOption> {
    mainType?: 'markLine';
    symbol?: string[] | string;
    symbolSize?: number[] | number;
    precision?: number;
    data?: (MarkLine1DDataItemOption | MarkLine2DDataItemOption)[];
}

interface MarkPointStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface MarkPointDataItemOption extends MarkPointStateOption, StatesOptionMixin<MarkPointStateOption>, SymbolOptionMixin<CallbackDataParams>, MarkerPositionOption {
    name: string;
}
interface MarkPointOption extends MarkerOption, SymbolOptionMixin<CallbackDataParams>, StatesOptionMixin<MarkPointStateOption>, MarkPointStateOption {
    mainType?: 'markPoint';
    precision?: number;
    data?: MarkPointDataItemOption[];
}

interface MarkAreaStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface MarkAreaDataItemOptionBase extends MarkAreaStateOption, StatesOptionMixin<MarkAreaStateOption> {
    name?: string;
}
interface MarkArea1DDataItemOption extends MarkAreaDataItemOptionBase {
    xAxis?: number;
    yAxis?: number;
    type?: MarkerStatisticType;
    valueIndex?: number;
    valueDim?: string;
}
interface MarkArea2DDataItemDimOption extends MarkAreaDataItemOptionBase, MarkerPositionOption {
}
declare type MarkArea2DDataItemOption = [
    MarkArea2DDataItemDimOption,
    MarkArea2DDataItemDimOption
];
interface MarkAreaOption extends MarkerOption, MarkAreaStateOption, StatesOptionMixin<MarkAreaStateOption> {
    mainType?: 'markArea';
    precision?: number;
    data?: (MarkArea1DDataItemOption | MarkArea2DDataItemOption)[];
}

declare type LineDataValue = OptionDataValue | OptionDataValue[];
interface ExtraStateOption {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
interface LineStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface LineDataItemOption extends SymbolOptionMixin, LineStateOption, StatesOptionMixin<LineStateOption, ExtraStateOption> {
    name?: string;
    value?: LineDataValue;
}
interface LineEndLabelOption extends SeriesLabelOption {
    valueAnimation: boolean;
}
interface LineSeriesOption extends SeriesOption<LineStateOption, ExtraStateOption & {
    emphasis?: {
        lineStyle?: LineStyleOption | {
            width?: 'bolder';
        };
        areaStyle?: AreaStyleOption;
    };
    blur?: {
        lineStyle?: LineStyleOption;
        areaStyle?: AreaStyleOption;
    };
}>, LineStateOption, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, SeriesStackOptionMixin, SeriesSamplingOptionMixin, SymbolOptionMixin<CallbackDataParams>, SeriesEncodeOptionMixin {
    type?: 'line';
    coordinateSystem?: 'cartesian2d' | 'polar';
    clip?: boolean;
    label?: SeriesLabelOption;
    endLabel?: LineEndLabelOption;
    lineStyle?: LineStyleOption;
    areaStyle?: AreaStyleOption & {
        origin?: 'auto' | 'start' | 'end';
    };
    step?: false | 'start' | 'end' | 'middle';
    smooth?: boolean | number;
    smoothMonotone?: 'x' | 'y' | 'none';
    connectNulls?: boolean;
    showSymbol?: boolean;
    showAllSymbol?: 'auto';
    data?: (LineDataValue | LineDataItemOption)[];
}

interface ScatterStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface ExtraStateOption$1 {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
interface ScatterDataItemOption extends SymbolOptionMixin, ScatterStateOption, StatesOptionMixin<ScatterStateOption, ExtraStateOption$1>, OptionDataItemObject<OptionDataValue> {
}
interface ScatterSeriesOption extends SeriesOption<ScatterStateOption, ExtraStateOption$1>, ScatterStateOption, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, SeriesOnCalendarOptionMixin, SeriesOnGeoOptionMixin, SeriesOnSingleOptionMixin, SeriesLargeOptionMixin, SeriesStackOptionMixin, SymbolOptionMixin<CallbackDataParams>, SeriesEncodeOptionMixin {
    type?: 'scatter';
    coordinateSystem?: string;
    cursor?: string;
    clip?: boolean;
    data?: (ScatterDataItemOption | OptionDataValue | OptionDataValue[])[] | ArrayLike<number>;
}

interface PieItemStyleOption extends ItemStyleOption {
    borderRadius?: (number | string)[] | number | string;
}
interface PieStateOption {
    itemStyle?: PieItemStyleOption;
    label?: PieLabelOption;
    labelLine?: PieLabelLineOption;
}
interface PieLabelOption extends Omit<SeriesLabelOption, 'rotate' | 'position'> {
    rotate?: number;
    alignTo?: 'none' | 'labelLine' | 'edge';
    edgeDistance?: string | number;
    bleedMargin?: number;
    distanceToLabelLine?: number;
    position?: SeriesLabelOption['position'] | 'outer' | 'inner' | 'center';
}
interface PieLabelLineOption extends LabelLineOption {
    maxSurfaceAngle?: number;
}
interface ExtraStateOption$2 {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
        scaleSize?: number;
    };
}
interface PieDataItemOption extends OptionDataItemObject<OptionDataValueNumeric>, PieStateOption, StatesOptionMixin<PieStateOption, ExtraStateOption$2> {
    cursor?: string;
}
interface PieSeriesOption extends Omit<SeriesOption<PieStateOption, ExtraStateOption$2>, 'labelLine'>, PieStateOption, CircleLayoutOptionMixin, BoxLayoutOptionMixin, SeriesEncodeOptionMixin {
    type?: 'pie';
    roseType?: 'radius' | 'area';
    clockwise?: boolean;
    startAngle?: number;
    minAngle?: number;
    minShowLabelAngle?: number;
    selectedOffset?: number;
    avoidLabelOverlap?: boolean;
    percentPrecision?: number;
    stillShowZeroSum?: boolean;
    animationType?: 'expansion' | 'scale';
    animationTypeUpdate?: 'transition' | 'expansion';
    data?: OptionDataValueNumeric[] | OptionDataValueNumeric[][] | PieDataItemOption[];
}

declare type RadarSeriesDataValue = OptionDataValue[];
interface RadarSeriesStateOption {
    lineStyle?: LineStyleOption;
    areaStyle?: AreaStyleOption;
    label?: SeriesLabelOption;
    itemStyle?: ItemStyleOption;
}
interface RadarSeriesDataItemOption extends SymbolOptionMixin, RadarSeriesStateOption, StatesOptionMixin<RadarSeriesStateOption>, OptionDataItemObject<RadarSeriesDataValue> {
}
interface RadarSeriesOption extends SeriesOption<RadarSeriesStateOption>, RadarSeriesStateOption, SymbolOptionMixin<CallbackDataParams>, SeriesEncodeOptionMixin {
    type?: 'radar';
    coordinateSystem?: 'radar';
    radarIndex?: number;
    radarId?: string;
    data?: (RadarSeriesDataItemOption | RadarSeriesDataValue)[];
}

interface CurveLineStyleOption extends LineStyleOption {
    curveness?: number;
}
interface TreeSeriesStateOption {
    itemStyle?: ItemStyleOption;
    lineStyle?: CurveLineStyleOption;
    label?: SeriesLabelOption;
}
interface ExtraStateOption$3 {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'ancestor' | 'descendant';
        scale?: boolean;
    };
}
interface TreeSeriesNodeItemOption extends SymbolOptionMixin<CallbackDataParams>, TreeSeriesStateOption, StatesOptionMixin<TreeSeriesStateOption, ExtraStateOption$3>, OptionDataItemObject<OptionDataValue> {
    children?: TreeSeriesNodeItemOption[];
    collapsed?: boolean;
    link?: string;
    target?: string;
}
interface TreeSeriesLeavesOption extends TreeSeriesStateOption, StatesOptionMixin<TreeSeriesStateOption> {
}
interface TreeSeriesOption extends SeriesOption<TreeSeriesStateOption, ExtraStateOption$3>, TreeSeriesStateOption, SymbolOptionMixin, BoxLayoutOptionMixin, RoamOptionMixin {
    type?: 'tree';
    layout?: 'orthogonal' | 'radial';
    edgeShape?: 'polyline' | 'curve';
    edgeForkPosition?: string | number;
    nodeScaleRatio?: number;
    orient?: 'LR' | 'TB' | 'RL' | 'BT' | 'horizontal' | 'vertical';
    expandAndCollapse?: boolean;
    initialTreeDepth?: number;
    leaves?: TreeSeriesLeavesOption;
    data?: TreeSeriesNodeItemOption[];
}

declare type TreemapSeriesDataValue = number | number[];
interface BreadcrumbItemStyleOption extends ItemStyleOption {
    textStyle?: LabelOption;
}
interface TreemapSeriesLabelOption extends SeriesLabelOption {
    ellipsis?: boolean;
    formatter?: string | ((params: CallbackDataParams) => string);
}
interface TreemapSeriesItemStyleOption extends ItemStyleOption {
    borderRadius?: number | number[];
    colorAlpha?: number;
    colorSaturation?: number;
    borderColorSaturation?: number;
    gapWidth?: number;
}
interface ExtraStateOption$4 {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'descendant' | 'ancestor';
    };
}
interface TreemapStateOption {
    itemStyle?: TreemapSeriesItemStyleOption;
    label?: TreemapSeriesLabelOption;
    upperLabel?: TreemapSeriesLabelOption;
}
interface TreemapSeriesVisualOption {
    visualDimension?: number | string;
    colorMappingBy?: 'value' | 'index' | 'id';
    visualMin?: number;
    visualMax?: number;
    colorAlpha?: number[] | 'none';
    colorSaturation?: number[] | 'none';
    visibleMin?: number;
    childrenVisibleMin?: number;
}
interface TreemapSeriesLevelOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption$4> {
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
interface TreemapSeriesNodeItemOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption$4> {
    id?: OptionId;
    name?: OptionName;
    value?: TreemapSeriesDataValue;
    children?: TreemapSeriesNodeItemOption[];
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
interface TreemapSeriesOption extends SeriesOption<TreemapStateOption, ExtraStateOption$4>, TreemapStateOption, BoxLayoutOptionMixin, RoamOptionMixin, TreemapSeriesVisualOption {
    type?: 'treemap';
    size?: (number | string)[];
    sort?: boolean | 'asc' | 'desc';
    clipWindow?: 'origin' | 'fullscreen';
    squareRatio?: number;
    leafDepth?: number;
    drillDownIcon?: string;
    zoomToNodeRatio?: number;
    nodeClick?: 'zoomToNode' | 'link';
    breadcrumb?: BoxLayoutOptionMixin & {
        show?: boolean;
        height?: number;
        emptyItemWidth: number;
        itemStyle?: BreadcrumbItemStyleOption;
        emphasis?: {
            itemStyle?: BreadcrumbItemStyleOption;
        };
    };
    levels?: TreemapSeriesLevelOption[];
    data?: TreemapSeriesNodeItemOption[];
}

declare type GraphDataValue = OptionDataValue | OptionDataValue[];
interface GraphEdgeLineStyleOption extends LineStyleOption {
    curveness?: number;
}
interface GraphNodeStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface ExtraEmphasisState {
    focus?: DefaultEmphasisFocus | 'adjacency';
}
interface ExtraNodeStateOption {
    emphasis?: ExtraEmphasisState;
}
interface ExtraEdgeStateOption {
    emphasis?: ExtraEmphasisState;
}
interface GraphNodeItemOption extends SymbolOptionMixin, GraphNodeStateOption, GraphNodeStateOption, StatesOptionMixin<GraphNodeStateOption, ExtraNodeStateOption> {
    id?: string;
    name?: string;
    value?: GraphDataValue;
    x?: number;
    y?: number;
    fixed?: boolean;
    category?: number | string;
    draggable?: boolean;
}
interface GraphEdgeStateOption {
    lineStyle?: GraphEdgeLineStyleOption;
    label?: SeriesLineLabelOption;
}
interface GraphEdgeItemOption extends GraphEdgeStateOption, StatesOptionMixin<GraphEdgeStateOption, ExtraEdgeStateOption>, GraphEdgeItemObject<OptionDataValueNumeric> {
    value?: number;
    symbol?: string | string[];
    symbolSize?: number | number[];
    ignoreForceLayout?: boolean;
}
interface GraphCategoryItemOption extends SymbolOptionMixin, GraphNodeStateOption, StatesOptionMixin<GraphNodeStateOption> {
    name?: string;
    value?: OptionDataValue;
}
interface GraphSeriesOption extends SeriesOption, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, SeriesOnCalendarOptionMixin, SeriesOnGeoOptionMixin, SeriesOnSingleOptionMixin, SymbolOptionMixin<CallbackDataParams>, RoamOptionMixin, BoxLayoutOptionMixin {
    type?: 'graph';
    coordinateSystem?: string;
    legendHoverLink?: boolean;
    layout?: 'none' | 'force' | 'circular';
    data?: (GraphNodeItemOption | GraphDataValue)[];
    nodes?: (GraphNodeItemOption | GraphDataValue)[];
    edges?: GraphEdgeItemOption[];
    links?: GraphEdgeItemOption[];
    categories?: GraphCategoryItemOption[];
    focusNodeAdjacency?: boolean;
    nodeScaleRatio?: 0.6;
    draggable?: boolean;
    edgeSymbol?: string | string[];
    edgeSymbolSize?: number | number[];
    edgeLabel?: SeriesLineLabelOption;
    label?: SeriesLabelOption;
    itemStyle?: ItemStyleOption;
    lineStyle?: GraphEdgeLineStyleOption;
    emphasis?: {
        focus?: Exclude<GraphNodeItemOption['emphasis'], undefined>['focus'];
        scale?: boolean;
        label?: SeriesLabelOption;
        edgeLabel?: SeriesLabelOption;
        itemStyle?: ItemStyleOption;
        lineStyle?: LineStyleOption;
    };
    blur?: {
        label?: SeriesLabelOption;
        edgeLabel?: SeriesLabelOption;
        itemStyle?: ItemStyleOption;
        lineStyle?: LineStyleOption;
    };
    select?: {
        label?: SeriesLabelOption;
        edgeLabel?: SeriesLabelOption;
        itemStyle?: ItemStyleOption;
        lineStyle?: LineStyleOption;
    };
    circular?: {
        rotateLabel?: boolean;
    };
    force?: {
        initLayout?: 'circular' | 'none';
        repulsion?: number | number[];
        gravity?: number;
        friction?: number;
        edgeLength?: number | number[];
        layoutAnimation?: boolean;
    };
}

declare type GaugeColorStop = [number, ColorString];
interface LabelFormatter$1 {
    (value: number): string;
}
interface PointerOption {
    icon?: string;
    show?: boolean;
    keepAspect?: boolean;
    itemStyle?: ItemStyleOption;
    offsetCenter?: (number | string)[];
    length?: number | string;
    width?: number;
}
interface AnchorOption {
    show?: boolean;
    showAbove?: boolean;
    size?: number;
    icon?: string;
    offsetCenter?: (number | string)[];
    keepAspect?: boolean;
    itemStyle?: ItemStyleOption;
}
interface ProgressOption {
    show?: boolean;
    overlap?: boolean;
    width?: number;
    roundCap?: boolean;
    clip?: boolean;
    itemStyle?: ItemStyleOption;
}
interface TitleOption$1 extends LabelOption {
    offsetCenter?: (number | string)[];
    formatter?: LabelFormatter$1 | string;
    valueAnimation?: boolean;
}
interface DetailOption extends LabelOption {
    offsetCenter?: (number | string)[];
    formatter?: LabelFormatter$1 | string;
    valueAnimation?: boolean;
}
interface GaugeStateOption {
    itemStyle?: ItemStyleOption;
}
interface GaugeDataItemOption extends GaugeStateOption, StatesOptionMixin<GaugeStateOption> {
    name?: string;
    value?: OptionDataValueNumeric;
    pointer?: PointerOption;
    progress?: ProgressOption;
    title?: TitleOption$1;
    detail?: DetailOption;
}
interface GaugeSeriesOption extends SeriesOption<GaugeStateOption>, GaugeStateOption, CircleLayoutOptionMixin, SeriesEncodeOptionMixin {
    type?: 'gauge';
    radius?: number | string;
    startAngle?: number;
    endAngle?: number;
    clockwise?: boolean;
    min?: number;
    max?: number;
    splitNumber?: number;
    itemStyle?: ItemStyleOption;
    axisLine?: {
        show?: boolean;
        roundCap?: boolean;
        lineStyle?: Omit<LineStyleOption, 'color'> & {
            color: GaugeColorStop[];
        };
    };
    progress?: ProgressOption;
    splitLine?: {
        show?: boolean;
        length?: number;
        distance?: number;
        lineStyle?: LineStyleOption;
    };
    axisTick?: {
        show?: boolean;
        splitNumber?: number;
        length?: number | string;
        distance?: number;
        lineStyle?: LineStyleOption;
    };
    axisLabel?: LabelOption & {
        formatter?: LabelFormatter$1 | string;
    };
    pointer?: PointerOption;
    anchor?: AnchorOption;
    title?: TitleOption$1;
    detail?: DetailOption;
    data?: (OptionDataValueNumeric | GaugeDataItemOption)[];
}

declare type FunnelLabelOption = Omit<SeriesLabelOption, 'position'> & {
    position?: LabelOption['position'] | 'outer' | 'inner' | 'center' | 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom';
};
interface FunnelStateOption {
    itemStyle?: ItemStyleOption;
    label?: FunnelLabelOption;
    labelLine?: LabelLineOption;
}
interface FunnelDataItemOption extends FunnelStateOption, StatesOptionMixin<FunnelStateOption>, OptionDataItemObject<OptionDataValueNumeric> {
    itemStyle?: ItemStyleOption & {
        width?: number | string;
        height?: number | string;
    };
}
interface FunnelSeriesOption extends SeriesOption<FunnelStateOption>, FunnelStateOption, BoxLayoutOptionMixin, SeriesEncodeOptionMixin {
    type?: 'funnel';
    min?: number;
    max?: number;
    minSize?: number | string;
    maxSize?: number | string;
    sort?: 'ascending' | 'descending' | 'none';
    orient?: LayoutOrient;
    gap?: number;
    funnelAlign?: HorizontalAlign | VerticalAlign;
    data?: (OptionDataValueNumeric | OptionDataValueNumeric[] | FunnelDataItemOption)[];
}

declare type ParallelSeriesDataValue = OptionDataValue[];
interface ParallelStateOption {
    lineStyle?: LineStyleOption;
    label?: SeriesLabelOption;
}
interface ParallelSeriesDataItemOption extends ParallelStateOption, StatesOptionMixin<ParallelStateOption> {
    value?: ParallelSeriesDataValue[];
}
interface ParallelSeriesOption extends SeriesOption<ParallelStateOption>, ParallelStateOption, SeriesEncodeOptionMixin {
    type?: 'parallel';
    coordinateSystem?: string;
    parallelIndex?: number;
    parallelId?: string;
    inactiveOpacity?: number;
    activeOpacity?: number;
    smooth?: boolean | number;
    realtime?: boolean;
    tooltip?: SeriesTooltipOption;
    parallelAxisDefault?: ParallelAxisOption;
    emphasis?: {
        label?: SeriesLabelOption;
        lineStyle?: LineStyleOption;
    };
    data?: (ParallelSeriesDataValue | ParallelSeriesDataItemOption)[];
}

declare type FocusNodeAdjacency = boolean | 'inEdges' | 'outEdges' | 'allEdges';
interface SankeyNodeStateOption {
    label?: SeriesLabelOption;
    itemStyle?: ItemStyleOption;
}
interface SankeyEdgeStateOption {
    lineStyle?: SankeyEdgeStyleOption;
}
interface SankeyBothStateOption extends SankeyNodeStateOption, SankeyEdgeStateOption {
}
interface SankeyEdgeStyleOption extends LineStyleOption {
    curveness?: number;
}
interface ExtraStateOption$5 {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'adjacency';
    };
}
interface SankeyNodeItemOption extends SankeyNodeStateOption, StatesOptionMixin<SankeyNodeStateOption, ExtraStateOption$5>, OptionDataItemObject<OptionDataValue> {
    id?: string;
    localX?: number;
    localY?: number;
    depth?: number;
    draggable?: boolean;
    focusNodeAdjacency?: FocusNodeAdjacency;
}
interface SankeyEdgeItemOption extends SankeyEdgeStateOption, StatesOptionMixin<SankeyEdgeStateOption, ExtraStateOption$5>, GraphEdgeItemObject<OptionDataValueNumeric> {
    focusNodeAdjacency?: FocusNodeAdjacency;
}
interface SankeyLevelOption extends SankeyNodeStateOption, SankeyEdgeStateOption {
    depth: number;
}
interface SankeySeriesOption extends SeriesOption<SankeyBothStateOption, ExtraStateOption$5>, SankeyBothStateOption, BoxLayoutOptionMixin {
    type?: 'sankey';
    color?: ColorString[];
    coordinateSystem?: 'view';
    orient?: LayoutOrient;
    nodeWidth?: number;
    nodeGap?: number;
    draggable?: boolean;
    focusNodeAdjacency?: FocusNodeAdjacency;
    layoutIterations?: number;
    nodeAlign?: 'justify' | 'left' | 'right';
    data?: SankeyNodeItemOption[];
    nodes?: SankeyNodeItemOption[];
    edges?: SankeyEdgeItemOption[];
    links?: SankeyEdgeItemOption[];
    levels?: SankeyLevelOption[];
}

declare type BoxplotDataValue = OptionDataValueNumeric[];
interface BoxplotStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface BoxplotDataItemOption extends BoxplotStateOption, StatesOptionMixin<BoxplotStateOption, ExtraStateOption$6> {
    value: BoxplotDataValue;
}
interface ExtraStateOption$6 {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
interface BoxplotSeriesOption extends SeriesOption<BoxplotStateOption, ExtraStateOption$6>, BoxplotStateOption, SeriesOnCartesianOptionMixin, SeriesEncodeOptionMixin {
    type?: 'boxplot';
    coordinateSystem?: 'cartesian2d';
    layout?: LayoutOrient;
    boxWidth?: (string | number)[];
    data?: (BoxplotDataValue | BoxplotDataItemOption)[];
}

declare type CandlestickDataValue = OptionDataValueNumeric[];
interface CandlestickItemStyleOption extends ItemStyleOption {
    color0?: ZRColor;
    borderColor0?: ColorString;
}
interface CandlestickStateOption {
    itemStyle?: CandlestickItemStyleOption;
    label?: SeriesLabelOption;
}
interface CandlestickDataItemOption extends CandlestickStateOption, StatesOptionMixin<CandlestickStateOption, ExtraStateOption$7> {
    value: CandlestickDataValue;
}
interface ExtraStateOption$7 {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
interface CandlestickSeriesOption extends SeriesOption<CandlestickStateOption, ExtraStateOption$7>, CandlestickStateOption, SeriesOnCartesianOptionMixin, SeriesLargeOptionMixin, SeriesEncodeOptionMixin {
    type?: 'candlestick';
    coordinateSystem?: 'cartesian2d';
    layout?: LayoutOrient;
    clip?: boolean;
    barMaxWidth?: number | string;
    barMinWidth?: number | string;
    barWidth?: number | string;
    data?: (CandlestickDataValue | CandlestickDataItemOption)[];
}

interface RippleEffectOption {
    period?: number;
    scale?: number;
    brushType?: 'fill' | 'stroke';
    color?: ZRColor;
}
interface SymbolDrawStateOption {
    itemStyle?: ItemStyleOption;
    label?: LabelOption;
}
interface SymbolDrawItemModelOption extends SymbolOptionMixin<object>, StatesOptionMixin<SymbolDrawStateOption, {
    emphasis?: {
        focus?: string;
        scale?: boolean;
    };
}>, SymbolDrawStateOption {
    cursor?: string;
    rippleEffect?: RippleEffectOption;
}

declare type ScatterDataValue = OptionDataValue | OptionDataValue[];
interface EffectScatterStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface EffectScatterDataItemOption extends SymbolOptionMixin, EffectScatterStateOption, StatesOptionMixin<EffectScatterStateOption> {
    name?: string;
    value?: ScatterDataValue;
    rippleEffect?: SymbolDrawItemModelOption['rippleEffect'];
}
interface EffectScatterSeriesOption extends SeriesOption<EffectScatterStateOption>, EffectScatterStateOption, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, SeriesOnCalendarOptionMixin, SeriesOnGeoOptionMixin, SeriesOnSingleOptionMixin, SymbolOptionMixin<CallbackDataParams>, SeriesEncodeOptionMixin {
    type?: 'effectScatter';
    coordinateSystem?: string;
    effectType?: 'ripple';
    showEffectOn?: 'render' | 'emphasis';
    rippleEffect?: SymbolDrawItemModelOption['rippleEffect'];
    data?: (EffectScatterDataItemOption | ScatterDataValue)[];
}

interface LineDrawStateOption {
    lineStyle?: LineStyleOption;
    label?: LineLabelOption;
}
interface LineDrawModelOption extends LineDrawStateOption, StatesOptionMixin<LineDrawStateOption> {
    effect?: {
        show?: boolean;
        period?: number;
        delay?: number | ((idx: number) => number);
        constantSpeed?: number;
        symbol?: string;
        symbolSize?: number | number[];
        loop?: boolean;
        trailLength?: number;
        color?: ColorString;
    };
}

declare type LinesCoords = number[][];
declare type LinesValue = OptionDataValue | OptionDataValue[];
interface LinesLineStyleOption extends LineStyleOption {
    curveness?: number;
}
interface LinesStateOption {
    lineStyle?: LinesLineStyleOption;
    label?: SeriesLineLabelOption;
}
interface LinesDataItemOption extends LinesStateOption, StatesOptionMixin<LinesStateOption> {
    name?: string;
    fromName?: string;
    toName?: string;
    symbol?: string[] | string;
    symbolSize?: number[] | number;
    coords?: LinesCoords;
    value?: LinesValue;
}
interface LinesSeriesOption extends SeriesOption<LinesStateOption>, LinesStateOption, SeriesOnCartesianOptionMixin, SeriesOnGeoOptionMixin, SeriesOnPolarOptionMixin, SeriesOnCalendarOptionMixin, SeriesLargeOptionMixin {
    type?: 'lines';
    coordinateSystem?: string;
    symbol?: string[] | string;
    symbolSize?: number[] | number;
    effect?: LineDrawModelOption['effect'];
    polyline?: boolean;
    clip?: boolean;
    data?: LinesDataItemOption[] | ArrayLike<number>;
}

declare type HeatmapDataValue = OptionDataValue[];
interface HeatmapStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface HeatmapDataItemOption extends HeatmapStateOption, StatesOptionMixin<HeatmapStateOption> {
    value: HeatmapDataValue;
}
interface HeatmapSeriesOption extends SeriesOption<HeatmapStateOption>, HeatmapStateOption, SeriesOnCartesianOptionMixin, SeriesOnGeoOptionMixin, SeriesOnCalendarOptionMixin, SeriesEncodeOptionMixin {
    type?: 'heatmap';
    coordinateSystem?: 'cartesian2d' | 'geo' | 'calendar';
    blurSize?: number;
    pointSize?: number;
    maxOpacity?: number;
    minOpacity?: number;
    data?: (HeatmapDataItemOption | HeatmapDataValue)[];
}

interface PictorialBarStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface PictorialBarSeriesSymbolOption {
    symbol?: string;
    symbolSize?: (number | string)[] | number | string;
    symbolRotate?: number;
    symbolPosition?: 'start' | 'end' | 'center';
    symbolOffset?: (number | string)[] | number | string;
    symbolMargin?: (number | string)[] | number | string;
    symbolRepeat?: boolean | number | 'fixed';
    symbolRepeatDirection?: 'start' | 'end';
    symbolClip?: boolean;
    symbolBoundingData?: number | number[];
    symbolPatternSize?: number;
}
interface ExtraStateOption$8 {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
interface PictorialBarDataItemOption extends PictorialBarSeriesSymbolOption, AnimationOptionMixin, PictorialBarStateOption, StatesOptionMixin<PictorialBarStateOption, ExtraStateOption$8>, OptionDataItemObject<OptionDataValue> {
    z?: number;
    cursor?: string;
}
interface PictorialBarSeriesOption extends BaseBarSeriesOption<PictorialBarStateOption, ExtraStateOption$8>, PictorialBarStateOption, PictorialBarSeriesSymbolOption, SeriesStackOptionMixin {
    type?: 'pictorialBar';
    coordinateSystem?: 'cartesian2d';
    data?: (PictorialBarDataItemOption | OptionDataValue | OptionDataValue[])[];
}

interface ThemeRiverSeriesLabelOption extends SeriesLabelOption {
    margin?: number;
}
declare type ThemerRiverDataItem = [OptionDataValueDate, OptionDataValueNumeric, string];
interface ThemeRiverStateOption {
    label?: ThemeRiverSeriesLabelOption;
    itemStyle?: ItemStyleOption;
}
interface ThemeRiverSeriesOption extends SeriesOption<ThemeRiverStateOption>, ThemeRiverStateOption, SeriesOnSingleOptionMixin, BoxLayoutOptionMixin {
    type?: 'themeRiver';
    color?: ZRColor[];
    coordinateSystem?: 'singleAxis';
    boundaryGap?: (string | number)[];
    data?: ThemerRiverDataItem[];
}

interface SunburstItemStyleOption extends ItemStyleOption {
    borderRadius?: (number | string)[] | number | string;
}
interface SunburstLabelOption extends Omit<SeriesLabelOption, 'rotate' | 'position'> {
    rotate?: 'radial' | 'tangential' | number;
    minAngle?: number;
    silent?: boolean;
    position?: SeriesLabelOption['position'] | 'outside';
}
interface ExtraStateOption$9 {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'descendant' | 'ancestor';
    };
}
interface SunburstStateOption {
    itemStyle?: SunburstItemStyleOption;
    label?: SunburstLabelOption;
}
interface SunburstSeriesLevelOption extends SunburstStateOption, StatesOptionMixin<SunburstStateOption> {
    highlight?: {
        itemStyle?: SunburstItemStyleOption;
        label?: SunburstLabelOption;
    };
}
interface SortParam {
    dataIndex: number;
    depth: number;
    height: number;
    getValue(): number;
}
interface SunburstSeriesOption extends SeriesOption<SunburstStateOption, ExtraStateOption$9>, SunburstStateOption, CircleLayoutOptionMixin {
    type?: 'sunburst';
    clockwise?: boolean;
    startAngle?: number;
    minAngle?: number;
    stillShowZeroSum?: boolean;
    nodeClick?: 'rootToNode' | 'link';
    renderLabelForZeroData?: boolean;
    levels?: SunburstSeriesLevelOption[];
    animationType?: 'expansion' | 'scale';
    sort?: 'desc' | 'asc' | ((a: SortParam, b: SortParam) => number);
}

declare const TRANSFORM_PROPS$1: {
    readonly x: 1;
    readonly y: 1;
    readonly scaleX: 1;
    readonly scaleY: 1;
    readonly originX: 1;
    readonly originY: 1;
    readonly rotation: 1;
};
declare type TransformProp$1 = keyof typeof TRANSFORM_PROPS$1;
interface GraphicComponentBaseElementOption extends Partial<Pick<Element, TransformProp$1 | 'silent' | 'ignore' | 'draggable' | 'textConfig' | 'onclick' | 'ondblclick' | 'onmouseover' | 'onmouseout' | 'onmousemove' | 'onmousewheel' | 'onmousedown' | 'onmouseup' | 'oncontextmenu' | 'ondrag' | 'ondragstart' | 'ondragend' | 'ondragenter' | 'ondragleave' | 'ondragover' | 'ondrop'>>, Partial<Pick<BoxLayoutOptionMixin, 'left' | 'right' | 'top' | 'bottom'>> {
    type?: string;
    id?: OptionId;
    name?: string;
    parentId?: OptionId;
    parentOption?: GraphicComponentElementOption;
    children?: GraphicComponentElementOption[];
    hv?: [boolean, boolean];
    bounding?: 'raw' | 'all';
    info?: GraphicExtraElementInfo;
    textContent?: GraphicComponentTextOption;
    textConfig?: ElementTextConfig;
    $action?: 'merge' | 'replace' | 'remove';
}
interface GraphicComponentDisplayableOption extends GraphicComponentBaseElementOption, Partial<Pick<Displayable, 'zlevel' | 'z' | 'z2' | 'invisible' | 'cursor'>> {
    style?: ZRStyleProps;
}
interface GraphicComponentGroupOption extends GraphicComponentBaseElementOption {
    type?: 'group';
    width?: number;
    height?: number;
    children: GraphicComponentElementOption[];
}
interface GraphicComponentZRPathOption extends GraphicComponentDisplayableOption {
    shape?: PathProps['shape'];
}
interface GraphicComponentImageOption extends GraphicComponentDisplayableOption {
    type?: 'image';
    style?: ImageStyleProps;
}
interface GraphicComponentTextOption extends Omit<GraphicComponentDisplayableOption, 'textContent' | 'textConfig'> {
    type?: 'text';
    style?: TextStyleProps;
}
declare type GraphicComponentElementOption = GraphicComponentGroupOption | GraphicComponentZRPathOption | GraphicComponentImageOption | GraphicComponentTextOption;
declare type GraphicExtraElementInfo = Dictionary<unknown>;
declare type GraphicComponentLooseOption = (GraphicComponentOption | GraphicComponentElementOption) & {
    mainType?: 'graphic';
};
interface GraphicComponentOption extends ComponentOption {
    elements?: GraphicComponentElementOption[];
}
declare function install$o(registers: EChartsExtensionInstallRegisters): void;

declare const ICON_TYPES: readonly ["rect", "polygon", "lineX", "lineY", "keep", "clear"];
declare type IconType = typeof ICON_TYPES[number];
interface ToolboxBrushFeatureOption extends ToolboxFeatureOption {
    type?: IconType[];
    icon?: {
        [key in IconType]?: string;
    };
    title?: {
        [key in IconType]?: string;
    };
}

interface ToolboxDataViewFeatureOption extends ToolboxFeatureOption {
    readOnly?: boolean;
    optionToContent?: (option: ECUnitOption) => string | HTMLElement;
    contentToOption?: (viewMain: HTMLDivElement, oldOption: ECUnitOption) => ECUnitOption;
    icon?: string;
    title?: string;
    lang?: string[];
    backgroundColor?: ColorString;
    textColor?: ColorString;
    textareaColor?: ColorString;
    textareaBorderColor?: ColorString;
    buttonColor?: ColorString;
    buttonTextColor?: ColorString;
}

declare const ICON_TYPES$1: readonly ["zoom", "back"];
declare type IconType$1 = typeof ICON_TYPES$1[number];
interface ToolboxDataZoomFeatureOption extends ToolboxFeatureOption {
    type?: IconType$1[];
    icon?: {
        [key in IconType$1]?: string;
    };
    title?: {
        [key in IconType$1]?: string;
    };
    filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none';
    xAxisIndex?: ModelFinderIndexQuery;
    yAxisIndex?: ModelFinderIndexQuery;
    xAxisId?: ModelFinderIdQuery;
    yAxisId?: ModelFinderIdQuery;
    brushStyle?: ItemStyleOption;
}

declare const ICON_TYPES$2: readonly ["line", "bar", "stack"];
declare const TITLE_TYPES: readonly ["line", "bar", "stack", "tiled"];
declare type IconType$2 = typeof ICON_TYPES$2[number];
declare type TitleType = typeof TITLE_TYPES[number];
interface ToolboxMagicTypeFeatureOption extends ToolboxFeatureOption {
    type?: IconType$2[];
    icon?: {
        [key in IconType$2]?: string;
    };
    title?: {
        [key in TitleType]?: string;
    };
    option?: {
        [key in IconType$2]?: SeriesOption;
    };
    seriesIndex?: {
        line?: number;
        bar?: number;
    };
}

interface ToolboxRestoreFeatureOption extends ToolboxFeatureOption {
    icon?: string;
    title?: string;
}

interface ToolboxSaveAsImageFeatureOption extends ToolboxFeatureOption {
    icon?: string;
    title?: string;
    type?: 'png' | 'jpg';
    backgroundColor?: ZRColor;
    connectedBackgroundColor?: ZRColor;
    name?: string;
    excludeComponents?: string[];
    pixelRatio?: number;
    lang?: string[];
}

interface ToolboxComponentOption extends ToolboxOption {
    feature?: {
        brush?: ToolboxBrushFeatureOption;
        dataView?: ToolboxDataViewFeatureOption;
        dataZoom?: ToolboxDataZoomFeatureOption;
        magicType?: ToolboxMagicTypeFeatureOption;
        restore?: ToolboxRestoreFeatureOption;
        saveAsImage?: ToolboxSaveAsImageFeatureOption;
        [key: string]: ToolboxFeatureOption | {
            [key: string]: any;
        } | undefined;
    };
}
declare type DataZoomComponentOption = SliderDataZoomOption | InsideDataZoomOption;
declare type VisualMapComponentOption = ContinousVisualMapOption | PiecewiseVisualMapOption;
declare type LegendComponentOption = LegendOption | ScrollableLegendOption;

declare type SeriesInjectedOption = {
    markArea?: MarkAreaOption;
    markLine?: MarkLineOption;
    markPoint?: MarkPointOption;
    tooltip?: SeriesTooltipOption;
};
declare type LineSeriesOption$1 = LineSeriesOption & SeriesInjectedOption;
declare type BarSeriesOption$1 = BarSeriesOption & SeriesInjectedOption;
declare type ScatterSeriesOption$1 = ScatterSeriesOption & SeriesInjectedOption;
declare type PieSeriesOption$1 = PieSeriesOption & SeriesInjectedOption;
declare type RadarSeriesOption$1 = RadarSeriesOption & SeriesInjectedOption;
declare type MapSeriesOption$1 = MapSeriesOption & SeriesInjectedOption;
declare type TreeSeriesOption$1 = TreeSeriesOption & SeriesInjectedOption;
declare type TreemapSeriesOption$1 = TreemapSeriesOption & SeriesInjectedOption;
declare type GraphSeriesOption$1 = GraphSeriesOption & SeriesInjectedOption;
declare type GaugeSeriesOption$1 = GaugeSeriesOption & SeriesInjectedOption;
declare type FunnelSeriesOption$1 = FunnelSeriesOption & SeriesInjectedOption;
declare type ParallelSeriesOption$1 = ParallelSeriesOption & SeriesInjectedOption;
declare type SankeySeriesOption$1 = SankeySeriesOption & SeriesInjectedOption;
declare type BoxplotSeriesOption$1 = BoxplotSeriesOption & SeriesInjectedOption;
declare type CandlestickSeriesOption$1 = CandlestickSeriesOption & SeriesInjectedOption;
declare type EffectScatterSeriesOption$1 = EffectScatterSeriesOption & SeriesInjectedOption;
declare type LinesSeriesOption$1 = LinesSeriesOption & SeriesInjectedOption;
declare type HeatmapSeriesOption$1 = HeatmapSeriesOption & SeriesInjectedOption;
declare type PictorialBarSeriesOption$1 = PictorialBarSeriesOption & SeriesInjectedOption;
declare type ThemeRiverSeriesOption$1 = ThemeRiverSeriesOption & SeriesInjectedOption;
declare type SunburstSeriesOption$1 = SunburstSeriesOption & SeriesInjectedOption;
declare type CustomSeriesOption$1 = CustomSeriesOption & SeriesInjectedOption;
declare type SeriesOption$1 = LineSeriesOption$1 | BarSeriesOption$1 | ScatterSeriesOption$1 | PieSeriesOption$1 | RadarSeriesOption$1 | MapSeriesOption$1 | TreeSeriesOption$1 | TreemapSeriesOption$1 | GraphSeriesOption$1 | GaugeSeriesOption$1 | FunnelSeriesOption$1 | ParallelSeriesOption$1 | SankeySeriesOption$1 | BoxplotSeriesOption$1 | CandlestickSeriesOption$1 | EffectScatterSeriesOption$1 | LinesSeriesOption$1 | HeatmapSeriesOption$1 | PictorialBarSeriesOption$1 | ThemeRiverSeriesOption$1 | SunburstSeriesOption$1 | CustomSeriesOption$1;
interface EChartsOption extends ECBasicOption {
    dataset?: DatasetOption | DatasetOption[];
    aria?: AriaOption;
    title?: TitleOption | TitleOption[];
    grid?: GridOption | GridOption[];
    radar?: RadarOption | RadarOption[];
    polar?: PolarOption | PolarOption[];
    geo?: GeoOption | GeoOption[];
    angleAxis?: AngleAxisOption | AngleAxisOption[];
    radiusAxis?: RadiusAxisOption | RadiusAxisOption[];
    xAxis?: XAXisOption | XAXisOption[];
    yAxis?: YAXisOption | YAXisOption[];
    singleAxis?: SingleAxisOption | SingleAxisOption[];
    parallel?: ParallelCoordinateSystemOption | ParallelCoordinateSystemOption[];
    parallelAxis?: ParallelAxisOption | ParallelAxisOption[];
    calendar?: CalendarOption | CalendarOption[];
    toolbox?: ToolboxComponentOption | ToolboxComponentOption[];
    tooltip?: TooltipOption | TooltipOption[];
    axisPointer?: AxisPointerOption | AxisPointerOption[];
    brush?: BrushOption | BrushOption[];
    timeline?: TimelineOption | SliderTimelineOption;
    legend?: LegendComponentOption | (LegendComponentOption)[];
    dataZoom?: DataZoomComponentOption | (DataZoomComponentOption)[];
    visualMap?: VisualMapComponentOption | (VisualMapComponentOption)[];
    graphic?: GraphicComponentLooseOption | GraphicComponentLooseOption[];
    series?: SeriesOption$1 | SeriesOption$1[];
    options?: EChartsOption[];
    baseOption?: EChartsOption;
}

declare function install$p(registers: EChartsExtensionInstallRegisters): void;

declare function install$q(registers: EChartsExtensionInstallRegisters): void;

declare function install$r(registers: EChartsExtensionInstallRegisters): void;

declare function install$s(registers: EChartsExtensionInstallRegisters): void;

declare function install$t(registers: EChartsExtensionInstallRegisters): void;

declare function install$u(registers: EChartsExtensionInstallRegisters): void;

declare function install$v(registers: EChartsExtensionInstallRegisters): void;

declare function install$w(registers: EChartsExtensionInstallRegisters): void;

declare function install$x(registers: EChartsExtensionInstallRegisters): void;

declare function install$y(registers: EChartsExtensionInstallRegisters): void;

declare function install$z(registers: EChartsExtensionInstallRegisters): void;

declare function install$A(registers: EChartsExtensionInstallRegisters): void;

declare function install$B(registers: EChartsExtensionInstallRegisters): void;

declare function install$C(registers: EChartsExtensionInstallRegisters): void;

declare function install$D(registers: EChartsExtensionInstallRegisters): void;

declare function install$E(registers: EChartsExtensionInstallRegisters): void;

declare function install$F(registers: EChartsExtensionInstallRegisters): void;

declare function install$G(registers: EChartsExtensionInstallRegisters): void;

declare function install$H(registers: EChartsExtensionInstallRegisters): void;

declare function install$I(registers: EChartsExtensionInstallRegisters): void;

declare function install$J(registers: EChartsExtensionInstallRegisters): void;

declare function install$K(registers: EChartsExtensionInstallRegisters): void;

declare function install$L(registers: EChartsExtensionInstallRegisters): void;

declare function install$M(registers: EChartsExtensionInstallRegisters): void;

declare function install$N(registers: EChartsExtensionInstallRegisters): void;

declare function install$O(registers: EChartsExtensionInstallRegisters): void;

declare function install$P(registers: EChartsExtensionInstallRegisters): void;

declare function install$Q(registers: EChartsExtensionInstallRegisters): void;

declare function install$R(registers: EChartsExtensionInstallRegisters): void;

export { AngleAxisOption, AriaOption, Axis, AxisPointerOption, BarSeriesOption$1 as BarSeriesOption, BoxplotSeriesOption$1 as BoxplotSeriesOption, BrushOption, CalendarOption, CandlestickSeriesOption$1 as CandlestickSeriesOption, ChartView, ComponentModel, ComponentView, ComposeOption, CustomSeriesOption$1 as CustomSeriesOption, DataZoomComponentOption, DatasetOption, ECBasicOption, EChartsOption, EChartsType, EffectScatterSeriesOption$1 as EffectScatterSeriesOption, FunnelSeriesOption$1 as FunnelSeriesOption, GaugeSeriesOption$1 as GaugeSeriesOption, GeoOption, GraphSeriesOption$1 as GraphSeriesOption, GraphicComponentLooseOption, GridOption, HeatmapSeriesOption$1 as HeatmapSeriesOption, LegendComponentOption, LineSeriesOption$1 as LineSeriesOption, LinesSeriesOption$1 as LinesSeriesOption, List, MapSeriesOption$1 as MapSeriesOption, MarkAreaOption, MarkLineOption, MarkPointOption, Model, PRIORITY, ParallelCoordinateSystemOption, ParallelSeriesOption$1 as ParallelSeriesOption, PictorialBarSeriesOption$1 as PictorialBarSeriesOption, PieSeriesOption$1 as PieSeriesOption, PolarOption, RadarOption, RadarSeriesOption$1 as RadarSeriesOption, RadiusAxisOption, SankeySeriesOption$1 as SankeySeriesOption, ScatterSeriesOption$1 as ScatterSeriesOption, SeriesModel, SeriesOption$1 as SeriesOption, SetOptionTransitionOptItem, SingleAxisOption, SunburstSeriesOption$1 as SunburstSeriesOption, ThemeRiverSeriesOption$1 as ThemeRiverSeriesOption, TimelineOption, TitleOption, ToolboxComponentOption, TooltipOption, TreeSeriesOption$1 as TreeSeriesOption, TreemapSeriesOption$1 as TreemapSeriesOption, VisualMapComponentOption, XAXisOption, YAXisOption, brushSingle, color_d, connect, dataTool, dependencies, disConnect, disconnect, dispose$1 as dispose, env, extendChartView, extendComponentModel, extendComponentView, extendSeriesModel, format_d, getCoordinateSystemDimensions, getInstanceByDom, getInstanceById, getMap, graphic_d, helper_d, init$1 as init, install$2 as install, install$3 as install$1, install$c as install$10, install$d as install$11, install$e as install$12, install$f as install$13, install$g as install$14, install$h as install$15, install$i as install$16, install$j as install$17, install$k as install$18, install$l as install$19, install$4 as install$2, install$m as install$20, install as install$21, install$p as install$22, install$q as install$23, install$r as install$24, install$s as install$25, install$t as install$26, install$u as install$27, install$v as install$28, install$w as install$29, install$5 as install$3, install$o as install$30, install$x as install$31, install$y as install$32, install$z as install$33, install$A as install$34, install$n as install$35, install$B as install$36, install$C as install$37, install$D as install$38, install$E as install$39, install$6 as install$4, install$F as install$40, install$G as install$41, install$H as install$42, install$I as install$43, install$J as install$44, install$K as install$45, install$L as install$46, install$M as install$47, install$N as install$48, install$O as install$49, install$7 as install$5, install$P as install$50, install$1 as install$51, install$Q as install$52, install$R as install$53, install$8 as install$6, install$9 as install$7, install$a as install$8, install$b as install$9, matrix_d, number_d, parseGeoJSON, registerAction, registerCoordinateSystem, registerLayout, registerLoading, registerLocale, registerMap, registerPostInit, registerPostUpdate, registerPreprocessor, registerProcessor, registerTheme, registerTransform, registerVisual, setCanvasCreator, throttle, time_d, use, util_d, util_d$1, vector_d, version$1 as version, zrender_d };