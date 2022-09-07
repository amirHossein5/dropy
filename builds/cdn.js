import { windowOnResize, defaultConfig as screensDefaultConfig } from './../src/screens.js';
import dropy, { dropyListeners } from './../src/dropy.js';

windowOnResize();
dropyListeners();

// global config
dropy.__proto__.config = class DropyConfig {
    // default settings
    static screens = screensDefaultConfig();

    static set(options) {
        this.options = options;
    }

    static get() {
        return this.options;
    }
};

window.dropy = dropy;
