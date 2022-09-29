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

Finally specify toggler selector:

```html
<script>
    dropy('[toggler]');
</script>
```

> _toggler_ is something that closes/opens _target(s)_.

## Usage

After you specified the toggler selector, is time to specify the target. There are two ways to define the target, first: adding `toggler-target` attribute on the sibling of toggler,

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

if you want to target be open on the first load, add `data-open=true` to toggler:

```html
<button toggler data-open="true">toggle it!</button>
```

## Options

dropy options and their defaults:

```js
dropy(togglerSelector, {
    onInit: (target, toggler, isOpen) => {}, // opening/closing target(s) based on isOpen
    onOpen: (target, toggler) => {}, // opening target(s) is your responsible
    onClose: (target, toggler) => {}, // closing target(s) is your responsible

    inited: (target, toggler, isOpen) => {},
    opened: (target, toggler) => {},
    closed: (target, toggler) => {},

    closeOnClickOut: true,
    closeOnAnotherTogglerClicked: true,
});
```

-   `onInit`: By default it will close/open target based on `data-is-open` on first load.
-   `inited`, `opened`, `closed`: They call after `onInit`,`onOpen`,`onClose`.
-   `closeOnClickOut`: When clicked out closes the target.
-   `closeOnAnotherTogglerClicked`: Closes the target, when another **_related toggler(with same toggler selector)_** wants to be open. _Read more at [scopes](#Scopes)_.

## Toggler Scopes

When you are using `dropy('[toggler]')`, the selector of `[toggler]` is the scope of dropy. It means when you are using `closeOnAnotherTogglerClicked: true`, it just affects on togglers which have same selector of(`[toggler]`).


It is useful when you are using dropy for different parts. For example when you want to use two different accordions, and if you use `closeOnAnotherTogglerClicked: true` ,and with same toggler selector of `accordion-toggler`:

```html
<section>
    <!-- first accordion -->
    <section>
        <button accordion-toggler>open first</button>
        <section toggler-target>first text</section>
    </section>
    <section>
        <button accordion-toggler>open second</button>
        <section toggler-target>second text</section>
    </section>
</section>

<section>
    <!-- second accordion -->
    <section>
        <button accordion-toggler>open first</button>
        <section toggler-target>first text</section>
    </section>
    <section>
        <button accordion-toggler>open second</button>
        <section toggler-target>second text</section>
    </section>
</section>

<script>
    dropy('[accordion-toggler]', {
        closeOnClickOut: false,
    });
</script>
```

The problem here is, when an first accordion item is open, it will be close by second accordion buttons, because the togglers are in the same scope and `closeOnAnotherTogglerClicked` just affects on this scope. The solution is to defind different scopes for different accordions:

```html
<section>
    <!-- first accordion -->
    <section>
        <button first-accordion-toggler>open first</button>
        <section toggler-target>first text</section>
    </section>
    <section>
        <button first-accordion-toggler>open second</button>
        <section toggler-target>second text</section>
    </section>
</section>

<section>
    <!-- second accordion -->
    <section>
        <button second-accordion-toggler>open first</button>
        <section toggler-target>first text</section>
    </section>
    <section>
        <button second-accordion-toggler>open second</button>
        <section toggler-target>second text</section>
    </section>
</section>

<script>
    dropy('[first-accordion-toggler]', {
        closeOnClickOut: false,
    });
    dropy('[second-accordion-toggler]', {
        closeOnClickOut: false,
    });
</script>
```

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
