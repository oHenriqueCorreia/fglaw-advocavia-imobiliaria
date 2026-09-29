import { cp, mkdir } from "node:fs/promises";
await mkdir("dist", { recursive: true });
for (const file of ["index.html", "styles.css", "script.js", "assets"]) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log("Página estática preparada em dist/.");
