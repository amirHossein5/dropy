import * as $ from './helpers';
import { open, close, getTargetsOf } from './dropy.js';

/**
 * @param  {HTMLElement} toggler
 * @return {void}
 */
export default function setDataByScreens(toggler) {
    setAttributes(toggler);

    if ($.data(toggler, 'open') === null) {
        return;
    }

    let lastMatchedScreen = getLastMatchedScreen(toggler, Object.entries(getConfig()));

    lastMatchedScreen === undefined
        ? $.data(toggler, 'is-open', $.data(toggler, 'open'))
        : $.data(toggler, 'is-open', $.data(toggler, `${lastMatchedScreen}-open`));
}

/** @return {object} */
function getConfig() {
    return dropy.config.get()?.screens ?? defaultConfig();
}

/** @return {void} */
export function windowOnResize() {
    window.addEventListener('resize', () => {
        $.selectorAll('[data-is-open][data-open]').forEach((toggler) => {
            setDataByScreens(toggler);
            $.data(toggler, 'is-open') ? open(toggler, getTargetsOf(toggler)) : close(toggler, getTargetsOf(toggler));
        });
    });
}

/** @return {object} */
export function defaultConfig() {
    return {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    };
}

/**
 * Set default attributes if needed.
 * @param {HTMLElement} toggler [description]
 * @return {void}
 */
function setAttributes(toggler) {
    if ($.data(toggler, 'open') === true || $.data(toggler, 'open') === false) {
        return;
    }

    for (let [key, value] of Object.entries(getConfig())) {
        $.data(toggler, `${key}-open`) !== null && $.data(toggler, 'open', false);
    }
}

/**
 * @param  {HTMLElement} element
 * @param  {array} screens
 * @return {?string}
 */
function getLastMatchedScreen(element, screens) {
    let sortedScreens = screens.sort(([, a], [, b]) => parseInt(a.replace('px', '')) - parseInt(b.replace('px', '')));
    let matchedScreens = [];

    for (let [key, value] of sortedScreens) {
        if ($.data(element, `${key}-open`) === null) {
            continue;
        }

        if (window.matchMedia(`(min-width: ${value})`).matches) {
            matchedScreens = [...matchedScreens, key];
        }
    }

    return matchedScreens.at(-1);
}
