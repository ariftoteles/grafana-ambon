@echo off
echo ==========================================
echo       Grafana Service PM2 Manager
echo ==========================================
echo.

:menu
echo Choose an option:
echo 1. Start service (Production)
echo 2. Start service (Development)  
echo 3. Stop service
echo 4. Restart service
echo 5. View logs
echo 6. View status
echo 7. Monitor (real-time)
echo 8. Delete service
echo 9. Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto start_prod
if "%choice%"=="2" goto start_dev
if "%choice%"=="3" goto stop
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto logs
if "%choice%"=="6" goto status
if "%choice%"=="7" goto monitor
if "%choice%"=="8" goto delete
if "%choice%"=="9" goto exit
goto invalid

:start_prod
echo Starting Grafana Service in Production mode...
npm run pm2:start-prod
echo Service started! Access at http://localhost:3000
goto menu

:start_dev
echo Starting Grafana Service in Development mode...
npm run pm2:start-dev  
echo Service started! Access at http://localhost:3000
goto menu

:stop
echo Stopping Grafana Service...
npm run pm2:stop
echo Service stopped!
goto menu

:restart
echo Restarting Grafana Service...
npm run pm2:restart
echo Service restarted!
goto menu

:logs
echo Showing logs (Press Ctrl+C to exit logs)...
npm run pm2:logs
goto menu

:status
echo Current PM2 status:
npm run pm2:status
echo.
pause
goto menu

:monitor
echo Opening PM2 monitor (Press Ctrl+C to exit)...
npm run pm2:monit
goto menu

:delete
echo Deleting Grafana Service from PM2...
npm run pm2:delete
echo Service deleted from PM2!
goto menu

:invalid
echo Invalid choice! Please try again.
goto menu

:exit
echo Goodbye!
pause
exit