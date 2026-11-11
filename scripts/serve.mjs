import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const build = spawn(process.execPath, [path.join(root, "scripts/build.mjs")], { stdio: "inherit" });
build.on("exit", code => {
  if (code !== 0) process.exit(code ?? 1);
  startServer();
});

function startServer() {
  const dist = path.join(root, "dist");
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8" };
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      let target = path.resolve(dist, `.${urlPath}`);
      if (!target.startsWith(dist + path.sep) && target !== dist) throw new Error("invalid path");
      let info;
      try { info = await stat(target); } catch { info = null; }
      if (info?.isDirectory()) target = path.join(target, "index.html");
      else if (!info && !path.extname(target)) target = path.join(target, "index.html");
      const data = await readFile(target);
      res.writeHead(200, { "Content-Type": types[path.extname(target)] ?? "application/octet-stream", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });
  let port = Number(process.env.PORT || 4173);
  server.on("error", error => {
    if (error.code === "EADDRINUSE") {
      console.log(`Port ${port} is busy; trying ${port + 1}.`);
      port += 1;
      server.listen(port, "127.0.0.1");
    } else {
      console.error(error);
      process.exit(1);
    }
  });
  server.on("listening", () => console.log(`reweigh.ai preview: http://127.0.0.1:${port}`));
  server.listen(port, "127.0.0.1");
}
