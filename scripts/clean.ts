#!/usr/bin/env -S deno run --allow-read --allow-write --unstable

try {
  Deno.removeSync("./dist", { recursive: true });
} catch {
  console.log("No dist folder to delete.");
}
try {
  Deno.removeSync("./coverage", { recursive: true });
} catch {
  console.log("No coverage folder to delete.");
}
try {
  Deno.removeSync("./vendor", { recursive: true });
} catch {
  console.log("No vendor folder to delete.");
}
