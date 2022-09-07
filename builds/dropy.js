import { windowOnResize, defaultConfig as screensDefaultConfig } from './../src/screens.js';
import dropy from './../src/dropy.js';

windowOnResize();

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
