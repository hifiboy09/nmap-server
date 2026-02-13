const express = require("express");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());

app.post("/scan", (req, res) => {
  const { target } = req.body;

  if (!target) return res.send("Target missing");

  const nmap = const nmap = spawn("nmap", ["-sT", "-sV", target]);

  let output = "";

  nmap.stdout.on("data", (data) => {
    output += data.toString();
  });

  nmap.stderr.on("data", (data) => {
    output += data.toString();
  });

  nmap.on("close", () => {
    res.send(output);
  });
});

app.listen(10000, () => {
  console.log("Server running");
});
