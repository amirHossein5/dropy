import * as $ from './helpers';
import setDataByScreens from './screens';

/**
 * Toggles elements.
 * @param  {string} togglerSelector
 * @param  {object} optionsParam
 * @return {null}
 */
export default function dropy(togglerSelector, optionsParam) {
    let options = getConfig(optionsParam);
    let allTogglers = [...$.selectorAll(togglerSelector)];
    let allTargets = [];

    allTogglers.forEach((toggler) => {
        // open or close on first load
        let target = getTargetsOf(toggler);
        allTargets = [...allTargets, ...getTargetsOf(toggler)];

        $.data(toggler, 'is-open') === true ? $.data(toggler, 'is-open', true) : $.data(toggler, 'is-open', false);

        setDataByScreens(toggler);

        init(toggler, target, options?.onInit, options?.inited);

        toggler.addEventListener('click', (e) => {
            let toggler = e.currentTarget;
            let target = getTargetsOf(toggler);

            if (options.closeOnAnotherTogglerClicked && !$.data(toggler, 'is-open')) {
                allTogglers
                    .filter((i) => i !== toggler && $.data(i, 'is-open'))
                    .forEach((toggler) => close(toggler, allTargets, options?.onClose, options?.closed));
            }

            $.data(toggler, 'is-open')
                ? close(toggler, target, options?.onClose, options?.closed)
                : open(toggler, target, options?.onOpen, options?.opened);
        });
    });

    if (options.closeOnClickOut === true) {
        document.addEventListener('click', (e) => {
            let wantedList = [...allTogglers, ...allTargets];

            if ([...$.parents(e.target), e.target].filter((i) => wantedList.includes(i)).length === 0) {
                allTogglers
                    .filter((toggler) => $.data(toggler, 'is-open'))
                    .forEach((toggler) => close(toggler, allTargets, options?.onClose, options?.closed));
            }
        });
    }
}

/**
 * init dropy listeners.
 * @return {void}
 */
export function dropyListeners() {
    document.addEventListener('dropy.open', (e) => {
        [...$.selectorAll(e.detail.togglerSelector)].forEach((toggler) => {
            !$.data(toggler, 'is-open') && open(toggler, getTargetsOf(toggler), e.detail?.open);
        });
    });

    document.addEventListener('dropy.close', (e) => {
        [...$.selectorAll(e.detail.togglerSelector)].forEach((toggler) => {
            $.data(toggler, 'is-open') && close(toggler, getTargetsOf(toggler), e.detail?.close);
        });
    });
}

/**
 * Set up dropy default options.
 * @param {object} options
 * @return {object}
 */
function getConfig(options) {
    return {
        closeOnClickOut: true,
        closeOnAnotherTogglerClicked: true,
        ...options,
    };
}

/**
 * Returns targets of toggler.
 * @param  {HTMLElement} toggler
 * @return {NodeList|array}
 */
export function getTargetsOf(toggler) {
    return $.data(toggler, 'target')
        ? $.selectorAll($.data(toggler, 'target'))
        : $.siblings(toggler, '[toggler-target]');
}

/**
 * Init targets,
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} onInit
 * @param  {null|function} inited
 * @return {null}
 */
function init(toggler, target, onInit, inited) {
    let isOpen = $.data(toggler, 'is-open');

    onInit
        ? onInit(target, toggler, isOpen)
        : isOpen
        ? target.forEach((target) => (target.style.display = 'block'))
        : target.forEach((target) => (target.style.display = 'none'));

    inited && inited(target, toggler, isOpen);
}

/**
 * Opens targets,
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} onOpen
 * @param  {null|function} opened
 * @return {null}
 */
export function open(toggler, target, onOpen, opened) {
    if (target.length !== 0) {
        $.data(toggler, 'is-open', true);

        onOpen ? onOpen(target, toggler) : target.forEach((target) => (target.style.display = 'block'));

        opened && opened(target, toggler);
    }
}

/**
 * Closes the targets.
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} onClose
 * @param  {null|function} closed
 * @return {null}
 */
export function close(toggler, target, onClose, closed) {
    if (target.length !== 0) {
        $.data(toggler, 'is-open', false);

        onClose ? onClose(target, toggler) : target.forEach((target) => (target.style.display = 'none'));

        closed && closed(target, toggler);
    }
}
