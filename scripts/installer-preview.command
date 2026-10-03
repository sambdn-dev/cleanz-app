#!/bin/bash
# Une seule installation sur Mac ; les mises à jour passent ensuite par Git.
set -eu
if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  echo "Installe Node.js 24 LTS, puis relance ce fichier."
  read -r -p "Appuie sur Entrée pour fermer… "
  exit 1
fi
cleanz_repo="$HOME/Library/Application Support/Cleanz/apercu"
cleanz_branch="codex/apercu-iphone"
if [ ! -d "$cleanz_repo/.git" ]; then
  if [ -e "$cleanz_repo" ]; then
    echo "Le dossier $cleanz_repo existe déjà. Il est préservé ; aucune installation ne l’écrasera."
    exit 1
  fi
  mkdir -p -- "$(dirname -- "$cleanz_repo")"
  git clone --single-branch --branch "$cleanz_branch" https://github.com/sambdn-dev/cleanz-app.git "$cleanz_repo"
fi
cd -- "$cleanz_repo"
echo "Laisse ce terminal ouvert. Cleanz récupérera les mises à jour automatiquement."
exec node scripts/preview-sync.mjs
