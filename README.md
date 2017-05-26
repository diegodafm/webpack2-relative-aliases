# Webpack2RelativeAliases - Plugin
Webpack by default does not support overwriting relative paths, then, Webpack2RelativeAliases was designed overwrite relative paths whenever the application is compiling.

Just in case you are using webpack 1.x, you should use [webpack-relative-aliases](https://github.com/diegodafm/webpack-relative-aliases) instead.
 
 ```javascript
 
 plugins: [
    new Webpack2RelativeAliases({
        relativeAliases: {
            // simple relative overwrite
            './example.js': '/full/path/to/your/file.js',
            
            // example of file considering the context 
            './example.js': {
                fromContext: 'specific/path/you/want/to/overwrite',
                alias: '/full/path/to/your/file.js'
            },
            // example of module considering the context
            './../example': {
                fromContext: 'specific/path/you/want/to/overwrite',
                alias: '/full/path/to/your/module/index.js'
            },
       },
       debug: true
   })
]
```

## Configuration

The object relativeAliases should be composed by relative aliases that you want to overwrite.
It's allow you to set a key value: alias and new path respectfully.

First of all install node module:
 
```bash
$ npm install webpack2-relative-aliases --save-dev
```

Add In your webpack.config.js the following script and then start create an instance of `WebpackRelativeAliases` setting your own relative aliases.

```javascript
const Webpack2RelativeAliases = require('webpack2-relative-aliases');
```

#### relativeAliases
Let's suppouse that you want to overwrite `./index.js: /your/new/path/index.js`, webpack-relative-aliases then, will search all entrances of `./index.js` and overwrite to `/your/new/path/index.js`

#### debug
The debug mode has an output message or all aliases that has been matched and overwritten

### Examples 

#### Simple reference
```javascript
plugins: [
    new Webpack2RelativeAliases({
        relativeAliases: {
            './example.js': '/full/path/to/your/file.js'
        },
        debug: true
    })
]
```

That might be a rude problem when in your application you probably will have a few aliases likewise the given example, 
In order to avoid this problem, you may have to consider also what is the context or file structure where this relative path is hosted as shown below:

---

#### Reference minding the context

```javascript
plugins: [
    new Webpack2RelativeAliases({
        relativeAliases: {
            './index.js': {
                fromContext: 'specific/path/you/want/to/overwrite',
                alias: '/your/new/path/index.js'
            }
        },
        debug: true
    })
]
```
In this case, the alias `./index.js` is considered to overwrite when the context matchs with `fromContext` property, so, you ensure that it's overwriting only in this case and not in the entire application.

----

#### Overwriting relative module

```javascript
plugins: [
    new Webpack2RelativeAliases({
        relativeAliases: {
            './module-example/': {
                fromContext: 'specific/path/you/want/to/overwrite',
                alias: '/your/new/path/index.js'
            }
        },
        debug: true
    })
]
```
Notice that when overwriting a module/folder you need to specify the `index.js` which is the main file that webpack is referring to.

