@echo off
cd /d "%~dp0"
title UpNorth.org setup
echo.
echo === UpNorth.org setup ===
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install the LTS version from https://nodejs.org
  echo then double-click this file again.
  pause
  exit /b 1
)
node scripts\check-setup.mjs
if errorlevel 1 (
  pause
  exit /b 1
)
if not exist .env.local copy .env.example .env.local >nul
if not exist node_modules (
  echo Installing packages. This takes 1 to 3 minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. See README.md, section Troubleshooting.
    pause
    exit /b 1
  )
)
echo.
echo Starting the site. Open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop.
echo.
call npm run dev
pause
