export declare type onCLickOut = (e: Event) => void;
export declare type destroyClickOut = () => void;
export default class ClickOut {
    static bindCustomEvent(value: string | HTMLElement): destroyClickOut;
    static bind(value: string | HTMLElement, onClickOut: onCLickOut): destroyClickOut;
    static destroy(value: string | HTMLElement): void;
    static element(el: string | HTMLElement): HTMLElement;
}
