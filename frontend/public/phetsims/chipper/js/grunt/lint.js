// Copyright 2015, University of Colorado Boulder

/**
 * Runs the lint rules on the specified files.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
/* eslint-env node */
'use strict';

// modules
var eslint = require( 'eslint' );
var assert = require( 'assert' );

// constants
var CLIEngine = eslint.CLIEngine;

/**
 * Gets the relative path for the given repo.
 * @param {string} repo
 * @returns {string}
 */
var GET_PATH = function( repo ) { return '../' + repo; };

/**
 * @param grunt - the grunt instance
 * @param {string} target - 'dir'|'all'|'everything'
 * @param {Object} buildConfig
 */
module.exports = function( grunt, target, buildConfig ) {

  assert && assert( target === 'dir' || target === 'all' || target === 'everything', 'Bad lint target: ' + target );
  var repositoryName = buildConfig.name;

  // --disable-eslint-cache disables the cache, useful for developing rules
  var cache = !grunt.option( 'disable-eslint-cache' );

  var cli = new CLIEngine( {

    // Rules are specified in the .eslintrc file
    configFile: '../chipper/eslint/.eslintrc',

    // Caching only checks changed files or when the list of rules is changed.  Changing the implementation of a
    // custom rule does not invalidate the cache.  Caches are declared in .eslintcache files in the directory where
    // grunt was run from.
    cache: cache,

    // Our custom rules live here
    rulePaths: [ '../chipper/eslint/rules' ],

    // Where to store the target-specific cache file
    cacheFile: '../chipper/eslint/cache/' + repositoryName + '-' + target + '.eslintcache',

    // Files to skip for linting
    ignorePattern: [
      '**/.git',
      '**/build',
      '**/node_modules',
      '**/snapshots',
      '../sherpa/**',
      '**/js/parser/svgPath.js',
      '../phet-io-website/root/assets/js/ua-parser-0.7.12.min.js',
      '../phet-io-website/root/assets/js/jquery-1.12.3.min.js',
      '../phet-io-website/root/assets/highlight.js-9.1.0/highlight.pack.js',
      '../phet-io-website/root/assets/highlight.js-9.1.0/highlight.js',
      '../phet-io-website/root/assets/bootstrap-3.3.6-dist/js/npm.js',
      '../phet-io-website/root/assets/bootstrap-3.3.6-dist/js/bootstrap.min.js',
      '../phet-io-website/root/assets/bootstrap-3.3.6-dist/js/bootstrap.js',
      '../phet-io-website/root/assets/js/phet-io-ga.js',
      '../installer-builder/temp/**'
    ]
  } );

  // Identify the repos to be linted
  var files = target === 'dir' ? [ repositoryName ] :
              target === 'all' ? buildConfig.phetLibs :
              grunt.file.read( '../chipper/data/active-repos' ).trim().split( /\r?\n/ );
  grunt.verbose.writeln( 'linting: ' + files );

  // Use the correct relative paths
  files = files.map( GET_PATH );

  // run the eslint step
  var report = cli.executeOnFiles( files );

  // pretty print results to console if any
  (report.warningCount || report.errorCount) && grunt.log.write( cli.getFormatter()( report.results ) );

  report.warningCount && grunt.fail.warn( report.warningCount + ' Lint Warnings' );
  report.errorCount && grunt.fail.fatal( report.errorCount + ' Lint Errors' );
};