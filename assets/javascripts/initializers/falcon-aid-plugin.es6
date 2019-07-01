import { withPluginApi } from "discourse/lib/plugin-api";

function initializeFalconAidPlugin(api) {

  // see app/assets/javascripts/discourse/lib/plugin-api
  // for the functions available via the api object
  alert("initializeFalconAidPlugin function exec");
}

export default {
  name: "falcon-aid-plugin",

  initialize() {
    withPluginApi("0.8.24", initializeFalconAidPlugin);
    alert("in export exec");
  }
};


