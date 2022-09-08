Small package for toggling everything on everywhere.

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy@1/dist/dropy.min.js"></script>
```

CDN that includes all of the modules(e.g, events):

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy@1/dist/cdn.min.js"></script>
```

Finally:

```html
<script>
    dropy('[toggler]');
</script>
```

## Usage

There are two ways to define the target, first: append `toggler-target` attribute on the sibling of toggler,

```html
<section>
    <button toggler>toggle it!</button>
    <section toggler-target>will be toggle</section>
</section>
```

Or you can specify target via `data-target`:

```html
<section>
    <button toggler data-target="#target">toggle it!</button>
</section>

<section id="target">will be toggle</section>
```

if you want to on first load target be open add attribute `data-open`:

```html
<button toggler data-open="true">toggle it!</button>
```

## Options

dropy options and their defaults:

```js
dropy(togglerSelector, {
    onInit: (target, toggler, isOpen) => {}, // open/close target based on isOpen
    onOpen: (target, toggler) => {}, // opening target is your responsible
    onClose: (target, toggler) => {}, // closing target is your responsible

    inited: (target, toggler, isOpen) => {},
    opened: (target, toggler) => {},
    closed: (target, toggler) => {},

    closeOnClickOut: true,
    closeOnAnotherTogglerClicked: true,
});
```

-   `onInit`: By default it will close/open target based on `data-is-open` on first load.
-   `inited`, `opened`, `closed`: They call after `onInit`,`onOpen`,`onClose`.
-   `closeOnClickOut`: when clicked out closes the target.
-   `closeOnAnotherTogglerClicked`: closes the target when another **_related toggler_**(with same toggler selector) wants to be open.

## Responsive Design

There are some breakpoints by defaults:

| Breakpoint prefix | Minimum width | CSS                                |
| ----------------- | ------------- | ---------------------------------- |
| sm                | 640px         | @media (min-width: 640px) { ... }  |
| md                | 768px         | @media (min-width: 768px) { ... }  |
| lg                | 1024px        | @media (min-width: 1024px) { ... } |
| xl                | 1280px        | @media (min-width: 1280px) { ... } |
| 2xl               | 1536px        | @media (min-width: 1536px) { ... } |

```html
<!-- on md is close, below md is open -->
<button toggler data-md-open="false" data-open="true">...</button>
```

```html
<!-- on lg is open, on md is close, below md is open -->
<button toggler data-lg-open="true" data-md-open="false" data-open="true">...</button>
```

By default `data-open` is `false`, so don't need to write it:

```html
<!-- up md is open -->
<button toggler data-md-open="true" data-open="false">...</button>

<!-- up md is open -->
<button toggler data-md-open="true">...</button>
```

### Customazing Breakpoints

Before using dropy use config, and for _Overriding the defaults_:

```js
dropy.config.set({
    screens: {
        xs: '576px',
        md: '960px',
    },
});
```

_Overriding a single screen_:

```js
dropy.config.set({
    screens: {
        ...dropy.config.screens,
        md: '960px',
    },
});
```

_Adding new breakpoints_:

```js
dropy.config.set({
    screens: {
        ...dropy.config.screens,
        '3xl': '1600px',
    },
});
```

## Events

If you didn't include all modules:

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy@1/dist/dropyListeners.min.js"></script>
```

Event `dropy.open` for opening, and `dropy.close` for closing targets:

```js
document.dispatchEvent(
    new CustomEvent('dropy.open', {
        detail: {
            togglerSelector: '.example[toggler]',
        },
    })
);

document.dispatchEvent(
    new CustomEvent('dropy.close', {
        detail: {
            togglerSelector: '.example[toggler]',
        },
    })
);
```

Also you can close or open it yourself via `open` and `close` functions:

```js
document.dispatchEvent(
    new CustomEvent('dropy.open', {
        detail: {
            open: (target, toggler) => {},
            togglerSelector: '.example[toggler]',
        },
    })
);

document.dispatchEvent(
    new CustomEvent('dropy.close', {
        detail: {
            close: (target, toggler) => {},
            togglerSelector: '.example[toggler]',
        },
    })
);
```

## Licence

[LICENCE](https://github.com/amirHossein5/dropy/blob/main/LICENCE)
