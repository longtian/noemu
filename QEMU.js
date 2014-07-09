/**
 * @author LongTian <wyvernnot@gmail.com> 2014-7-8
 */

var Connection = require('ssh2');

/**
 * 
 * @param {string} host
 * @param {string} username
 * @param {string} password, private key
 * @returns {QEMU}
 */
var QEMU = function(host, username, password) {
    this.host = host;
    this.username = username;
    this.password = password;
};

/**
 * 
 * @param {Object} options
 * @returns {undefined}
 */
QEMU.prototype.createVM = function(options) {
    
    var self=this;
    
    var buildCommandFromOptions=function(){
        var cmd='qemu-system-x86_64 ';
        
        /**
         * [image]
         */
        if(options.image){
           cmd+=" "+options.image ;
        }
        
        /**
         * -uuid
         */
        if(options.uuid){
            cmd+=' -uuid '+options.uuid;
            cmd+=' -monitor unix:/tmp/'+options.uuid+".sock,server,nowait";
        }
        /**
         * -uuid
         */
        if(options.pidfile){
            cmd+=' -pidfile '+options.pidfile;
        }
        
        /**
         * -spice
         */
        if(options.spice){
           cmd+=' -spice';
           if(options.spice.port){
               cmd+=' port='+options.spice.port;
               if(options.spice.password){
                    cmd+=',password='+options.spice.password;
               }
           }
        }
        
        /**
         * -display
         */
        if(options.display){
            
        }else{
            cmd+=' -display none';
        }
        
        return cmd;
    };
    
    var conn = new Connection();
    conn.on('ready', function() {
        var command=buildCommandFromOptions(options);
        conn.exec("nohup "+command+" &", function(err, stream) {
            if (err) {
                throw err;
            }
            
            if(options.spice && options.spice.port){
                var spice_url="spice://"+self.host+":"+options.spice.port;
                if(options.spice.password){
                    console.log(spice_url+"?password="+options.spice.password);
                }else{
                    console.log(spice_url);
                }
            }
            
            stream.on('exit', function() {
            }).on('close', function() {
                conn.end();
                process.exit();
            });

            stream.stderr.on('data', function(data) {
                console.error("raw command:" + command);
                console.info("stderror:" + data.toString());
                conn.end();
            });
        });
    }).connect({
        host: this.host,
        port: 22,
        username: this.username,
        privateKey: this.password
    });
    return this;
};

module.exports = QEMU;