console.log("Pipeline Utilization js running")

let client = require('./wsClient');
client.wsClient();

d3.select("body")
  .append("div")
  .style("border", "1px black solid")
  .text("hello world...");