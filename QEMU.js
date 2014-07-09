/**
 * @author LongTian <wyvernnot@gmail.com> 2014-7-8
 */

var Connection = require('ssh2');
var js2qemu=require('./js2qemu');

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
    var conn = new Connection();
    conn.on('ready', function() {
        var command=js2qemu(options);
        console.info(command);
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