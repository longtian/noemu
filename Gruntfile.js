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
                    middlewares.unshift(function(req,res,next){
                        if(req.method==="POST"){
                            var _body = "";
                            req.on('data', function (chunk) {
                              _body += chunk;
                            });
                            req.on('end', function () {
                                var options=JSON.parse(_body);

                                var QEMU_HOST = options.host;
                                var REDIS_HOST = 'qemu001.sh.intel.com';             
                                var QEMU = require('./QEMU');
                                var keym = require('./KeyManager');
                                var qemu = new QEMU(QEMU_HOST, 'root', keym.getPrivateKeyContent());
                                var client = require('redis').createClient(6379, REDIS_HOST);

                                client.incr("run_count", function(err, run_count) {
                                    var uuid = require('uuid').v4();
                                    var vm_options = {
                                        "uuid": uuid,
                                        "pidfile": "/tmp/" + uuid + ".pid"
                                    };
                                    
                                    if(options["image"]){
                                        vm_options["image"]=options.image;
                                    }else if(options["cdrom"]){
                                        vm_options["cdrom"]=options.cdrom;
                                    }
                                    
                                    if(options["console"]==="spice"){
                                        vm_options[ "spice"]= {
                                            port: 5000 + run_count,
                                            password: "12345678"
                                        }
                                    }else if (options["console"]==="vnc"){
                                        vm_options[ "vnc"]= {
                                            "display": run_count,
                                            "websocket": 5200+run_count,
                                        }
                                    }
                                    qemu.createVM(vm_options);
                                    
                                    res.writeHead(200);
                                    res.end(JSON.stringify(vm_options));
                                });
                            });
                        }else{
                            next();
                        }
                    });
                    middlewares.push(function(req, res, next) { 
                        if (!req.url.match(/^\/api\//)) {
                             return next();
                        }else{
                            
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