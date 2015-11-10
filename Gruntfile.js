/**
 * Grunt config file
 */

module.exports = function (grunt) {

    grunt.file.defaultEncoding = 'utf8';
    grunt.file.preserveBOM = false;

    grunt.initConfig({

        // minify own JS script
        uglify: {
            my_target: {
                files: {
                    'js/dist/main.min.js': ['js/dist/concat.js']
                }
            }
        },

        // concatenate JS libs
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/*.js'],
                //dest: 'js/concat.js'
                dest: 'js/dist/concat.js'
            }
        },

        // minify and concatenate CSS libs
        cssmin: {
            combine: {
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        },

        // compile less files to css
        less: {
            development: {
                options: {
                    //paths: ["../ks/public/css"]
                    paths: ["css"]
//                    cleancss: true
                },
                files: {
                    "css/main.css": "less/main.less"
                }
            }
        },

        // watch for changes and trigger commands
        watch: {
            concat: {
                options: {
                    livereload: true
                },
                files: ['js/*'],
                tasks: ['concat']
            },
            //uglify: {
            //    options: {
            //        livereload: true
            //    },
            //    files: ['js/concat.js'],
            //    tasks: ['uglify']
            //},
            less: {
                options: {
                    livereload: true
                },
                files: ['less/module/*', 'less/module/*/*', 'less/module/sections/*', 'less/module/sections/*/*', 'less/main.less', 'less/vendor/*'],
                tasks: ['less']
            }
        },

        //injecting the changes into all open browsers without a page refresh
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['*.html', 'css/main.min.css', 'css/main.css', 'js/main.min.js', 'images/*.png', 'images/*/*.png']
                },
                options: {
                    server: {
                        baseDir: "./"
                    },
                    watchTask: true // < VERY important
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    //grunt.registerTask('default', ["browserSync", "cssmin", "less", "uglify", "concat", "watch"]);
    grunt.registerTask('default', ["browserSync", "cssmin", "less", "concat", "watch"]);

};
