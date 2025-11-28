@echo off
echo ==========================================
echo Fixing Vercel Deployment Issue
echo ==========================================
echo.
echo This script will remove node_modules from your git repository.
echo This is necessary to fix the "Permission denied" error on Vercel.
echo.

echo 1. Removing node_modules from git tracking...
git rm -r --cached node_modules
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] node_modules might not be tracked or was already removed.
    echo Continuing...
)

echo.
echo 2. Adding changes...
git add .

echo.
echo 3. Committing changes...
git commit -m "fix: remove node_modules from git to resolve vercel permissions"

echo.
echo 4. Pushing to remote...
git push

echo.
echo ==========================================
echo Done! Please check your Vercel dashboard.
echo ==========================================
pause
