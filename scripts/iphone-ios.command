#!/bin/bash
# Ouvrir la vraie app dans Safari du Simulateur iOS d'Apple, sur Mac avec Xcode.
set -eu
cd -- "$(dirname -- "$0")/.."
if ! command -v node >/dev/null || ! xcrun simctl list devices available --json >/dev/null 2>&1; then
  echo "Installe Node.js 24 LTS et Xcode avec un runtime iOS, puis relance ce fichier."
  read -r -p "Appuie sur Entrée pour fermer… "
  exit 1
fi
cleanz_device=$(xcrun simctl list devices available --json | node -e '
  const {spawnSync}=require("node:child_process");
  const devices=JSON.parse(require("node:fs").readFileSync(0,"utf8")).devices;
  const choices=Object.entries(devices).flatMap(([runtime,rows])=>rows.filter(d=>d.isAvailable && d.name.startsWith("iPhone")).map(d=>({...d,label:d.name+" · iOS "+runtime.split(".iOS-").pop().replaceAll("-",".")})));
  if(!choices.length){console.error("Aucun iPhone iOS disponible dans Xcode.");process.exit(1)}
  const script="on run argv\nset selected to choose from list argv with prompt \"Choisis un iPhone installé dans Xcode\"\nif selected is false then return \"\"\nreturn item 1 of selected\nend run";
  const result=spawnSync("osascript",["-e",script,...choices.map(d=>d.label)],{encoding:"utf8"});
  const device=choices.find(d=>d.label===result.stdout?.trim());
  if(!device)process.exit(1);
  console.log(device.udid+" "+device.state);
')
read -r cleanz_id cleanz_state <<< "$cleanz_device"
if [ "$cleanz_state" != "Booted" ]; then xcrun simctl boot "$cleanz_id"; fi
open -a Simulator
xcrun simctl bootstatus "$cleanz_id" -b
cleanz_port="${CLEANZ_PREVIEW_PORT:-55355}"
cleanz_pid=""
trap 'if [ -n "$cleanz_pid" ]; then kill "$cleanz_pid" 2>/dev/null || true; fi' EXIT
if ! curl --fail --silent "http://127.0.0.1:$cleanz_port/simulateur.html" | grep -q 'Cleanz'; then
  CLEANZ_NO_OPEN=1 node scripts/preview-sync.mjs &
  cleanz_pid=$!
  for cleanz_attempt in $(seq 1 180); do
    if curl --fail --silent "http://127.0.0.1:$cleanz_port/simulateur.html" >/dev/null; then break; fi
    if ! kill -0 "$cleanz_pid" 2>/dev/null; then exit 1; fi
    sleep 1
  done
fi
xcrun simctl openurl "$cleanz_id" "http://127.0.0.1:$cleanz_port/?apercu=1"
echo "Cleanz est ouvert dans Safari iOS. Ce terminal reste ouvert pour les mises à jour."
if [ -n "$cleanz_pid" ]; then wait "$cleanz_pid"; fi
