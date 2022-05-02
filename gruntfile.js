'use strict';
const config = {
  targets: {
    test: ['test/**/*.js'],
    bin: ['bin/*.js'],
    src: ['lib/**/*.js', '*.js'],
    functional: ['test/functional/test1.js'],
    sanity: ['test/functional/test1.js'],

  },
  timeout: 600000,
};
config.targets.all = config.targets.test
  .concat(config.targets.bin)
  .concat(config.targets.src)
  .concat(config.targets.systemtest);

module.exports = function (grunt) {
  const gruntConfig = {
    mochaTest: {
      stdout: {
        options: {
          reporter: 'spec',
          timeout: config.timeout,
          require: config.require,
        },
        src: config.targets.test,
      },
      functional: {
        options: {
          reporter: 'mochawesome',
          reporterOptions: {
            reportFilename: 'functional-test-report.html',
            code: false,
            timestamp: 'dd-mm-yyyy-hh-mm-ss',
            quiet: true,
          },
          timeout: config.timeout,
          require: config.require,
          fgrep: '[#Functional]',
        },
        src: config.targets.functional,
      },
      sanity: {
        options: {
          reporter: 'mochawesome',
          reporterOptions: {
            reportFilename: 'functional-test-report.html',
            code: false,
            timestamp: 'dd-mm-yyyy-hh-mm-ss',
            quiet: true,
          },
          timeout: config.timeout,
          require: config.require,
          fgrep: '[#Sanity]',
        },
        src: config.targets.functional,
      },
    },

    /* jshint camelcase:false */
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      stdout: {
        src: config.targets.all,
      },
    },
    watch: {
      files: config.targets.all,
      tasks: ['default'],
    },
  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('functional', ['mochaTest:functional']);
  grunt.registerTask('sanity', ['mochaTest:sanity']);

};