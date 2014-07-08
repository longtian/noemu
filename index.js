/**
 * @author Longtian <wyvernnot@gmail.com> 2014-7-8
 */

/**
 * get the content of private key file
 * @returns {string}
 */
var getPrivateKeyContent = function() {
    var readFileSync = require("fs").readFileSync;
    if (process.platform === 'win32') {
        return readFileSync(process.env.USERPROFILE + "\\.ssh\\id_rsa");
    } else {
        // @todo test on linux platform
        return readFileSync(process.env.home + "/.ssh/id_rsa");
    }
};

var QEMU_HOST='10.239.21.118';
var REDIS_HOST='10.239.21.118';

var QEMU = require('./QEMU');
var qemu = new QEMU(QEMU_HOST, 'root', getPrivateKeyContent());

var client = require('redis').createClient(6379, REDIS_HOST);

client.incr("run_count", function(err, run_count) {
    var uuid = require('uuid').v4();
    qemu.createVM({
        "uuid": uuid,
        "pidfile":"/tmp/"+uuid+".pid",
        "image": "/root/qemu/linux/linux-0.2.img",
        "spice": {
            port: 5000+run_count,
            password: "12345678"
        }
    });
});