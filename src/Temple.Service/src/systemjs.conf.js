﻿/*
 * This config is only used during development and build phase only
 * It will not be available on production
 *
 */

(function (global) {
    // ENV
    global.ENV = global.ENV || 'development';

    // map tells the System loader where to look for things
    var map = {
        'app': 'src/tmp/app',
        'test': 'src/tmp/test',
        'primeng': 'node_modules/primeng',
        'oidc-client': 'node_modules/oidc-client/lib/oidc-client.js',
        'moment': 'node_modules/moment/moment.js',
        'app-shared': 'src/tmp/app/shared'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            defaultExtension: 'js'
        },
        'test': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'primeng': {
            defaultExtension: 'js'
        }

    };

    // List npm packages here
    var npmPackages = [
        '@angular',
        'rxjs',
        'lodash',
        'ng2-bootstrap'
    ];

    // Add package entries for packages that expose barrels using index.js
    var packageNames = [
        // App barrels
        'app-shared',

        // 3rd party barrels
        'lodash'
    ];

    // Add package entries for angular packages
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];

    var ngBootPackageNames = [
        'collapse'
    ];

    npmPackages.forEach(function (pkgName) {
        map[pkgName] = 'node_modules/' + pkgName;
    });

    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    ngPackageNames.forEach(function (pkgName) {
        map['@angular/' + pkgName] = 'node_modules/@angular/' + pkgName +
            '/bundles/' + pkgName + '.umd.js';
        map['@angular/' + pkgName + '/testing'] = 'node_modules/@angular/' + pkgName +
        '/bundles/' + pkgName + '-testing.umd.js';
    });

    ngBootPackageNames.forEach(function (pkgName) {
        var main = pkgName + '.js';
        packages['ng2-bootstrap/components/'] = { main: main, defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);