[![Build Status](https://travis-ci.org/doochik/babel-plugin-transform-react-componentdidcatch.svg?branch=master)](https://travis-ci.org/doochik/babel-plugin-transform-react-componentdidcatch)

# @doochik/babel-plugin-transform-react-componentdidcatch

Adds componentDidCatch to every React.(Pure)Component

## Installation

```sh
npm install --save-dev @doochik/babel-plugin-transform-react-componentdidcatch
```

## Usage

**You should enable this plugin only for client build**

**.babelrc**

```json
{
    "plugins": [
        ["@doochik/babel-plugin-transform-react-componentdidcatch", {
             "componentDidCatchHandler": "./path/to/my/componentDidCatchHandler.js"
        }]
    ]
}
```

## Options

### `componentDidCatchHandler`

Path to your errorHandler module.
This is simple function with two arguments `(error, errorInfo)`

```js
// componentDidCatchHandler.js

module.exports = (error, errorINfo) => {
   // here you can log error and return fallback component or null.
}
``` 

