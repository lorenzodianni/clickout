const SYMBOL_CORE: string = '[[Core]]';
const SYMBOL_EVENT: string = '[[Event]]';

export type onCLickOut = (e: Event) => void;
export type destroyClickOut = () => void;

interface ClickOutElement extends HTMLElement {
  destroyClickOut: () => any
}

export default class ClickOut {

  static bindCustomEvent(value: string | HTMLElement): destroyClickOut {
    const el = ClickOut.element(value);
    let event = ClickOut[SYMBOL_EVENT]();
    const dispatch = () => el.dispatchEvent(event);
    const destroy = () => event = null;
    return this[SYMBOL_CORE](el, dispatch, destroy);
  }

  static bind(value: string | HTMLElement, onClickOut: onCLickOut): destroyClickOut {
    return this[SYMBOL_CORE](value, onClickOut);
  }

  static destroy(value: string | HTMLElement): void {
    const el = <ClickOutElement>ClickOut.element(value);
    el && el.destroyClickOut && el.destroyClickOut();
  }

  static element(el: string | HTMLElement): HTMLElement {
    if (!el) {
      throw 'Define a clickout element';
    }
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  static [SYMBOL_CORE](value: string | HTMLElement, onClickOut: onCLickOut, fnDestroy?: () => void): destroyClickOut {
    const el = <ClickOutElement>ClickOut.element(value);

    function onClick(e: Event): void {
      if (!el.contains(e.target as HTMLElement)) {
        onClickOut && onClickOut(e);
      }
    }

    function destroyClickOut(): void {
      fnDestroy && fnDestroy();
      el.destroyClickOut = null;
      delete el.destroyClickOut;
      window.removeEventListener('click', onClick);
    }

    if (el.destroyClickOut) {
      el.destroyClickOut();
    }

    el.destroyClickOut = destroyClickOut;
    window.addEventListener('click', onClick);

    return destroyClickOut;
  }

  static [SYMBOL_EVENT](): CustomEvent {
    return new CustomEvent('clickout', {
      bubbles: true,
      cancelable: true,
    })
  }
}
