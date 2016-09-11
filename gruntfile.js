module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {'presets': ['es2015']}],
                        ['jstify']
                    ]
                },
                files  : {
                    'public/bundle.js': ['public/app/app.js']
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
                    'public/index.html'  : 'public/app/assets/index.html'
                }
            }
        },
        copy      : {
            main: {
                files: [
                    {expand: true, cwd: 'public/app/styles/', src: ['*'], dest: 'public'}
                ]
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    
    grunt.registerTask('start', ['build', 'watch']);
    grunt.registerTask("build", ["browserify", "copy:main", "htmlmin"]);
};