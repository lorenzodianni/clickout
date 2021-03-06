const SYMBOL_CORE: string = '[[Core]]';
const SYMBOL_EVENT: string = '[[Event]]';
const SYMBOL_ELEMENT: string = '[[Element]]';

export type onCLickOut = (e: Event) => void;
export type destroyClickOut = () => void;

interface ClickOutElement extends HTMLElement {
  destroyClickOut: destroyClickOut
}

export default class ClickOut {

  public static bindCustomEvent(element: string | HTMLElement): destroyClickOut {
    const el = ClickOut[SYMBOL_ELEMENT](element);
    let event = ClickOut[SYMBOL_EVENT]();
    const dispatch = () => el.dispatchEvent(event);
    const destroy = () => event = null;
    return this[SYMBOL_CORE](el, dispatch, destroy);
  }

  public static bind(element: string | HTMLElement, onClickOut: onCLickOut): destroyClickOut {
    return this[SYMBOL_CORE](element, onClickOut);
  }

  public static destroy(element: string | HTMLElement): void {
    const el = <ClickOutElement>ClickOut[SYMBOL_ELEMENT](element);
    el && el.destroyClickOut && el.destroyClickOut();
  }

  private static [SYMBOL_ELEMENT](el: string | HTMLElement): HTMLElement {
    if (!el) {
      throw 'Define a clickout element';
    }
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  private static [SYMBOL_CORE](element: string | HTMLElement, onClickOut: onCLickOut, fnDestroy?: () => void): destroyClickOut {
    const el = <ClickOutElement>ClickOut[SYMBOL_ELEMENT](element);

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

  private static [SYMBOL_EVENT](): CustomEvent {
    return new CustomEvent('clickout', {
      bubbles: true,
      cancelable: true,
    })
  }
}
