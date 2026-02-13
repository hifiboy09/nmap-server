import { spawn } from "child_process";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { target } = req.body;

  if (!target) {
    return res.status(400).send("Target required");
  }

  const nmap = spawn("nmap", ["-sV", target]);

  let output = "";

  nmap.stdout.on("data", (data) => {
    output += data.toString();
  });

  nmap.stderr.on("data", (data) => {
    output += data.toString();
  });

  nmap.on("close", () => {
    res.status(200).json({ result: output });
  });
}
