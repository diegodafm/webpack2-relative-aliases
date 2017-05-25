/**
 * WebpackRelativeAliases - Plugin
 * Webpack by default does not support overwriting relative paths, then, WebpackRelativeAliases was designed
 * overwrite relative paths whenever the application is compiling.
 *
 * @example
 *  plugins: [
 *       new WebpackRelativeAliases({
 *           relativeAliases: {
 *               // simple relative overwrite
 *               './example.js': '/full/path/to/your/file.js',
 *
 *               // example of file considering the context
 *               './example.js': {
 *                   fromContext: 'specific/path/you/want/to/overwrite',
 *                   alias: '/full/path/to/your/file.js'
 *               },
 *               // example of module considering the context
 *               './../example': {
 *                   fromContext: 'specific/path/you/want/to/overwrite',
 *                   alias: '/full/path/to/your/module/index.js'
 *               },
 *          },
 *          debug: true //show output messages
 *      })
 *  ]
 */
class WebpackRelativeAliases {

    /**
     * constructor
     * @param {object} options
     */
    constructor(options = {}) {
        this.options = Object.assign(options, {
            pluginName: 'webpack-relative-aliases'
        });

        this._validateRelativeAliases();
        this._printOutputMessage(`${this.options.pluginName} instance in debug mode`);
    }

    /**
     * method is called by the Webpack
     * @param {object} compiler - Webpack compiler instance
     * @see https://webpack.js.org/api/plugins/compilation/#normal-module-loader
     */
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('normal-module-loader', (loaderContext, module) => {
                // due performance, is considered only relative aliases
                if (isValidRelativePath(module.rawRequest)) {
                    const relativeAlias = this.getRelativeAlias(module);
                    if (relativeAlias) {
                        module.resource = `${customerPath}${relativeAlias.alias}`;
                    }
                }
            });
        });
    }

    /**
     * check the alias and returns when matches alias and context
     * @param {string} context - alias' absolute path
     * @param {object} request - alias' object
     * @returns {object|boolean}
     */
    getRelativeAlias(module) {
        const relativeAlias = this.options.relativeAliases[module.rawRequest];
        if( relativeAlias ){
            this._printOutputMessage(`The given alias will be overwrite: ${module.rawRequest}`);

            if ((new RegExp(relativeAlias.fromContext)).test(module.resource)) {
                return relativeAlias;
            }

            if (typeof relativeAlias === 'string') {
                return relativeAlias;
            }
        }
        return false;
    }

    /**
     * check whether given relative paths is valid or not
     * @private
     */
    _validateRelativeAliases() {
        let relativeAlias;

        for (relativeAlias in this.options.relativeAliases) {
            if (relativeAlias && !isValidRelativePath(relativeAlias)) {
                throw new Error(`The given alias: '${relativeAlias}' is not a relative path.`);
            }
        }
    }

    /**
     * print output message in debug mode
     * @param {string} message - output message
     * @private
     */
    _printOutputMessage(message) {
        if (this.options.debug) {
            console.log(`${this.options.pluginName} - ${message}`);
        }
    }
}

/**
 * Regular expression used to validate relative paths
 * @param {string} relativeAlias
 * @returns {boolean}
 */
const isValidRelativePath = (relativeAlias) => {
    const regex = new RegExp(/(!|\?)?\./);
    return regex.test(relativeAlias);
};

module.exports = WebpackRelativeAliases;