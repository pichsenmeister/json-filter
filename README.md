# @dpi/json-mask

<a href="https://david-dm.org/pichsenmeister/json-mask">
    <img src="https://david-dm.org/pichsenmeister/json-mask.svg" alt="Dependency Status" />
</a>
<a href="https://david-dm.org/pichsenmeister/json-mask#info=devDependencies">
    <img src="https://david-dm.org/pichsenmeister/json-mask/dev-status.svg" alt="devDependency Status" />
</a>


A simple library to parse out specific elements of a larger JSON object or JSON array based on a provided JSON mask. This makes it easier to filter out key-value pairs on any given JSON object, even more complex mask object are supported if you feel like that (feel free to check out the [tests](test/index.test.js) on examples).

* [Installation](#installation)
* [Getting started](#getting-started)
* [Mask](#mask)
* [Result](#result)
* [License](#license)

## Installation

Install via npm

```
npm install @dpi/json-mask
```

or yarn

```
yarn add @dpi/json-mask
```

## Getting started

Let's take a very simple JSON object as example ...
```
const json = {
    actions: [
        {
            type: 'visit',
            property: 'website'
        },
        {
            type: 'click',
            property: 'site_signup'
        },
        {
            type: 'click',
            property: 'site_pricing'
        }
    ],
    property: 'other'
}
```

... and define a simple mask to filter out all `actions` that are of `{type: 'click'}`
```
const mask = {
    type: 'click`
}
```

You can now easily filter the original JSON object with the given mask ✨

```
const JSONMask = require('@dpi/json-mask')

const result = JSONMask.match(json, mask)
cosnt elements = result.all()
```

This will match all elements from the JSON object that have a property `type` with a value of `'click'`. As a result `elements` will look like this

```
[
    {
        type: 'click',
        property: 'site_signup'
    },
    {
        type: 'click',
        property: 'site_pricing'
    }
]
```

## Mask

The mask can be any valid JSON object (arrays are not support at this point). An empty JSON mask (`{}`) would match all elements. I don't know why you would do that, but you can ¯\\\_(ツ)\_/¯


### RegEx

`json-mask` supports RegEx for mask properties

```
{
    property: /^site_\w*$/
}
```

### `$any`

You can use the keyword `$any` on any mask property to match all possible values, like strings, numbers, boolean, objects, and arrays. This might not be useful in the example shown above, but can be helpful if your JSON object gets more complex.

```
{
    property: '$any'
}
```

### Methods

#### `.match(json, mask, trim)`

##### Arguments

| Argument | Required | Type | Description |
| -------- | -------- | ---- | ----------- |
| `json`   | yes      | JSON | Any valid JSON object or array |
| `mask`   | yes      | Object | Any valid JSON object |
| `trim`   | no       | bool | A flag to indicate if your results should be trimmed to properties of your mask. If `false` the result will keep the structure of the original JSON, if `true` only properties defined in the mask will be returned. Default to `false`. _(not yet implemented, but since I was just writing the README I added it anyway)_ |

#### Example 

```
const result = JSONMask.match(json, mask, trim)
```

with `trim` set to `false` the above example will match the structure of the original JSON

```
[
    {
        type: 'click',
        property: 'site_signup'
    },
    {
        type: 'click',
        property: 'site_pricing'
    }
]
```

with `trim` set to `true`, the result will be trimmed to the structure of the mask

```
[
    {
        type: 'click'
    },
    {
        type: 'click'
    }
]
```

## Result

The result is an object with following properties:

| Property  | Return Type | Description |
| --------- | -------- | --------- |
| `length`  | Number   | JSON |
| `all()`   | Array    | Returns all matching elements as a JSON array. |
| `first()` | Object   | Returns the first matching element |
| `last()`  | Object   | Returns the last matching element |
| `get(i)`  | Object   | Returns the matching element on given index `i` |

### Methods

#### `.all()`

Returns all matching elements as a JSON array.

```
const result = JSONMask.match(json, mask)
const all = result.all() // returns element array
```

#### `.first()`

Returns the first matching element. If no elements match, returns `undefined`.

```
const result = JSONMask.match(json, mask)
const first = result.first() // returns first element
```

#### `.last()`

Returns the last matching element. If no elements match, returns `undefined`. If only one element exists, it returns the same element as `.first()`.

```
const result = JSONMask.match(json, mask)
const last = result.last() // returns last element
```

#### `.get(index)`

Returns the matching element on given index or `undefined` if no element on that index exists. Index starts at `0`.

```
const result = JSONMask.match(json, mask)
const element = result.get(3) // returns 4th element
```

## License

This project is licensed under the MIT license, Copyright (c) 2020 David Pichsenmeister | [pichsenmeister.com](https://pichsenmeister.com). For more information see [LICENSE](LICENSE).