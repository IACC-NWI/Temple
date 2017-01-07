var envConfig = require('./env');
var devConfig = require('./local-config');

module.exports = function () {
    var root = '',
        src = root + 'src/',
        app = src + 'app/',
        test = src + 'test/',
        tmp = src + 'tmp/',
        tmpApp = tmp + 'app/',
        tmpTest = tmp + 'test/',
        testHelper = test + 'test-helpers/',
        e2e = root + 'e2e/',
        assets = src + 'assets/',
        assetsPath = {
            styles: assets + 'styles/',
            images: assets + 'images/',
            fonts: assets + 'fonts/'
        },
        index = src + 'index.html',
        callback = src + 'callback.html',
        silentcallback = src + 'silentcallback.html',
        tsFiles = [
            app + '**/!(*.spec)+(.ts)'
        ],
        tsTestFiles = {
            unit: [app + '**/*.spec.ts'],
            e2e: [e2e + '**/*.ts'],
            helper: [testHelper + '**/*.ts']
        },
        build = {
            path: 'build/',
            app: 'build/app/',
            fonts: 'build/fonts',
            assetPath: 'build/assets/',
            assets: {
                lib: {
                    js: 'lib.js',
                    css: 'lib.css'
                }
            },
            debugPath: 'bin/Debug/WebContent',
            releasePath: 'bin/Release/WebContent'
        },
        report = {
            path: 'src/tmp/report/'
        };

    var e2eConfig = {
        seleniumTarget: devConfig.localDev.scheme + '://' + devConfig.localDev.host + ':' + devConfig.localDev.port
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            mangle: true,
            runtime: false,
            globalDefs: {
                DEBUG: false,
                ENV: 'production'
            }
        }
    };

    var config = {
        root: root,
        src: src,
        app: app,
        test: test,
        tmp: tmp,
        tmpApp: tmpApp,
        tmpTest: tmpTest,
        testHelper: testHelper,
        e2e: e2e,
        e2eConfig: e2eConfig,
        assets: assets,
        index: index,
        callback: callback,
        silentcallback: silentcallback,
        build: build,
        report: report,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        tsTestFiles: tsTestFiles,
        systemJs: systemJs
    };

    if (envConfig.ENV === envConfig.ENVS.DEV) {
        var browserSync = {
            dev: {
                port: devConfig.localDev.port,
                host: devConfig.localDev.host,
                server: {
                    baseDir: './src/',
                    //middleware: [historyApiFallback(), apiProxy],
                    routes: {
                        "/node_modules": "node_modules",
                        "/src": "src",
                        "/evnSettings": "EnvironmentSettings"
                    }
                },
                ghostMode: false,
                open: 'external',
                browser: 'chrome',
                files: [
                    //src + 'assets/script/oidc-client-lib.js',
                    //src + "index.html",
                    //src + 'callback.html',
                    //src + 'silentcallback.html',
                    src + "systemjs.conf.js",
                    assetsPath.styles + "main.css",
                    tmpApp + "**/*.js",
                    app + "**/*.css",
                    app + "**/*.html"
                ]
            },
            prod: {
                port: 3001,
                server: {
                    baseDir: './' + build.path,
                    //middleware: [historyApiFallback(), apiProxy]
                }
            }
        };

        config.browserSync = browserSync;
    }

    return config;
};