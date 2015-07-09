'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
	base64 = require('gulp-base64'),
    rimraf = require('rimraf'),
    opn = require('opn'),
    webpack = require("webpack");
	
var path = {
    build: {
		image: 'build/', 
		scss: 'build/', 
		css: 'build/', 
		js: 'build/',
        jsx: 'build/',
		customJs: 'build/web/js',
		vendor: 'build/', 
		other: 'build/'
	},
    src: {
        image: ['src/**/*.{jpg,jpeg,png,ico}','!src/vendor{,/**}'],
		scss: ['src/**/*.scss','!src/vendor{,/**}'],
        css: ['src/**/*.css','!src/vendor{,/**}'],
        js: ['src/**/*.js','!src/vendor{,/**}','!src/web/js{,/**}'],
        customJs: ['src/web/js/**/*.js'],
        jsx: 'src/**/*.jsx',
		vendor: 'src/vendor{,/**}',
		other: ['src/**/*.*','!src/**/*.{jpg,jpeg,png,ico,scss,css,js,jsx}','!src/vendor{,/**}']
    },
    watch: {
        image: ['src/**/*.{jpg,jpeg,png,ico}','!src/vendor{,/**}'],
		scss: ['src/**/*.scss','!src/vendor{,/**}'],
        css: ['src/**/*.css','!src/vendor{,/**}'],
        js: ['src/**/*.js','!src/vendor{,/**}','!src/web/js{,/**}'],
		customJs: ['src/web/js/**/*.js'],
        jsx: 'src/**/*.jsx',
		vendor: 'src/vendor{,/**}',
		other: ['src/**/*.*','!src/**/*.{jpg,jpeg,png,ico,scss,css,js,jsx}','!src/vendor{,/**}']
    },
    clean: './build'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

var server = {
    host: 'localhost',
    port: '80',
	dir: 'yii/build/web/'
};

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/' +  server.dir );
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('scss:build', function () {
    gulp.src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }))
		.pipe(base64({
            extensions: ['jpg', 'png'],
            maxImageSize: 32*1024 // размер указывается в байтах, тут он 32кб потому и больше уже плохо для IE8
        }))
        .pipe(prefixer())
        .pipe(cssmin())	
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.scss));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
		.pipe(base64({
            extensions: ['jpg', 'png'],
            maxImageSize: 32*1024 // размер указывается в байтах, тут он 32кб потому и больше уже плохо для IE8
        }))
        .pipe(prefixer())
        .pipe(cssmin())	
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.image)
        .pipe(gulp.dest(path.build.image));
});

gulp.task('vendor:build', function () {
	gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor));
});

gulp.task('other:build', function () {
    gulp.src(path.src.other)
        .pipe(gulp.dest(path.build.other));
});

gulp.task('webpack', function(callback) {
    webpack({
        // configuration
        context: __dirname + "/src/web/js",
        entry: { main: [ "./main.js" ] },
        output: {
            path: __dirname + "/build/web/js",
            filename: "[name].bundle.js",
            sourceMapFilename: "[file].map"
        },
        plugins: [
            /*new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })*/
        ],
        devtool: 'eval-source-map',
        module: {
            loaders: [
                {
                    test: /\.js/,
                    loaders: ['transform?brfs', 'babel-loader?stage=0']
                }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.json', '.jsx']
        }
    }, function(err, stats) {
        callback();
    });
});

gulp.task('build', [
    'js:build',
    'scss:build',
    'css:build',
    'image:build',
	'vendor:build',
    'other:build',
    'webpack'
]);

gulp.task('watch', function(){
    watch(path.watch.other, function(event, cb) {
        gulp.start('other:build');
    });
	watch(path.watch.vendor, function(event, cb) {
        gulp.start('vendor:build');
    });
    watch(path.watch.scss, function(event, cb) {
        gulp.start('scss:build');
    });
	watch(path.watch.css, function(event, cb) {
        gulp.start('css:build');
    });
	watch(path.watch.customJs, function(event, cb) {
		gulp.start('customJs:build');
    });
    watch(path.watch.js, function(event, cb) {
		gulp.start('js:build');
    });
    watch(path.watch.jsx, function(event, cb) {
        gulp.start('jsx:build');
    });
    watch(path.watch.image, function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('default', ['build', 'watch', 'openbrowser']);