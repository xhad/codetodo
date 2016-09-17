const gulp = require('gulp');
const runSequence = require('run-sequence');
const exec = require('child_process').exec;
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const config = require('./server/util/config');

const paths = {
  server: {
    all: ['server/**/*.js', '!server/tests/**/**.spec.js'],
    main: 'server/main.js',
    tests: 'server/tests/**/**.spec.js'
  }
}


//to start mongo before Nodemon process
function runCommand(command) {
  exec(command, function (err, stdout, stderr) {
   console.log(stdout);
   console.log(stderr);
   if (err !== null) {
     console.log('exec error: ' + err);
   }
 });
}

// starts development server with nodemon
gulp.task('nodemon', function(cb) {
   // We use this `called` variable to make sure the callback is only executed once
   var called = false;
   return plugins.nodemon({
         // run our server and watch the server files for changes
         script: paths.server.main,
         watch: [paths.server.all]
      })
      .on('start', function onStart() {
         if (!called) {
            cb();
         }
         called = true;
      })
      .on('restart', function onRestart() {
      });
});

// runs the mocha tests
gulp.task('mocha', function() {
  gulp.src(paths.server.tests, {read: true})
    .pipe(mocha());
});

// start mongodb
gulp.task('mongo', function() {
  let cmd = 'mongod --dbpath=' + config.dbpath + ' --port=27033';
    runCommand(cmd);

});

// run.. gulp test .. for testing updates
gulp.task('test', ['mocha', 'watch']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.server.tests, ['mocha']);
});

// starts the client process
gulp.task('client', function() {
  let cmd = 'cd client && npm start';
  runCommand(cmd);
  console.log('Client running on port 3003')

});

gulp.task('default', function() {
  runSequence(
    ['mongo'],
    ['nodemon'],
    ['client']
)});
