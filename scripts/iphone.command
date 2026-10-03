#!/bin/bash
# Lancer depuis le Finder dans une copie locale de Cleanz (macOS).
set -eu
cd -- "$(dirname -- "$0")/.."
if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  echo "Installe Node.js 24 LTS, puis ouvre à nouveau ce fichier."
  read -r -p "Appuie sur Entrée pour fermer… "
  exit 1
fi
if [ ! -d node_modules ]; then
  npm ci --no-audit --no-fund
fi
if [ ! -f .next/BUILD_ID ]; then
  npm run build
fi
cleanz_port=$(node -e 'const s=require("node:net").createServer();s.listen(0,"127.0.0.1",()=>{console.log(s.address().port);s.close()})')
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port "$cleanz_port" &
cleanz_pid=$!
trap 'kill "$cleanz_pid" 2>/dev/null || true' EXIT
for cleanz_attempt in $(seq 1 30); do
  if curl --fail --silent "http://127.0.0.1:$cleanz_port/simulateur.html" >/dev/null; then
    open "http://127.0.0.1:$cleanz_port/simulateur.html"
    echo "Cleanz est ouvert au format iPhone. Garde ce terminal ouvert pendant ta visite."
    wait "$cleanz_pid"
    exit
  fi
  sleep 1
done
echo "Cleanz n’a pas démarré. Consulte les messages ci-dessus."
exit 1
