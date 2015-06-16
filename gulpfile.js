var config = {
    jsSources: './app/src/**/*.js',
    karmaConfigFile: './app/karma.config.js'
};

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    path = require('path'),
    karma = require('karma').server;

gulp.task('code-quality',function(){
   gulp.src(config.jsSources)
       .pipe(plugins.jshint())
       .pipe(plugins.jshint.reporter('jshint-stylish'))
});

var pathToKarmaConfigFile = path.resolve(config.karmaConfigFile);

gulp.task('unit', function (done) {
    karma.start({
        configFile: pathToKarmaConfigFile,
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('tdd', function (done) {
    karma.start({
        configFile: pathToKarmaConfigFile
    }, done);

});

gulp.task('documentation', [], function () {
    var options = {
        html5Mode: true,
        startPage: '/api',
        title: "My Awesome Docs",
        image: "path/to/my/image.png",
        imageLink: "http://my-domain.com",
        titleLink: "/api"
    };
    return gulp.src(config.jsSources)
        .pipe(plugins.ngdocs.process(options))
        .pipe(gulp.dest('./docs'));
});