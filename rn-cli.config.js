//added to address issue alemor10 had after installing twitter-sign-in through npm 
//https://github.com/facebook/react-native/issues/21242


const blacklist = require('metro-config/src/defaults/blacklist');

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

module.exports = {
  resolver: {
    blacklistRE: blacklist([/dist\/.*/])
  }
};