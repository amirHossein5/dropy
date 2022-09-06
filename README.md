Small package for togglling everything on everywhere.

<br/>

*This README may has something unreleased.* [See last release Docs](https://github.com/amirHossein5/dropy/tree/v1.2.0)

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy/dist/dropy.min.js"></script>
```

CDN that includes all of the modules(e.g, events):

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy/dist/cdn.min.js"></script>
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

if you want to on first load target be open add attribute `data-is-open`:

```html
<button toggler data-is-open="true">toggle it!</button>
```

## Options

dropy options and their defaults:

```js
dropy(togglerSelector, {
    onInit: (target, toggler, isOpen) => {},
    onOpen: (target, toggler) => {}, // opening target is your responsible
    onClose: (target, toggler) => {}, // closing target is your responsible
    closeOnClickOut: true,
    closeOnAnotherTogglerClicked: true,
});
```

-   `onInit`: By default it will close/open target based on `data-is-open` on first load.
-   `closeOnClickOut`: when clicked out closes the target.
-   `closeOnAnotherTogglerClicked`: closes the target when another **_related toggler_**(with same toggler selector) wants to be open.

## Events

If you didn't include all modules:

```html
<script src="https://cdn.jsdelivr.net/gh/amirhossein5/dropy/dist/dropyListeners.min.js"></script>
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
