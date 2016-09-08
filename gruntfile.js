//reated by andrey on 19.06.16.

module.exports = function (grunt) {
    "use strict";
    
    grunt.initConfig({
        notify: {
            sass: {
                options: {
                    title  : 'SCSS to CSS',
                    message: 'main.css successfully generated...'
                }
            }
        },
    
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/styles/main.css': 'public/styles/main.scss'
                }
            }
        },
    
        watch: {
            sass: {
                files  : 'public/styles/*.scss',
                tasks  : ['sass', 'notify:sass'],
                options: {
                    debounceDelay: 1000
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('style', ['sass', 'notify:sass', 'watch']);
};