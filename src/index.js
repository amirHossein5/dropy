// here would be for npm, for cdn -> builds/
import { windowOnResize, defaultConfig as screensDefaultConfig } from './screens';
import dropy, { dropyListeners } from './dropy';

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

export default dropy;
export { dropyListeners };
