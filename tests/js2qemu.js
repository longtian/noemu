var js2qemu = require('../js2qemu.js');
var assert = require('assert');


assert.equal("qemu-system-x86_64 /root/qemu/linux/linux-0.2.img -display none -uuid uuid -pidfile /tmp/uuid.pid -monitor unix:/tmp/uuid.sock,server,nowait -spice port=5030,password=12345678"
        , js2qemu(
                {
                    'uuid': "uuid",
                    'pidfile': "/tmp/uuid.pid",
                    'image': "/root/qemu/linux/linux-0.2.img",
                    'monitor': 'unix:/tmp/uuid.sock,server,nowait',
                    'spice': {
                        port: 5030,
                        password: "12345678"
                    }
                }
        ));
assert.equal("qemu-system-x86_64 /root/qemu/linux/linux-0.2.img -display none -uuid uuid -pidfile /tmp/uuid.pid -monitor unix:/tmp/uuid.sock,server,nowait -vnc :1,websocket=12345678",js2qemu(
                {
                    'uuid': "uuid",
                    'pidfile': "/tmp/uuid.pid",
                    'image': "/root/qemu/linux/linux-0.2.img",
                    'monitor': 'unix:/tmp/uuid.sock,server,nowait',
                    'vnc': {
                        "": ":1",
                        websocket: "12345678"
                    }
                }
        ));