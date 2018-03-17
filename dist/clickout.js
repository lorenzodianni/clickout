/*
 * clickout
 * Version 1.0.0
 * https://github.com/lorenzodianni/clickout#readme
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.ClickOut = {})));
}(this, (function (exports) { 'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    var SYMBOL_CORE = '[[Core]]';
    var SYMBOL_EVENT = '[[Event]]';
    var ClickOut = /** @class */ (function () {
        function ClickOut() {
        }
        ClickOut.bindCustomEvent = function (value) {
            var el = ClickOut.element(value);
            var event = ClickOut[SYMBOL_EVENT]();
            var dispatch = function () { return el.dispatchEvent(event); };
            var destroy = function () { return event = null; };
            return this[SYMBOL_CORE](el, dispatch, destroy);
        };
        ClickOut.bind = function (value, onClickOut) {
            return this[SYMBOL_CORE](value, onClickOut);
        };
        ClickOut.destroy = function (value) {
            var el = ClickOut.element(value);
            el && el.destroyClickOut && el.destroyClickOut();
        };
        ClickOut.element = function (el) {
            if (!el) {
                throw 'Define a clickout element';
            }
            return typeof el === 'string' ? document.querySelector(el) : el;
        };
        ClickOut[SYMBOL_CORE] = function (value, onClickOut, fnDestroy) {
            var el = ClickOut.element(value);
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
    exports.default = ClickOut;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
