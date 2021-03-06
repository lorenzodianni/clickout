/*
 * clickout
 * Version 1.1.0
 * https://github.com/lorenzodianni/clickout#readme
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ClickOut = factory());
}(this, (function () { 'use strict';

    var SYMBOL_CORE = '[[Core]]';
    var SYMBOL_EVENT = '[[Event]]';
    var SYMBOL_ELEMENT = '[[Element]]';
    var ClickOut = /** @class */ (function () {
        function ClickOut() {
        }
        ClickOut.bindCustomEvent = function (element) {
            var el = ClickOut[SYMBOL_ELEMENT](element);
            var event = ClickOut[SYMBOL_EVENT]();
            var dispatch = function () { return el.dispatchEvent(event); };
            var destroy = function () { return event = null; };
            return this[SYMBOL_CORE](el, dispatch, destroy);
        };
        ClickOut.bind = function (element, onClickOut) {
            return this[SYMBOL_CORE](element, onClickOut);
        };
        ClickOut.destroy = function (element) {
            var el = ClickOut[SYMBOL_ELEMENT](element);
            el && el.destroyClickOut && el.destroyClickOut();
        };
        ClickOut[SYMBOL_ELEMENT] = function (el) {
            if (!el) {
                throw 'Define a clickout element';
            }
            return typeof el === 'string' ? document.querySelector(el) : el;
        };
        ClickOut[SYMBOL_CORE] = function (element, onClickOut, fnDestroy) {
            var el = ClickOut[SYMBOL_ELEMENT](element);
            function onClick(e) {
                if (!el.contains(e.target)) {
                    onClickOut && onClickOut(e);
                }
            }
            function destroyClickOut() {
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
        };
        ClickOut[SYMBOL_EVENT] = function () {
            return new CustomEvent('clickout', {
                bubbles: true,
                cancelable: true,
            });
        };
        return ClickOut;
    }());

    return ClickOut;

})));
