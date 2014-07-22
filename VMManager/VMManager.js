/**
 * 
 * @author Longtian <wyvernnot@gmail.com> 2014-7-9
 */

var EventEmitter=require('events').EventEmitter;

function VMManager() {
    EventEmitter.call(this);
}

require('util').inherits(VMManager,EventEmitter);

VMManager.prototype.write=function(){
    this.emit('data',"??");
};

VMManager.prototype.connect=function(options){
    var net=require('net');
    var self=this;
    client=net.connect(options);
    self.client=client;
    
    self.client.on('connect',function(){
        setImmediate(function(){
//            client.write('{ "execute": "qmp_capabilities" }\n');
            self.execute('qmp_capabilities');
            self.emit('ready');
        });
    });
    
    self.client.on('data',function(data){
        console.log('<<<'+data.toString());
    });  
};

VMManager.prototype.execute=function(cmd,args){
    var self=this;
    
    if(args){
        
    }else{
        var _cmd=JSON.stringify({
            'execute':cmd
        });
        console.info('>>>'+_cmd);
        self.client.write(_cmd);
    }
//    self.client.write('{ "execute": "eject", "arguments": { "device": "ide1-cd0" } }\n');
};

module.exports = VMManager;