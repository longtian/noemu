=================
###Identify
-uuid b11f473e-ade8-4b17-a24c-7ea248fe01d9 
-name instance-0000001a 

###Default Settings
-no-user-config 
-nodefaults 
-no-shutdown 
-no-hpet 
-global kvm-pit.lost_tick_policy=discard 
-S 

###KVM
-enable-kvm 
-machine pc-i440fx-trusty,accel=kvm,usb=off 

###Migration
-incoming fd:23 

###Monitoring
-chardev socket,
     id=charmonitor,
     path=/var/lib/libvirt/qemu/instance-0000001a.monitor,server,nowait 
-mon chardev=charmonitor,id=monitor,mode=control 

###Time & Locale
-realtime mlock=off 
-rtc base=utc,driftfix=slew 
-k en-us 

###CPU
-smp 1,sockets=1,cores=1,threads=1 

###BIOS
-smbios type=1,manufacturer=OpenStack Foundation,product=OpenStack Nova,version=2014.2,serial=19f6f878-c72f-4455-841f-64b5efe88d6a,uuid=b11f473e-ade8-4b17-a24c-7ea248fe01d9 
-boot strict=on 

###LOG
-device isa-serial,
     chardev=charserial0,
     id=serial0 
-chardev file,
     id=charserial0,
     path=/opt/stack/data/nova/instances/b11f473e-ade8-4b17-a24c-7ea248fe01d9/console.log 

###PTY
-device isa-serial,
     chardev=charserial1,
     id=serial1
-chardev pty,id=charserial1 

###Device
-drive file=/opt/stack/data/nova/instances/b11f473e-ade8-4b17-a24c-7ea248fe01d9/disk.config,
     if=none,
     id=drive-ide0-1-1,
     readonly=on,
     format=raw,
     cache=none 

###USB
-device piix3-usb-uhci,
     id=usb,
     bus=pci.0,
     addr=0x1.0x2 

###Disk
-drive file=/dev/disk/by-path/ip-10.239.21.162:3260-iscsi-iqn.2010-10.org.openstack:volume-476dedf8-ae5b-4c1b-9802-282741773bef-lun-1,
     if=none,
     id=drive-virtio-disk0,
     format=raw,
     serial=476dedf8-ae5b-4c1b-9802-282741773bef,
     cache=none 
-device virtio-blk-pci,
     scsi=off,
     bus=pci.0,
     addr=0x4,
     drive=drive-virtio-disk0,
     id=virtio-disk0,
     bootindex=1 

###CD
-device ide-cd,
     bus=ide.1,
     unit=1,
     drive=drive-ide0-1-1,
     id=ide0-1-1 

###Network
-netdev tap,
     fd=26,
     id=hostnet0,
     vhost=on,
     vhostfd=27 
-device virtio-net-pci,
     netdev=hostnet0,
     id=net0,
     mac=fa:16:3e:57:41:7e,
     bus=pci.0,
     addr=0x3 

###Video
-vnc 127.0.0.1:0 
-device cirrus-vga,
     id=video0,
     bus=pci.0,
     addr=0x2 

###Memory
-m 2048 
-device virtio-balloon-pci,
     id=balloon0,
     bus=pci.0,
     addr=0x5
