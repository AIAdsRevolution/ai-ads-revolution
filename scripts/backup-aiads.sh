#!/bin/bash

set -e

DATE=$(date +"%Y-%m-%d_%H-%M")
PROJECT_DIR="$HOME/Projects/ai-ads-revolution"
BACKUP_DIR="$HOME/Backups/aiadsrevolution"
ZIP_NAME="aiadsrevolution-$DATE.zip"
S3_BUCKET="ai-ads-revolution-backups-roby"

echo "[AIADS BACKUP] Inizio backup: \$DATE"

# assicurati che la cartella backup locale esista
mkdir -p "\$BACKUP_DIR"

cd "\$PROJECT_DIR"

# creiamo lo zip ESCLUDENDO roba pesante
zip -r "\$ZIP_NAME" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x "*.DS_Store" \
  -x ".git/*"

echo "[AIADS BACKUP] Zip creato: \$ZIP_NAME"

# upload su S3
aws s3 cp "\$ZIP_NAME" "s3://\$S3_BUCKET/"

echo "[AIADS BACKUP] Caricato su s3://\$S3_BUCKET/\$ZIP_NAME"

# sposta lo zip nella cartella locale di backup
mv "\$ZIP_NAME" "\$BACKUP_DIR/"

echo "[AIADS BACKUP] Spostato in \$BACKUP_DIR"
echo "[AIADS BACKUP] Backup completato con successo."
