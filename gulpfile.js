var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var gulpTslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var tslint = require('tslint');
var editor = require('gulp-json-editor');

var path = {
    source: {
        root: './source/',
        assets: './source/src/Assets/',
        src: './source/src/',
        ios: './source/ios/',
        android: './source/android/'
    },
    dist: {
        root: './dist/',
        assets: './dist/js/Assets',
        js: './dist/js/',
        ios: './dist/ios/',
        android: './dist/android/'
    },
};



var tsProject = ts.createProject(path.source.root + 'tsconfig.json');

function clean() {
    return del([path.dist.root]);
}

function minifyImage() {
    return gulp.src(path.source.assets + '**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.assets))
        .pipe(rename(function (opt) {
            opt.basename = opt.basename.replace(/@[^.]*/, '');
            return opt;
        }));
}

function lintTs() {
    var program = tslint.Linter.createProgram(path.source.root + 'tsconfig.json');
    return gulp.src([path.source.src + '**/*.ts', path.source.src + '**/*.tsx'])
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            emitError: true
        }));
}

function compileTs() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.pipe(gulp.dest(path.dist.js));
}

function copyJson() {
    return gulp.src(path.source.src + '**/*.json')
        .pipe(gulp.dest(path.dist.js));
}

function copyDefinition() {
    return gulp.src(path.source.src + '**/*.d.ts')
        .pipe(gulp.dest(path.dist.js));
}

function copyIOSModules() {
    return gulp.src(path.source.ios + '**/*')
        .pipe(gulp.dest(path.dist.ios));
}

function copyAndroidModules() {
    return gulp.src(path.source.android + '**/*')
        .pipe(gulp.dest(path.dist.android));
}

function copyPackageDocs() {
    return gulp.src([path.source.root + 'README.md'])
        .pipe(gulp.dest(path.dist.root));
}

function bumpDevVersion() {
    return gulp.src([path.source.root + 'package.json'], {
        allowEmpty: true
    })
        .pipe(editor(function (json) {
            json.version = json.version + '-dev.' + Date.now().toString();
            return json;
        }))
        .pipe(gulp.dest(path.dist.root));
}

function buildPackageInfo() {
    return gulp.src([path.source.root + 'package.json'], {
        allowEmpty: true
    })
        .pipe(editor({
            'main': 'js/Index.js',
            'types': 'js/Index.d.ts',
            "files": [
                "README.md",
                "js/",
                "ios/",
                "android/",
            ],
        }))
        .pipe(gulp.dest(path.dist.root));
}

function resolvePublishCredential() {
    return gulp.src(['./.npmrc'])
        .pipe(gulp.dest(path.dist.root));
}

exports.clean = clean;
exports.minifyImage = minifyImage;
exports.lintTs = lintTs;
exports.copyJson = copyJson;
exports.compileTs = compileTs;
exports.copyDefinition = copyDefinition;
exports.copyIOSModules = copyIOSModules;
exports.copyAndroidModules = copyAndroidModules;
exports.copyPackageDocs = copyPackageDocs;
exports.buildPackageInfo = buildPackageInfo;
exports.resolvePublishCredential = resolvePublishCredential;
exports.bumpDevVersion = bumpDevVersion;
exports.build = gulp.series(
    lintTs,
    clean,
    compileTs,
    // gulp.parallel(minifyImage, copyJson, copyIOSModules, copyAndroidModules, copyPackageDocs),
    gulp.parallel(minifyImage, copyJson, copyPackageDocs),
    buildPackageInfo,
    // resolvePublishCredential
);
exports.buildForDevChannel = gulp.series(
    lintTs,
    clean,
    compileTs,
    // gulp.parallel(minifyImage, copyJson, copyIOSModules, copyAndroidModules, copyPackageDocs),
    gulp.parallel(minifyImage, copyJson, copyPackageDocs),
    buildPackageInfo,
    bumpDevVersion,
    // resolvePublishCredential
)
exports.default = exports.build;
