import { LoadingEffect } from '../util/types';
import ExtensionAPI from '../core/ExtensionAPI';
export default function defaultLoading(api: ExtensionAPI, opts?: {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zlevel?: number;
    showSpinner?: boolean;
    spinnerRadius?: number;
    lineWidth?: number;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
}): LoadingEffect;
