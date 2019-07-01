import { acceptance } from "helpers/qunit-helpers";

acceptance("FalconAidPlugin", { loggedIn: true });

test("FalconAidPlugin works", async assert => {
  await visit("/admin/plugins/falcon-aid-plugin");

  assert.ok(false, "it shows the FalconAidPlugin button");
});
