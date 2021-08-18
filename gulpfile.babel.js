/**
 * Auaha VTex
 * 1. Faça Login na plataforma
 * 2. Acesse nomedaloja.vtexlocal.com.br?debugcss=true&debugjs=true
 */

import fs               from 'fs';
import url              from 'url';
import gulp             from 'gulp';
import del              from 'del';
import runSequence      from 'run-sequence';
import gulpLoad         from 'gulp-load-plugins';
import httpPlease       from 'connect-http-please';
import serveStatic      from 'serve-static';
import proxy            from 'proxy-middleware';
import middlewares      from './middlewares';
import chokidar         from 'chokidar';
import pump             from 'pump';
import browserSync      from 'browser-sync';

/**
 * General
 */
const $ = gulpLoad();
const {
    vtex,
    version
} = JSON.parse(fs.readFileSync('package.json'));

// Paths
const path                = {
    css: {
        in  : 'src/components',
        out : 'build/arquivos'
    },
    files: {
        in  : 'src/arquivos',
        out : 'build/arquivos'
    },
    images: {
        in  : 'src/arquivos',
        out : 'build/arquivos'
    },
    svg: {
        in  : 'src/assets',
        out : 'build/svg'
    },
    deploy: {
        css: {
            in  : 'build/arquivos',
            out : 'deploy/css'
        },
        files: {
            in  : 'build/arquivos',
            out : 'deploy/arquivos'
        },
        images: {
            in  : 'build/arquivos',
            out : 'deploy/images'
        },
        js: {
            in  : 'build/arquivos',
            out : 'deploy/javascripts'
        }
    }
};


/**
 * Connect
 */
const accountName = vtex.store;
const environment = vtex.environment;
const portalHost = `${accountName}.${environment}.com.br`;
const imgProxyOptions = url.parse(`${vtex.protocol}://${accountName}.vteximg.com.br/arquivos`);
const portalProxyOptions = url.parse(`${vtex.protocol}://${portalHost}/`);
const secureUrl = vtex.protocol == 'https' ? true : false;
let   localHost = `${accountName}.vtexlocal.com.br`;
const port = 80;

if (port !== 80)
    localHost += ":#{port}"

imgProxyOptions.route = '/arquivos';
portalProxyOptions.preserveHost = true;
portalProxyOptions.cookieRewrite = `${accountName}.vtexlocal.com.br`;

const rewriteReferer = function(referer) {
    if (referer == null) {
        referer = '';
    }
    if (secureUrl) {
        referer = referer.replace('http:', 'https:');
    }
    return referer.replace(localHost, portalHost);
};

const rewriteLocation = function(location) {
    return location.replace('https:', 'http:').replace(portalHost, localHost);
};

gulp.task('connect', () => {
    $.connect.server({
        hostname: '*',
        port: 80,
        debug: false,
        middleware: () => {
            return [
                middlewares.disableCompression,
                middlewares.rewriteLocationHeader(rewriteLocation),
                middlewares.replaceHost(portalHost),
                middlewares.replaceReferer(rewriteReferer),
                middlewares.replaceHtmlBody(environment, accountName, secureUrl, port),
                httpPlease({
                    host: portalHost,
                    verbose: true
                }),
                serveStatic('./build'),
                proxy(imgProxyOptions),
                proxy(portalProxyOptions),
                middlewares.errorHandler
            ]
        },
        livereload: true
    });

    const openOptions = {
        uri: `http://${accountName}.vtexlocal.com.br/admin/login`,
        app: 'google chrome'
    };

    return gulp.src('./')
        .pipe($.open(openOptions));
});

/**
 *  Delete
 */
gulp.task('clean', function () {
    return del(['build', 'deploy']);
});

/**
 *  SVG
 */
gulp.task('svg:copy', function () {
    return gulp.src(path.svg.in + '/**/*.svg')
        .pipe($.rename({dirname: ''}))
        .pipe(gulp.dest(path.svg.out));
});

/**
 *  Images
 */

gulp.task('images', function () {
    return gulp.src(path.images.in + '/**/*.{jpg,png}')
        .pipe($.imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [{removeViewBox: true}]
            })
        )
        .pipe(gulp.dest(path.images.out))
        .pipe(browserSync.stream());
});
function imageCopyOnly(event, pathFile) {
    console.log(`[${event}] ${pathFile}`);
    return gulp.src(pathFile)
        .pipe($.imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [{removeViewBox: true}]
            })
        )
        .pipe(gulp.dest(path.images.out))
        // .pipe(browserSync.reload());
}
gulp.task('images:deploy', function () {
    return gulp.src(path.deploy.images.in + '/**/*.{jpg,png}')
        .pipe($.imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                svgoPlugins: [{removeViewBox: true}]
            })
        )
        .pipe(gulp.dest(path.deploy.files.out));
});


/**
 *  JavaScripts
 */

gulp.task('js:deploy', function(cb){
    pump([
            gulp.src(path.deploy.js.in + '/**/*.js'),
            $.uglify(),
            gulp.dest(path.deploy.js.out)
        ],
        cb
    );
});

/**
 *  PostCSS
 */
let processors = [
    require('autoprefixer')({
        grid: true
    }),
    require('postcss-inline-svg')(),
    require('postcss-svgo')()
];

gulp.task('postcss', function(){
    return gulp.src( path.css.out + '/style.css')
        .pipe(
            $.postcss(processors)
                .on('error', function(err) {
                    console.log(err);
                    this.emit('end');
                })
        )
        .pipe(gulp.dest(path.css.out));
});

gulp.task('postcss:deploy', function(){

    return gulp.src( path.deploy.css.in + '/**/*.css')
        .pipe(
            $.postcss([
                require('cssnano')({zindex: false})
            ])
                .on('error', function(err) {
                    console.log(err);
                    this.emit('end');
                })
        )
        .pipe(gulp.dest(path.deploy.css.out));
});

/**
 *  Stylus
 */
const vendorFiles = [
    //'node_modules/normalize.css/normalize.css'
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/sumoselect/sumoselect.css'
];

gulp.task("stylus", function() {

    return gulp.src(vendorFiles.concat([path.css.in + "/index.styl"]))
        .pipe($.stylus({
            "linenos"       : true,
            "compress"      : true
        }).on('error', function(err) {
            console.log(err);
            this.emit('end');
        }))
        .pipe($.rename('style.css'))
        .pipe(gulp.dest(path.css.out));
});


/**
 *  CSS
 */

gulp.task('css', ['stylus'], function(){
    return runSequence('postcss');
});


/**
 * Watch
 */
gulp.task('watch', function(){
    chokidar.watch(path.images.in + '/**/*.{jpg,png}', {
            ignoreInitial: true,
            ignored: /(^|[\/\\])\../
        }).on('all', (event, path) => {
            imageCopyOnly(event, path);
            
        });

});

/**
 * Build
 */
gulp.task('build', ['css', 'images']);

/**
 * Deploy
 */
gulp.task('deploy', function(){
    return runSequence('clean', 'svg:copy', 'build', ['js:deploy', 'postcss:deploy', 'images:deploy']);
});

/**
 * Default
 */
gulp.task('default', function (cb) {
    // return runSequence('clean', 'svg:copy', 'build', [ 'watch', 'connect' ]);
    return runSequence( 'connect', 'watch');
});
