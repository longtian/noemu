var Manager=new require('./VMManager');
var mgr=new Manager();

mgr.connect({
    host:"qemu001.sh.intel.com",
    port:3000
});

mgr.on('ready',function(){
    mgr.execute('query-status');
    mgr.execute('query-commands');
    mgr.execute('query-uuid');
});