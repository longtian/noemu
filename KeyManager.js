/**
 * 
 * @author Longtian <wyvernnot@gmail.com> 2014-7-9
 */

module.exports = {
    /**
     * @todo test on linux platform
     * @returns {string}
     */
    getPrivateKeyContent: function() {
        var readFileSync = require("fs").readFileSync;
        if (process.platform === 'win32') {
            return readFileSync(process.env.USERPROFILE + "\\.ssh\\id_rsa");
        } else {
            return readFileSync(process.env.home + "/.ssh/id_rsa");
        }
    }
};