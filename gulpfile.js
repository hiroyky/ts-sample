const gulp = require('gulp');
const mocha = require('gulp-mocha');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsRegister = require('ts-node/register');
const webpack = require('gulp-webpack');
const connect = require('gulp-connect');
const webpackConfig = require('./webpack.config.js');
const istanbul = require('gulp-istanbul');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

gulp.task('build', (done) => {
    gulp.src(['./src/**/*.ts'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./htdocs'));
    done();
});

gulp.task('test', (done) => {
    gulp.src(['./test/**/*.ts'])
        .pipe(mocha({
            'compilers': {
                ts: tsRegister
            }
        }))
        .once('error', () => {
            process.exit(1);
        })
    done();
});

gulp.task('compile', (done) => {
    const options = {
        module: "commonjs",
        target: "es5",
        noImplicitAny: true,
        sourceMap: true
    };

    gulp.src(['./**/*.ts', '!node_modules/**'])
        .pipe(sourcemaps.init())
        .pipe(typescript(options))
        .js.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'))
        .on('end', done);    
});

gulp.task('coverage', gulp.series(
    'compile',
    (done) => {
        gulp.src('./build/src/**/*.js')
            .pipe(istanbul())
            .pipe(istanbul.hookRequire());
        done();
    },
    (done) => {
        gulp.src('./build/test/**/*.js')
            .pipe(mocha())
            .pipe(istanbul.writeReports())
            .on('end', done);
    },
    (done) => {
        gulp.src('./coverage/coverage-final.json')
            .pipe(remapIstanbul({
                reports: {
                'json': 'coverage/coverage.json',
                'html': 'coverage/html-report'
                }
            }))
        done();
    }));

gulp.task('server', (done) => {
    connect.server({
        root: [__dirname + '/htdocs']
    });
    done();
});

gulp.task('watch', (done) => {
    gulp.watch(['./src/**/*.ts', './test/**/*.ts'], gulp.series(
        'test',
        'build'
    ));
    done();
});

gulp.task('default', gulp.series(
    'test',
    'build',
    'server',
    'watch'
));