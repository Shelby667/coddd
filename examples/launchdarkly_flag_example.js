// examples/launchdarkly_flag_example.js
// Minimal LaunchDarkly server-side usage example

const LaunchDarkly = require('launchdarkly-node-server-sdk');
const LD_SDK_KEY = process.env.LD_SDK_KEY; // set in environment

const ldClient = LaunchDarkly.init(LD_SDK_KEY);

async function init(){
  await ldClient.waitForInitialization();
}

async function isEnabled(flagKey, clientId){
  if(!ldClient) return false;
  const user = { key: clientId };
  try{
    return await ldClient.variation(flagKey, user, false);
  }catch(err){
    console.warn('LaunchDarkly check failed, defaulting to false', err.message);
    return false;
  }
}

module.exports = { init, isEnabled };
