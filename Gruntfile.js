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
                },
                middleware: function(connect, options, middlewares) {
                    // inject a custom middleware into the array of default middlewares
                    middlewares.push(function(req, res, next) { 
                        if (!req.url.match(/^\/api\//)) {
                             return next();
                        }else{
                            var QEMU_HOST = 'qemu001.sh.intel.com';
                            var REDIS_HOST = 'qemu001.sh.intel.com';
                            var QEMU = require('./QEMU');
                            var keym = require('./KeyManager');
                            var qemu = new QEMU(QEMU_HOST, 'root', keym.getPrivateKeyContent());
                            var client = require('redis').createClient(6379, REDIS_HOST);
                            client.incr("run_count", function(err, run_count) {
                                var uuid = require('uuid').v4();
                                qemu.createVM({
                                    "uuid": uuid,
                                    "pidfile": "/tmp/" + uuid + ".pid",
                                    "image": "/root/qemu/linux/linux-0.2.img",
                                    "spice": {
                                        port: 5000 + run_count,
                                        password: "12345678"
                                    }
                                });
                                res.end(uuid);
                            });
                        }
                    });
                    return middlewares;
                  },
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