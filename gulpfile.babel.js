import gulp         from 'gulp';
import pug          from 'gulp-pug';
import sass         from 'gulp-sass';
import concat       from 'gulp-concat';
import plumber      from 'gulp-plumber';
import prefix       from 'gulp-autoprefixer';
import imagemin     from 'gulp-imagemin';
import bs           from 'browser-sync';
import useref       from 'gulp-useref';
import gulpif       from 'gulp-if';
import cssmin       from 'gulp-clean-css';
import uglify       from 'gulp-uglify';
import rimraf       from 'rimraf';
import notify       from 'gulp-notify';
import ftp          from 'vinyl-ftp';


const browserSync = bs.create();

const paths = {
	blocks: 'blocks/',
	devDir: 'app/',
	output: 'build'
};

/*********************************
		Developer tasks
*********************************/

//pug compile
gulp.task('pug', () => {
	return gulp.src([paths.blocks + '*.pug', '!' + paths.blocks + 'template.pug' ])
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.devDir))
		.pipe(browserSync.stream())
});

//sass compile
gulp.task('sass', () => {
	return gulp.src(paths.blocks + '*.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(paths.devDir + 'css/'))
		.pipe(browserSync.stream());
});

//js compile
gulp.task('scripts', () => {
	return gulp.src([
			paths.blocks + '**/*.js',
			'!' + paths.blocks + '_assets/**/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.devDir + 'js/'))
		.pipe(browserSync.stream());
});

//watch
gulp.task('watch', () => {
	gulp.watch(paths.blocks + '**/*.pug', ['pug']);
	gulp.watch(paths.blocks + '**/*.sass', ['sass']);
	gulp.watch(paths.blocks + '**/*.js', ['scripts']);
});

//server
gulp.task('browser-sync', () => {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: paths.devDir
		}
	});
});


/*********************************
		Production tasks
*********************************/

//clean
gulp.task('clean', (cb) => {
	rimraf(paths.outputDir, cb);
});

//css + js
gulp.task('build', ['clean'],  () => {
	return gulp.src(paths.devDir + '*.html')
		.pipe( useref() )
		.pipe( gulpif('*.js', uglify()) )
		.pipe( gulpif('*.css', cssmin()) )
		.pipe( gulp.dest(paths.outputDir) );
});

//copy images to outputDir
gulp.task('imgBuild', ['clean'], () => {
	return gulp.src(paths.devDir + 'img/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.outputDir + 'img/'));
});

//copy fonts to outputDir
gulp.task('fontsBuild', ['clean'], () => {
	return gulp.src(paths.devDir + '/fonts/*')
		.pipe(gulp.dest(paths.outputDir + 'fonts/'));
});

//ftp
gulp.task('send', () => {
	var conn = ftp.create({
		host:     '',
		user:     '',
		password: '',
		parallel: 5
	});

	/* list all files you wish to ftp in the glob variable */
	var globs = [
		'build/**/*',
		'!node_modules/**' // if you wish to exclude directories, start the item with an !
	];

	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '/' ) ) // only upload newer files
		.pipe( conn.dest( '/' ) )
		.pipe(notify("Dev site updated!"));

});


//default
gulp.task('default', ['browser-sync', 'watch', 'pug', 'sass', 'scripts']);

//production
gulp.task('prod', ['build', 'imgBuild', 'fontsBuild']);







