import * as pathTool from 'zrender/lib/tool/path';
import * as matrix from 'zrender/lib/core/matrix';
import * as vector from 'zrender/lib/core/vector';
import Path from 'zrender/lib/graphic/Path';
import Transformable from 'zrender/lib/core/Transformable';
import ZRImage from 'zrender/lib/graphic/Image';
import Group from 'zrender/lib/graphic/Group';
import ZRText from 'zrender/lib/graphic/Text';
import Circle from 'zrender/lib/graphic/shape/Circle';
import Ellipse from 'zrender/lib/graphic/shape/Ellipse';
import Sector from 'zrender/lib/graphic/shape/Sector';
import Ring from 'zrender/lib/graphic/shape/Ring';
import Polygon from 'zrender/lib/graphic/shape/Polygon';
import Polyline from 'zrender/lib/graphic/shape/Polyline';
import Rect from 'zrender/lib/graphic/shape/Rect';
import Line from 'zrender/lib/graphic/shape/Line';
import BezierCurve from 'zrender/lib/graphic/shape/BezierCurve';
import Arc from 'zrender/lib/graphic/shape/Arc';
import CompoundPath from 'zrender/lib/graphic/CompoundPath';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import RadialGradient from 'zrender/lib/graphic/RadialGradient';
import BoundingRect from 'zrender/lib/core/BoundingRect';
import OrientedBoundingRect from 'zrender/lib/core/OrientedBoundingRect';
import Point from 'zrender/lib/core/Point';
import IncrementalDisplayable from 'zrender/lib/graphic/IncrementalDisplayable';
import * as subPixelOptimizeUtil from 'zrender/lib/graphic/helper/subPixelOptimize';
import { DisplayableProps } from 'zrender/lib/graphic/Displayable';
import Element from 'zrender/lib/Element';
import Model from '../model/Model';
import { AnimationOptionMixin, ZRRectLike, AnimationOption } from './types';
declare type ExtendShapeOpt = Parameters<typeof Path.extend>[0];
declare type ExtendShapeReturn = ReturnType<typeof Path.extend>;
export declare function extendShape(opts: ExtendShapeOpt): ExtendShapeReturn;
declare const extendPathFromString: typeof pathTool.extendFromString;
declare type SVGPathOption = Parameters<typeof extendPathFromString>[1];
declare type SVGPathCtor = ReturnType<typeof extendPathFromString>;
declare type SVGPath = InstanceType<SVGPathCtor>;
export declare function extendPath(pathData: string, opts: SVGPathOption): SVGPathCtor;
export declare function registerShape(name: string, ShapeClass: {
    new (): Path;
}): void;
export declare function getShapeClass(name: string): {
    new (): Path;
};
export declare function makePath(pathData: string, opts: SVGPathOption, rect: ZRRectLike, layout?: 'center' | 'cover'): SVGPath;
export declare function makeImage(imageUrl: string, rect: ZRRectLike, layout?: 'center' | 'cover'): ZRImage;
export declare const mergePath: typeof pathTool.mergePath;
export declare function resizePath(path: SVGPath, rect: ZRRectLike): void;
export declare function subPixelOptimizeLine(param: {
    shape: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    style: {
        lineWidth: number;
    };
}): {
    shape: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
    style: {
        lineWidth: number;
    };
};
export declare function subPixelOptimizeRect(param: {
    shape: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    style: {
        lineWidth: number;
    };
}): {
    shape: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    style: {
        lineWidth: number;
    };
};
export declare const subPixelOptimize: typeof subPixelOptimizeUtil.subPixelOptimize;
declare type AnimateOrSetPropsOption = {
    dataIndex?: number;
    cb?: () => void;
    during?: (percent: number) => void;
    removeOpt?: AnimationOption;
    isFrom?: boolean;
};
declare function updateProps<Props>(el: Element<Props>, props: Props, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: AnimateOrSetPropsOption['dataIndex'] | AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption, cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'], during?: AnimateOrSetPropsOption['during']): void;
export { updateProps };
export declare function initProps<Props>(el: Element<Props>, props: Props, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: AnimateOrSetPropsOption['dataIndex'] | AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption, cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'], during?: AnimateOrSetPropsOption['during']): void;
export declare function removeElement<Props>(el: Element<Props>, props: Props, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: AnimateOrSetPropsOption['dataIndex'] | AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption, cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'], during?: AnimateOrSetPropsOption['during']): void;
export declare function removeElementWithFadeOut(el: Element, animatableModel?: Model<AnimationOptionMixin>, dataIndex?: number): void;
export declare function isElementRemoved(el: Element): boolean;
export declare function getTransform(target: Transformable, ancestor?: Transformable): matrix.MatrixArray;
export declare function applyTransform(target: vector.VectorArray, transform: Transformable | matrix.MatrixArray, invert?: boolean): number[];
export declare function transformDirection(direction: 'left' | 'right' | 'top' | 'bottom', transform: matrix.MatrixArray, invert?: boolean): 'left' | 'right' | 'top' | 'bottom';
export declare function groupTransition(g1: Group, g2: Group, animatableModel: Model<AnimationOptionMixin>): void;
export declare function clipPointsByRect(points: vector.VectorArray[], rect: ZRRectLike): number[][];
export declare function clipRectByRect(targetRect: ZRRectLike, rect: ZRRectLike): ZRRectLike;
export declare function createIcon(iconStr: string, opt?: Omit<DisplayableProps, 'style'>, rect?: ZRRectLike): SVGPath | ZRImage;
export declare function linePolygonIntersect(a1x: number, a1y: number, a2x: number, a2y: number, points: vector.VectorArray[]): boolean;
export declare function lineLineIntersect(a1x: number, a1y: number, a2x: number, a2y: number, b1x: number, b1y: number, b2x: number, b2y: number): boolean;
export { Group, ZRImage as Image, ZRText as Text, Circle, Ellipse, Sector, Ring, Polygon, Polyline, Rect, Line, BezierCurve, Arc, IncrementalDisplayable, CompoundPath, LinearGradient, RadialGradient, BoundingRect, OrientedBoundingRect, Point, Path };
