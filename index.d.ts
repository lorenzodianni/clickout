export declare type onCLickOut = (e: Event) => void;
export declare type destroyClickOut = () => void;
export declare class ClickOut {
    static bindCustomEvent(element: string | HTMLElement): destroyClickOut;
    static bind(element: string | HTMLElement, onClickOut: onCLickOut): destroyClickOut;
    static destroy(element: string | HTMLElement): void;
}
