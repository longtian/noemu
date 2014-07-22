/**
 * @author Longtian <wyvernnot@gmail.com> 2014-7-8
 */

module.exports=function(grunt){
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
       jshint: {
        all: ['Gruntfile.js', '*.js']
      },
      connect:{
          server:{
              options:{
                port:80,
                base:"app",
                keepalive:false,
                open:{
                        target:"http://localhost/index.html",
                        appName:"Chrome"
                    }
              }
          },
      },
      watch:{
          files:["app/**/*.js","app/**/*.html","app/**/*.css"],
           options: {
                livereload: true
            },
      }
    });
    
    grunt.registerTask('default',["connect","watch"]);
};