/**
 * convert js object to qemu command line
 * @author Longtian <wyvernnot@gmail.com> 2014-7-9
 */

var extend = require('node.extend');
/**
 * 
 * @param {Object} options
 * @returns {string}
 */
function js2qemu(options) {
    var defaultOptions = {
        arch: "x86_64",
        display: "none"
    };

    var options = extend(defaultOptions, options);
    
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
                params.push(j+"="+options[i][j]);
            }
        }else{
            params.push(options[i]);
        }
        cmd+=" "+params.join(",");
    }

    return cmd;
}

module.exports = js2qemu;