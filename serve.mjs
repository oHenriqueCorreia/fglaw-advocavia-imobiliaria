import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, resolve, sep } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (
      pathname === "/" ||
      pathname === "/juridico-imobiliario" ||
      pathname === "/juridico-imobiliario/"
    )
      pathname = "/index.html";
    const file = resolve(root, "." + pathname);
    const allowed =
      file === resolve(root, "index.html") ||
      file === resolve(root, "styles.css") ||
      file === resolve(root, "script.js") ||
      file.startsWith(resolve(root, "assets") + sep);
    if (!allowed) {
      res.writeHead(404);
      res.end("Não encontrado");
      return;
    }
    const content = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Não encontrado");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`FG Law: http://127.0.0.1:${port}`),
);
