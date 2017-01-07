var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./config/gulp/tasks'),
    config = require('./config/gulp/config')(),
    envConfig = require('./config/gulp/env');


gulp.task('default', ['serve-dev']);