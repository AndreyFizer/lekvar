module.exports = function (grunt) {
    grunt.initConfig({
        browserify : {
            dist: {
                options: {
                    transform: [
                        ['babelify', { 'presets': ['es2015']}],
                        ['jstify']
                    ]
                },
                files  : {
                    './public/bundle.js': ['./public/app/app.js']
                }
            }
        },
        copy       : {
            main: {
                files: [
                    // includes files within path
                    {expand: true, cwd: './public/app/assets/', src: ['*'], dest: './public'},
                    {expand: true, cwd: './public/app/styles/', src: ['*'], dest: './public'}
                ]
            }
        },
        watch      : {
            scripts: {
                files: ["./app/**"],
                tasks: ["build"]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.registerTask('start', ['build', 'watch']);
    grunt.registerTask("build", ["browserify", "copy:main"]);
};