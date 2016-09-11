module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {'presets': ['es2015']}],
                        ['jstify', {'engine' : 'lodash'}]
                    ]
                },
                files  : {
                    'public/app/bundle.js': ['public/source/js/main.js']
                }
            }
        },
        htmlmin   : {
            dist: {
                options: {
                    removeComments    : true,
                    collapseWhitespace: true
                },
                files  : {
                    'public/index.html'  : 'public/source/index.html'
                }
            }
        },
        
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/app/main.css': 'public/source/styles/main.scss'
                }
            }
        },
        
        watch     : {
            scripts: {
                files: ["./app/**"],
                tasks: ["build"]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    
    grunt.registerTask('start', ['build', 'watch']);
    grunt.registerTask("build", ["browserify", "sass", "htmlmin"]);
};