@echo off
echo ==========================================
echo   Building Grafana Service Executables
echo ==========================================
echo.

echo Building for Windows (x64)...
call npm run build-win
echo ✓ Windows build completed

echo.
echo Building for all platforms...
call npm run build-all
echo ✓ All platform builds completed

echo.
echo Copying additional files...
copy database.json dist\database.json >nul 2>&1
copy dist\start-server.bat dist\start-server.bat >nul 2>&1
copy dist\README.txt dist\README.txt >nul 2>&1

echo.
echo ==========================================
echo   Build Complete!
echo ==========================================
echo.
echo Files generated in 'dist' folder:
dir dist
echo.
echo To distribute: 
echo 1. Copy entire 'dist' folder to target machine
echo 2. Run 'start-server.bat' or 'grafana-service.exe'
echo.
pause