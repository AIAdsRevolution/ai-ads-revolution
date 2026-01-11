import http from "http";
import { google } from "googleapis";
import fs from "fs";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log("❌ Mancano GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const PORT = 4555;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/adwords"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

console.log("\n✅ Apri questo link nel browser (se non si apre da solo):\n");
console.log(authUrl + "\n");

try {
  const { execSync } = await import("child_process");
  execSync(`open "${authUrl}"`, { stdio: "ignore" });
} catch {}

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("AI Ads Revolution OAuth server running...");
    return;
  }

  const u = new URL(req.url, REDIRECT_URI);
  const code = u.searchParams.get("code");
  const err = u.searchParams.get("error");

  if (err) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Errore OAuth: " + err);
    console.log("❌ Errore OAuth:", err);
    server.close();
    return;
  }

  if (!code) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Codice mancante.");
    console.log("❌ Codice mancante nella callback.");
    server.close();
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync("google-oauth.json", JSON.stringify(tokens, null, 2));
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("✅ OK! Puoi chiudere questa finestra e tornare al Terminale.");

    console.log("✅ Salvato google-oauth.json in ~/AIADS_MASTER/web");
    console.log("🔎 refresh_token presente?", Boolean(tokens.refresh_token));
    if (!tokens.refresh_token) {
      console.log("⚠️ Non vedo refresh_token: verifica Test Users e ripeti (prompt consent è già attivo).");
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Errore scambio token.");
    console.log("❌ Errore getToken:", e?.message || e);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log(`🟢 In ascolto su ${REDIRECT_URI}`);
});
