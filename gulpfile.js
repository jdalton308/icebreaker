
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlMin = require('gulp-htmlmin');
var server = require('gulp-server-livereload');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');

var styleFiles = [
        './src/scss/main.scss'
    ];
// var jsFiles = [
// 		'node_modules/jquery/dist/jquery.min.js',
// 		'./src/js/**/*.js'
// 	];
var gsapFiles = [
		// './node_modules/gsap/src/uncompressed/TweenLite.js',
		'./node_modules/gsap/src/uncompressed/TweenMax.js',
		// './node_modules/gsap/src/uncompressed/TimelineLite.js',
		'./node_modules/gsap/src/uncompressed/TimelineMax.js',
		'./node_modules/gsap/src/uncompressed/plugins/AttrPlugin.js',
		'./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
		'./node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
	];
var htmlFiles = [
		'./src/html/**/*.html'
]


gulp.task('styles', function() {
    gulp.src(styleFiles)
        .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('gsapScripts', function(){
	gulp.src(gsapFiles)
		.pipe(concat('gsap.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./build/js/'))
		.on('error', gutil.log);
});

gulp.task('scripts', function(){
	browserify('./src/js/main.js').bundle()
		.pipe(source('app.js'))
		// .pipe(streamify(uglify()))
		.pipe(gulp.dest('./build/js/'))
		.on('error', gutil.log);
});

gulp.task('html', function(){
	gulp.src(htmlFiles)
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./build/'))
});

gulp.task('server', function(){
	gulp.src('./build')
		.pipe(server({
			livereload: true,
			open: false
		}));
});

gulp.task('watch', function(){
    gulp.watch(['./src/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
    gulp.watch(['./src/html/**/*.html'], ['html'])
});

gulp.task('build', ['styles', 'scripts', 'gsapScripts', 'html']);

gulp.task('default', ['build', 'watch', 'server']);