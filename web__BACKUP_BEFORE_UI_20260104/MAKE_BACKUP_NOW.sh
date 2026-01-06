#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"
TS="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="../_BACKUPS_WEB"
mkdir -p "$OUT_DIR"

echo "== BACKUP START: $TS =="

# 1) Salva lista file (utile per confronti)
find . -maxdepth 4 -type f \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -not -path "./.git/*" \
  > "$OUT_DIR/files_$TS.txt"

# 2) ZIP completo (senza node_modules/.next/.git)
ZIP="$OUT_DIR/web_backup_$TS.zip"
zip -r "$ZIP" . \
  -x "node_modules/*" ".next/*" ".git/*" \
  >/dev/null

echo "ZIP OK -> $ZIP"

# 3) Snapshot git (se repo esiste)
if [ -d ".git" ]; then
  echo "== GIT snapshot =="
  git status --porcelain > "$OUT_DIR/git_status_$TS.txt" || true

  # aggiunge tutto e crea commit "safety"
  git add -A || true
  if git diff --cached --quiet; then
    echo "Nessuna modifica da committare."
  else
    git commit -m "backup safety snapshot $TS" || true
    echo "Commit creato."
  fi
else
  echo "== Nessuna cartella .git trovata (ok) =="
fi

echo "== BACKUP DONE =="
echo "Cartella backup: $OUT_DIR"
