import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
const lines = env.split("\n");
const get = (name) => {
  const line = lines.find((l) => l.startsWith(name + "="));
  return line ? line.slice(name.length + 1).trim() : null;
};

const url = get("NEXT_PUBLIC_SUPABASE_URL");
const key = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");

console.log("URL presente:", url ? "SI (" + url.length + " chars)" : "NO");
console.log("URL empieza con https:", url?.startsWith("https://") ? "SI" : "NO");
console.log("URL primeros 35:", url?.slice(0, 35));
console.log("KEY presente:", key ? "SI (" + key.length + " chars)" : "NO");
console.log("Probando conexion...");

try {
  const res = await fetch(url + "/rest/v1/vehicles?select=name,price_per_day", {
    headers: { apikey: key, Authorization: "Bearer " + key },
  });
  const text = await res.text();
  console.log("Status HTTP:", res.status);
  console.log("Respuesta:", text.slice(0, 300));
} catch (e) {
  console.log("ERROR de conexion:", e.message);
}
