import * as $ from './helpers';

/**
 * Toggles elements.
 * @param  {string} togglerSelector
 * @param  {object} optionsParam
 * @return {null}
 */
export default function dropy(togglerSelector, optionsParam) {
    let options = setUp(optionsParam);
    let allTogglers = [... $.selectorAll(togglerSelector)];
    let allTargets = [];

    allTogglers.forEach(toggler => {

        // open or close on first load
        let target = getTargetsOf(toggler);
        allTargets = [...allTargets, ...getTargetsOf(toggler)];

        $.data(toggler, 'is-open') === true
            ? $.data(toggler, 'is-open', true)
            : $.data(toggler, 'is-open', false);

        init(toggler, target, options?.onInit);

        toggler.addEventListener('click', (e) => {
            let toggler = e.currentTarget;
            let target = getTargetsOf(toggler);

            if (options.closeOnAnotherTogglerClicked && ! $.data(toggler, 'is-open')) {
                allTogglers.filter(i => i !== toggler && $.data(i, 'is-open')).forEach(toggler => close(toggler, allTargets, options?.onClose));
            }

            $.data(toggler, 'is-open')
                ? close(toggler, target, options?.onClose)
                : open(toggler, target, options?.onOpen);
        });

    });

    if (options.closeOnClickOut === true) {
        document.addEventListener('click', (e) => {
            let wantedList = [... allTogglers, ... allTargets];

            if ([...$.parents(e.target), e.target].filter(i => wantedList.includes(i)).length === 0) {
                allTogglers.filter(toggler => $.data(toggler, 'is-open'))
                    .forEach(toggler => close(toggler, allTargets, options?.onClose));
            }
        });
    }
};

/**
 * init dropy listeners.
 * @return {void}
 */
export function dropyListeners () {
    document.addEventListener('dropy.open', (e) => {
        [... $.selectorAll(e.detail.togglerSelector)].forEach(toggler => {
            ! $.data(toggler,'is-open') && open(toggler, getTargetsOf(toggler), e.detail?.open);
        });
    });

    document.addEventListener('dropy.close', (e) => {
        [... $.selectorAll(e.detail.togglerSelector)].forEach(toggler => {
            $.data(toggler,'is-open') && close(toggler, getTargetsOf(toggler), e.detail?.close);
        });
    });
}

/**
 * Set up dropy default options.
 * @param {object} options
 * @return {object}
 */
function setUp(options) {
    return {
        closeOnClickOut: true,
        closeOnAnotherTogglerClicked: true,
        ... options
    };
}

/**
 * Returns targets of toggler.
 * @param  {HTMLElement} toggler
 * @return {NodeList|array}
 */
function getTargetsOf (toggler) {
    return $.data(toggler, 'target')
        ? $.selectorAll($.data(toggler, 'target'))
        : $.siblings(toggler, '[toggler-target]');
}

/**
 * Init targets,
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} closure
 * @return {null}
 */
function init (toggler, target, closure) {
    closure
        ? closure(target, toggler)
        : $.data(toggler, 'is-open')
            ? target.forEach(target => target.style.display = 'block')
            : target.forEach(target => target.style.display = 'none');
}

/**
 * Opens targets,
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} closure
 * @return {null}
 */
function open (toggler, target, closure) {
    if (target.length !== 0) {
        $.data(toggler, 'is-open', true);

        closure
            ? closure(target, toggler)
            : target.forEach(target => target.style.display = 'block');
    }
}

/**
 * Closes the targets.
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} closure
 * @return {null}
 */
function close (toggler, target, closure) {
    if (target.length !== 0) {
        $.data(toggler, 'is-open', false);

        closure
            ? closure(target, toggler)
            : target.forEach(target => target.style.display = 'none')
    }
}
