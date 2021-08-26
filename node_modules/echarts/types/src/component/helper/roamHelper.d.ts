import Element from 'zrender/lib/Element';
interface ControllerHost {
    target: Element;
    zoom?: number;
    zoomLimit?: {
        min?: number;
        max?: number;
    };
}
export declare function updateViewOnPan(controllerHost: ControllerHost, dx: number, dy: number): void;
export declare function updateViewOnZoom(controllerHost: ControllerHost, zoomDelta: number, zoomX: number, zoomY: number): void;
export {};
