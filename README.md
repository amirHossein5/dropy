Small package for togglling everything on everywhere.

## Installation

### CDN
```html
<script src="//unpkg.com/@amirhossein5/dropy"></script>

<script>
    dropy('[toggler]');
</script>
```

### npm
```sh
npm i @amirhossein5/dropy
```

And in js file:
```js
import dropy from '@amirhossein5/dropy';

dropy('[toggler]');
// or
window.dropy = dropy;
```

## Usage

There are two ways to define the target first append ```toggler-target``` attribute that is sibling of toggler:
```html
<section>
    <button toggler>toggle it!</button>
    <section toggler-target>will be toggle</section>
</section>
```

Or you can specify target via ```data-target```:
```html
<section>
    <button toggler data-target="#target">toggle it!</button>
</section>

<section id="target">will be toggle</section>
```

## Options
```js
    dropy(togglerSelector, {
        onOpen: (target) => ..., // opening target is on your bare
        onClose: (target) => ..., // closing target is on your bare
        closeOnClickOut: true,
        closeOnAnotherTogglerClicked: true
    });
```

- ```closeOnClickOut```: when clicked out closes the target.
- ```closeOnAnotherTogglerClicked```: closes the target when another toggler clicked.


## Licence
