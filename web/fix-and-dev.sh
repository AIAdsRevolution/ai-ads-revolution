#!/usr/bin/env bash
set -e

# stop servers
PIDS="$(lsof -ti :3000 2>/dev/null || true)"
if [ -n "$PIDS" ]; then kill -9 $PIDS || true; fi

PIDS="$(lsof -ti :3001 2>/dev/null || true)"
if [ -n "$PIDS" ]; then kill -9 $PIDS || true; fi

# clean
rm -rf .next

# run DEFAULT dev (webpack, no turbopack flag)
npm run dev
