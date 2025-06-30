// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const {
  withLibsodiumResolver,
} = require("@burnt-labs/abstraxion-react-native/metro.libsodium");

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;
module.exports = withLibsodiumResolver(config);
