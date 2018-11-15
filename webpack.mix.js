const mix = require("laravel-mix");

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

mix.react("resources/js/app.js", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);

mix.webpackConfig({
    output: {
        publicPath: "http://reactiveprofile.test:8000/"
    },
    devServer: {
        hot: true, // this enables hot reload
        inline: true, // use inline method for hmr
        contentBase: path.join(__dirname, "public"),
        https: false, //true
        port: 8000,
        headers: { "Access-Control-Allow-Origin": "*" },
        watchOptions: {
            exclude: [/bower_components/, /node_modules/]
        }
    },
    node: {
        fs: "empty",
        module: "empty"
    }
});
