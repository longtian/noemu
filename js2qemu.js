/**
 * convert js object to qemu command line
 * @author Longtian <wyvernnot@gmail.com> 2014-7-9
 */

var extend = require('node.extend');
/**
 * 
 * @param {Object} user_options
 * @returns {string}
 */
function js2qemu(user_options) {
    var defaultOptions = {
        arch: "x86_64",
        display: "none"
    };

    var options = extend(defaultOptions, user_options);
    
    var cmd = '';
    /*
     * begin of command: qemu-system-{arch} image.img
     */
    if (options.arch) {
        cmd += 'qemu-system-' + options.arch;
        delete options.arch;
    }

    if (options.image) {
        cmd += ' ' + options.image;
        delete options.image;
    }
    
    if (options.vnc) {
        cmd += ' -vnc :' + options.vnc.display;
        if(options.vnc.websocket){
            cmd += ',websocket=' + options.vnc.websocket;
        }
        delete options.vnc;
    }
    
    /*
     * options of command
     * @todo escape shell commands
     * @sorting
     */
    for (var i in options) {
        cmd += ' -' + i;
        var params=[];
        /**
         * pass 
         * <code>{a:{b:1,c:2}}</code>
         * to
         * <code>-a b=1,c=2</code>
         */
        if('object'===typeof options[i]){
            for(var j in options[i]){
                if(j.length){
                    params.push(j+"="+options[i][j]);
                }else{
                    params.push(options[i][j]);
                }
            }
        }else{
            params.push(options[i]);
        }
        cmd+=" "+params.join(",");
    }

    console.log(cmd);
    return cmd;
}

module.exports = js2qemu;