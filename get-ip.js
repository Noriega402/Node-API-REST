const os = require('os');
const IP = os.networkInterfaces();
let arr = [];

Object.keys(IP).forEach(function (ifname) {
  var alias = 0;

  IP[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
      arr.push(iface.address);
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
      arr.push(iface.address);
    }
    ++alias;
  });
});

// for(let e of arr){
//   console.log(e);
// }
console.log(arr[1]);
