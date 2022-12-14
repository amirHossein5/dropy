(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

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
  function parents(element, filter = null) {
    return element.parentElement ? [parentsInner(element.parentElement), element].flat().filter((i) => i && i !== element) : [];
  }
  function parentsInner(element, filter = null) {
    return element.parentElement ? [parentsInner(element.parentElement), element].flat() : null;
  }

  // src/dropy.js
  function dropy2(togglerSelector, optionsParam) {
    let options = getConfig(optionsParam);
    let allTogglers = [...selectorAll(togglerSelector)];
    let allTargets = [];
    allTogglers.forEach((toggler) => {
      let target = getTargetsOf(toggler);
      allTargets = [...allTargets, ...getTargetsOf(toggler)];
      data(toggler, "is-open") === true ? data(toggler, "is-open", true) : data(toggler, "is-open", false);
      setDataByScreens(toggler);
      init(toggler, target, options?.onInit, options?.inited);
      toggler.addEventListener("click", (e) => {
        let toggler2 = e.currentTarget;
        let target2 = getTargetsOf(toggler2);
        if (!options.syncTogglers) {
          if (options.closeOnAnotherTogglerClicked && !data(toggler2, "is-open")) {
            allTogglers.filter((i) => i !== toggler2 && data(i, "is-open")).forEach((toggler3) => close(toggler3, allTargets, options?.onClose, options?.closed));
          }
          data(toggler2, "is-open") ? close(toggler2, target2, options?.onClose, options?.closed) : open(toggler2, target2, options?.onOpen, options?.opened);
        } else {
          let currentTogglerAttr = data(toggler2, "is-open");
          allTogglers.forEach(
            (toggler3) => currentTogglerAttr ? close(toggler3, target2, options?.onClose, options?.closed) : open(toggler3, target2, options?.onOpen, options?.opened)
          );
        }
      });
    });
    if (options.closeOnClickOut === true) {
      document.addEventListener("click", (e) => {
        let wantedList = [...allTogglers, ...allTargets];
        if ([...parents(e.target), e.target].filter((i) => wantedList.includes(i)).length === 0) {
          allTogglers.filter((toggler) => data(toggler, "is-open")).forEach((toggler) => close(toggler, allTargets, options?.onClose, options?.closed));
        }
      });
    }
  }
  function getConfig(options) {
    return {
      closeOnClickOut: true,
      closeOnAnotherTogglerClicked: true,
      syncTogglers: false,
      ...options
    };
  }
  function getTargetsOf(toggler) {
    return data(toggler, "target") ? selectorAll(data(toggler, "target")) : siblings(toggler, "[toggler-target]");
  }
  function init(toggler, target, onInit, inited) {
    let isOpen = data(toggler, "is-open");
    onInit ? onInit(target, toggler, isOpen) : isOpen ? target.forEach((target2) => target2.style.display = "block") : target.forEach((target2) => target2.style.display = "none");
    inited && inited(target, toggler, isOpen);
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

  // src/screens.js
  function setDataByScreens(toggler) {
    setAttributes(toggler);
    if (data(toggler, "open") === null) {
      return;
    }
    let lastMatchedScreen = getLastMatchedScreen(toggler, Object.entries(getConfig2()));
    lastMatchedScreen === void 0 ? data(toggler, "is-open", data(toggler, "open")) : data(toggler, "is-open", data(toggler, `${lastMatchedScreen}-open`));
  }
  function getConfig2() {
    return dropy.config.get()?.screens ?? defaultConfig();
  }
  function windowOnResize() {
    window.addEventListener("resize", () => {
      selectorAll("[data-is-open][data-open]").forEach((toggler) => {
        setDataByScreens(toggler);
        data(toggler, "is-open") ? open(toggler, getTargetsOf(toggler)) : close(toggler, getTargetsOf(toggler));
      });
    });
  }
  function defaultConfig() {
    return {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    };
  }
  function setAttributes(toggler) {
    if (data(toggler, "open") === true || data(toggler, "open") === false) {
      return;
    }
    for (let [key, value] of Object.entries(getConfig2())) {
      data(toggler, `${key}-open`) !== null && data(toggler, "open", false);
    }
  }
  function getLastMatchedScreen(element, screens) {
    let sortedScreens = screens.sort(([, a], [, b]) => parseInt(a.replace("px", "")) - parseInt(b.replace("px", "")));
    let matchedScreens = [];
    for (let [key, value] of sortedScreens) {
      if (data(element, `${key}-open`) === null) {
        continue;
      }
      if (window.matchMedia(`(min-width: ${value})`).matches) {
        matchedScreens = [...matchedScreens, key];
      }
    }
    return matchedScreens.at(-1);
  }

  // builds/dropy.js
  windowOnResize();
  var _a;
  dropy2.__proto__.config = (_a = class {
    static set(options) {
      this.options = options;
    }
    static get() {
      return this.options;
    }
  }, __publicField(_a, "screens", defaultConfig()), _a);
  window.dropy = dropy2;
})();
