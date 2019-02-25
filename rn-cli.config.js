//added to address issue alemor10 had after installing twitter-sign-in through npm 
//https://github.com/facebook/react-native/issues/21242



const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /node_modules\\.*\\node_modules\\react-native\\.*/,
        ])
    },
};