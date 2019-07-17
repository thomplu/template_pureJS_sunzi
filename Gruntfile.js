module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    const sass = require('node-sass');

    var PathConfig = require('./grunt-settings.js');

    // tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: PathConfig,

        uglify: {
            vendor: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.jsDir %>vendor",
                    src: "**/*.js",
                    dest: "<%= config.jsDir %>vendor"
                }]
            },
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapName: "<%= config.jsDir %>jquery.main.js.map",
                    mangle: {
                        reserved: ["jQuery", "Hammer"]
                    },
                    banner: "/*! (c) Copyright <%= grunt.template.today('yyyy') %>, Sunzinet AG <info@sunzinet.com> - Created: <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.jsDir %>",
                    src: [
                        "**/*.js",
                        "!vendor/**/.js"
                    ],
                    dest: "<%= config.jsWebDir %>"
                }]
            },
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: "<%= config.jsWebDir %>jquery.main.js.map",
                    mangle: {
                        reserved: ["jQuery", "Hammer"]
                    },
                    compress: {
                        drop_console: true // removes all console.* calls
                    },
                    banner: "/*! (c) Copyright <%= grunt.template.today('yyyy') %>, Sunzinet AG <info@sunzinet.com> - Created: <%= grunt.template.today('yyyy-mm-dd') %> */"
                },
                files: [{
                    expand: true,
                    cwd: "<%= config.jsDir %>",
                    src: [
                        "**/*.js",
                        "!vendor/**/.js"
                    ],
                    dest: "<%= config.jsWebDir %>"
                }]
            }
        },

        sass: {
            dev: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    style: 'nested'
                },
                files: [
                    {
                        src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
                        dest: '<%= config.cssDir %><%= config.cssMainFileName %>.css'
                    }
                ]
            },
            dist: {
                options: {
                    implementation: sass,
                    sourceMap: false,
                    outputStyle: 'nested'
                },
                files: [
                    {
                        src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
                        dest: '<%= config.cssWebDir %><%= config.cssMainFileName %>.css'
                    }
                ]
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: ['last 4 version', 'Android 4']})
                ]
            },

            dev: {
                src: '<%= config.cssDir %>*.css'
            },

            dist: {
                src: ['<%= config.cssWebDir %>*.css']
            }
        },

        csscomb: {
            all: {
                expand: true,
                src: [
                    '<%= config.cssDir %>*.css',
                ],
            },
            dist: {
                expand: true,
                src: ['<%= config.cssWebDir %>*.css', '<%= config.cssWebDir %>!*.min.css'],
                ext: '.css'
            }
        },

        cmq: {
            options: {
                log: false
            },
            all: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.css', '**/!*.min.css'],
                        cwd: '<%= config.cssWebDir %>',
                        dest: '<%= config.cssWebDir %>'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        src: '<%= config.cssWebDir %><%= config.cssMainFileName %>.css',
                        dest: '<%= config.cssWebDir %><%= config.cssMainFileName %>.css'
                    }
                ]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.cssWebDir %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.cssWebDir %>',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: '<%= config.imgDir %>',
                src: '**/*.{jpg,png,gif}',
                dest: '<%= config.imgWebDir %>'
            },
            html: {
                expand: true,
                cwd: '<%= config.htmlDir %>',
                src: '*.html',
                dest: '<%= config.htmlWebDir %>'
            },
            fonts: {
                expand: true,
                cwd: '<%= config.fontDir %>',
                src: '**',
                dest: '<%= config.fontWebDir %>'
            }
        },

        //clean files
        clean: {
            options: { force: true },
            temp: {
                src: ["<%= config.cssDir %>**/*.map", "<%= config.imgWebDir %>", "<%= config.cssWebDir %><%= config.cssMainFileName %>.css", "<%= config.cssWebDir %><%= config.cssMainFileName %>.min.css", "./jpgtmp.jpg"]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.imgWebDir %>',
                    src: ['**/*.{jpg, gif}'],
                    dest: '<%= config.imgWebDir %>'
                }]
            }
        },

        pngmin: {
            dist: {
                options: {
                    ext: '.png',
                    force: true
                },
                files:[{
                    expand: true,
                    cwd: '<%= config.imgWebDir %>',
                    src: ['**/*.{png}'],
                    dest: '<%= config.imgWebDir %>'
                }]
            }
        },

        watch: {
            css: {
                files: '<%= config.sassDir %>**/*.scss',
                tasks: ['sass:dev', 'postcss:dev'],
                option: {
                    spawn: false
                }
            }
        }



    });

// run task
//dev
    //watch
    //grunt.registerTask('w', ['watch']);
    //browser sync

    // create JS files for either dev or distribution
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask("jsmin", function (target) {
        if ("dev" === target) {
            grunt.task.run(["uglify:dev"]);
        }

        if ("dist" === target) {
            grunt.task.run(["uglify:dist"]);
        }
    });

    //watch + browser sync
    grunt.registerTask('dev', ['sass:dev', 'postcss:dev']);

    //css beautiful
    grunt.registerTask('cssbeauty', ['sass:dist', 'postcss:dist','cmq:dist', 'csscomb:dist', 'cssmin:dist']);

    grunt.registerTask('imgmin', ['imagemin:dist', 'pngmin:dist']);

    grunt.registerTask('dist', ['clean:temp', 'cssbeauty', 'copy', 'jsmin:dist']);

    grunt.registerTask('default', ['dev']);

};