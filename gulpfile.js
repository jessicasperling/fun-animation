require('./gulp_tasks/webpack');
require('./gulp_tasks/server');
require('./gulp_tasks/sass');

var gulp = require('gulp');

gulp.task('default', ['webpack', 'server', 'sass']);
gulp.task('heroku', ['webpack', 'sass']);
