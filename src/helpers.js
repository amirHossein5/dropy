/**
 * Returns siblings of HTMLElement.
 * @param  {HTMLElement} e
 * @param  {null|string} filterSelector
 * @return {array|NodeList}
 */
export function siblings (e, filterSelector = null) {
    let parent = e.parentElement;

    if(!e.parentNode) {
        return [];
    }

    return [
        ... filterSelector
            ? parent.querySelectorAll(filterSelector)
            : parent.children
    ].filter(c => c !== e && Object.values(parent.children).includes(c));
};

/**
 * Set\Get data attributes.
 * @param  {HTMLElement} element
 * @param  {string} dataAttrName
 * @param  {null|string|bool} value
 * @return {null|string|bool}
 */
export function data(element, dataAttrName, value = null) {
    let attribute = `data-${dataAttrName}`;

    if(value !== null) {
        return element.setAttribute(attribute, value);
    }

    let attValue = element.getAttribute(attribute);

    attValue === 'true' ? attValue = true : null;
    attValue === 'false' ? attValue = false : null;

    return attValue;
}

/**
 * Returns all of element parents.
 * @param  {HTMLElement} element
 * @param  {null|string} filter
 * @return {array}
 */
export function parents(element, filter = null) {
    return element.parentElement
        ? [ parentsInner(element.parentElement), element ].flat().filter(i => i && i !== element)
        : [];
}

/**
 * Used in parents as sublevel array call.
 * @param  {HTMLElement} element
 * @param  {null|string} filter
 * @return {array|null}
 */
export function parentsInner(element, filter = null) {
    return element.parentElement
        ? [parentsInner(element.parentElement), element].flat()
        : null;
}
