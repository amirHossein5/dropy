(() => {
  // src/helpers.js
  function siblings(e, filterSelector = null) {
    let parent = e.parentElement;
    if (!e.parentNode) {
      return [];
    }
    return [
      ...filterSelector ? parent.querySelectorAll(filterSelector) : parent.children
    ].filter((c) => c !== e && Object.values(parent.children).includes(c));
  }
  function data(element, dataAttrName, value = null) {
    let attribute = `data-${dataAttrName}`;
    if (value !== null) {
      return element.setAttribute(attribute, value);
    }
    let attValue = element.getAttribute(attribute);
    attValue === "true" ? attValue = true : null;
    attValue === "false" ? attValue = false : null;
    return attValue;
  }
  function parents(element, filter = null) {
    return element.parentElement ? [parentsInner(element.parentElement), element].flat().filter((i) => i && i !== element) : [];
  }
  function parentsInner(element, filter = null) {
    return element.parentElement ? [parentsInner(element.parentElement), element].flat() : null;
  }

  // src/dropy.js
  function dropy(togglerSelector, optionsParam) {
    let options = setUp(optionsParam);
    let allTogglers = [...document.querySelectorAll(togglerSelector)];
    let allTargets = [];
    allTogglers.forEach((toggler) => {
      let target = getTargetsOf(toggler);
      allTargets = [...allTargets, ...getTargetsOf(toggler)];
      data(toggler, "is-open") === true ? data(toggler, "is-open", true) : data(toggler, "is-open", false);
      data(toggler, "is-open") ? open(toggler, target, options?.onOpen) : close(toggler, target, options?.onClose);
      toggler.addEventListener("click", (e) => {
        let toggler2 = e.currentTarget;
        let target2 = getTargetsOf(toggler2);
        if (options.closeOnAnotherTogglerClicked) {
          allTogglers.filter((i) => i !== toggler2).forEach((toggler3) => close(toggler3, allTargets, options?.onClose));
        }
        data(toggler2, "is-open") ? close(toggler2, target2, options?.onClose) : open(toggler2, target2, options?.onOpen);
      });
    });
    if (options.closeOnClickOut !== true) {
      return;
    }
    document.addEventListener("click", (e) => {
      let wantedList = [...allTogglers, ...allTargets];
      if ([...parents(e.target), e.target].filter((i) => wantedList.includes(i)).length === 0) {
        allTogglers.forEach((toggler) => close(toggler, allTargets, options?.onClose));
      }
    });
  }
  function setUp(options) {
    return {
      closeOnClickOut: true,
      closeOnAnotherTogglerClicked: true,
      ...options
    };
  }
  function getTargetsOf(toggler) {
    return data(toggler, "target") ? document.querySelectorAll(data(toggler, "target")) : siblings(toggler, "[toggler-target]");
  }
  function open(toggler, target, closure) {
    data(toggler, "is-open", true);
    closure ? closure(target, toggler) : target.forEach((target2) => target2.style.display = "block");
  }
  function close(toggler, target, closure) {
    data(toggler, "is-open", false);
    closure ? closure(target, toggler) : target.forEach((target2) => target2.style.display = "none");
  }

  // builds/cdn.js
  window.dropy = dropy;
})();
