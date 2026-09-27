#!/usr/bin/env bash
# Mac / Linux one-step setup: bash setup.sh
set -e
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js is not installed. Install the LTS version from https://nodejs.org"; exit 1; }
node scripts/check-setup.mjs
[ -f .env.local ] || cp .env.example .env.local
[ -d node_modules ] || { echo "Installing packages (1 to 3 minutes)..."; npm install; }
echo; echo "Starting the site. Open http://localhost:3000"; echo
npm run dev
