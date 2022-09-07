(() => {
  // src/helpers.js
  function selectorAll(selector) {
    return document.querySelectorAll(selector);
  }
  function siblings(e, filterSelector = null) {
    let parent = e.parentElement;
    if (!e.parentNode) {
      return [];
    }
    return [...filterSelector ? parent.querySelectorAll(filterSelector) : parent.children].filter(
      (c) => c !== e && Object.values(parent.children).includes(c)
    );
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

  // src/dropy.js
  function dropyListeners() {
    document.addEventListener("dropy.open", (e) => {
      [...selectorAll(e.detail.togglerSelector)].forEach((toggler) => {
        !data(toggler, "is-open") && open(toggler, getTargetsOf(toggler), e.detail?.open);
      });
    });
    document.addEventListener("dropy.close", (e) => {
      [...selectorAll(e.detail.togglerSelector)].forEach((toggler) => {
        data(toggler, "is-open") && close(toggler, getTargetsOf(toggler), e.detail?.close);
      });
    });
  }
  function getTargetsOf(toggler) {
    return data(toggler, "target") ? selectorAll(data(toggler, "target")) : siblings(toggler, "[toggler-target]");
  }
  function open(toggler, target, onOpen, opened) {
    if (target.length !== 0) {
      data(toggler, "is-open", true);
      onOpen ? onOpen(target, toggler) : target.forEach((target2) => target2.style.display = "block");
      opened && opened(target, toggler);
    }
  }
  function close(toggler, target, onClose, closed) {
    if (target.length !== 0) {
      data(toggler, "is-open", false);
      onClose ? onClose(target, toggler) : target.forEach((target2) => target2.style.display = "none");
      closed && closed(target, toggler);
    }
  }

  // builds/dropyListeners.js
  dropyListeners();
})();
