/**
 * @author Longtian <wyvernnot@gmail.com> 2014-7-8
 */

module.exports=function(grunt){
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
       jshint: {
        all: ['Gruntfile.js', '*.js']
      }
    });
};