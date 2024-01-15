// placeholder
import { placeholder } from "../src/index.ts";

Deno.bench("placeholder to string", () => {
  String(placeholder);
});
