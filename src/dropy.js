import * as $ from './helpers';

/**
 * Toggles elements.
 * @param  {string} togglerSelector
 * @param  {object} optionsParam
 * @return {null}
 */
export default function dropy(togglerSelector, optionsParam) {
    let options = setUp(optionsParam);
    let allTogglers = [... document.querySelectorAll(togglerSelector)];
    let allTargets = [];

    allTogglers.forEach(toggler => {

        // open or close on first load
        let target = getTargetsOf(toggler);
        allTargets = [...allTargets, ...getTargetsOf(toggler)];

        $.data(toggler, 'is-open') === true
            ? $.data(toggler, 'is-open', true)
            : $.data(toggler, 'is-open', false);

        $.data(toggler, 'is-open')
            ? open(toggler, target, options?.onOpen)
            : close(toggler, target, options?.onClose);


        toggler.addEventListener('click', (e) => {
            let toggler = e.currentTarget;
            let target = getTargetsOf(toggler);

            if (options.closeOnAnotherTogglerClicked) {
                allTogglers.filter(i => i !== toggler).forEach(toggler => close(toggler, allTargets, options?.onClose));
            }

            $.data(toggler, 'is-open')
                ? close(toggler, target, options?.onClose)
                : open(toggler, target, options?.onOpen);
        });

    });

    if (options.closeOnClickOut !== true) {
        return;
    }

    document.addEventListener('click', (e) => {
        let wantedList = [... allTogglers, ... allTargets];

        if ([...$.parents(e.target), e.target].filter(i => wantedList.includes(i)).length === 0) {
            allTogglers.forEach(toggler => close(toggler, allTargets, options?.onClose));
        }
    });
};

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
        ? document.querySelectorAll($.data(toggler, 'target'))
        : $.siblings(toggler, '[toggler-target]');
}

/**
 * Opens targets,
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} closure
 * @return {null}
 */
function open (toggler, target, closure) {
    $.data(toggler, 'is-open', true);

    closure
        ? closure(target, toggler)
        : target.forEach(target => target.style.display = 'block');
}

/**
 * Closes the targets.
 * @param  {HTMLElement} toggler
 * @param  {array} target
 * @param  {null|function} closure
 * @return {null}
 */
function close (toggler, target, closure) {
    $.data(toggler, 'is-open', false);

    closure
        ? closure(target, toggler)
        : target.forEach(target => target.style.display = 'none')
}
