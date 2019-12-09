const mix = require("laravel-mix");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

Mix.listen("configReady", config => {
    const scssRule = config.module.rules.find(
        r => r.test.toString() === /\.scss$/.toString()
    );
    const scssOptions = scssRule.loaders.find(l => l.loader === "sass-loader")
        .options;
    scssOptions.data = '@import "./resources/sass/styles.scss";';

    const sassRule = config.module.rules.find(
        r => r.test.toString() === /\.sass$/.toString()
    );
    const sassOptions = sassRule.loaders.find(l => l.loader === "sass-loader")
        .options;
    sassOptions.data = '@import "./resources/sass/styles.scss"';
});

mix.options({
    extractVueStyles: true
})
    .webpackConfig({
        plugins: [new VuetifyLoaderPlugin()]
    })
    .js("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css");

Mix.listen("configReady", webpackConfig => {
    if (Mix.isUsing("hmr")) {
        // Remove leading '/' from entry keys
        webpackConfig.entry = Object.keys(webpackConfig.entry).reduce(
            (entries, entry) => {
                entries[entry.replace(/^\//, "")] = webpackConfig.entry[entry];
                return entries;
            },
            {}
        );

        // Remove leading '/' from ExtractTextPlugin instances
        webpackConfig.plugins.forEach(plugin => {
            if (plugin.constructor.name === "ExtractTextPlugin") {
                plugin.filename = plugin.filename.replace(/^\//, "");
            }
        });
    }
});
