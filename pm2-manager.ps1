#!/usr/bin/env pwsh

function Show-Menu {
    Clear-Host
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "       Grafana Service PM2 Manager" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Choose an option:" -ForegroundColor Yellow
    Write-Host "1. Start service (Production)" -ForegroundColor White
    Write-Host "2. Start service (Development)" -ForegroundColor White
    Write-Host "3. Stop service" -ForegroundColor White
    Write-Host "4. Restart service" -ForegroundColor White
    Write-Host "5. Reload service (zero-downtime)" -ForegroundColor White
    Write-Host "6. View logs" -ForegroundColor White
    Write-Host "7. View status" -ForegroundColor White
    Write-Host "8. Monitor (real-time)" -ForegroundColor White
    Write-Host "9. Delete service" -ForegroundColor White
    Write-Host "10. Save PM2 config" -ForegroundColor White
    Write-Host "11. Resurrect saved processes" -ForegroundColor White
    Write-Host "0. Exit" -ForegroundColor Red
    Write-Host ""
}

function Start-Service {
    param($env)
    Write-Host "Starting Grafana Service in $env mode..." -ForegroundColor Yellow
    
    if ($env -eq "production") {
        npm run pm2:start-prod
    } else {
        npm run pm2:start-dev
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Service started successfully!" -ForegroundColor Green
        Write-Host "Access at: http://localhost:3000" -ForegroundColor Cyan
    } else {
        Write-Host "✗ Failed to start service" -ForegroundColor Red
    }
}

function Stop-Service {
    Write-Host "Stopping Grafana Service..." -ForegroundColor Yellow
    npm run pm2:stop
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Service stopped successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to stop service" -ForegroundColor Red
    }
}

function Restart-Service {
    Write-Host "Restarting Grafana Service..." -ForegroundColor Yellow
    npm run pm2:restart
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Service restarted successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to restart service" -ForegroundColor Red
    }
}

function Reload-Service {
    Write-Host "Reloading Grafana Service (zero-downtime)..." -ForegroundColor Yellow
    npm run pm2:reload
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Service reloaded successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to reload service" -ForegroundColor Red
    }
}

function Show-Logs {
    Write-Host "Showing logs (Press Ctrl+C to exit)..." -ForegroundColor Yellow
    npm run pm2:logs
}

function Show-Status {
    Write-Host "Current PM2 status:" -ForegroundColor Yellow
    npm run pm2:status
}

function Show-Monitor {
    Write-Host "Opening PM2 monitor (Press Ctrl+C to exit)..." -ForegroundColor Yellow
    npm run pm2:monit
}

function Remove-Service {
    Write-Host "Deleting Grafana Service from PM2..." -ForegroundColor Yellow
    npm run pm2:delete
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Service deleted from PM2!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to delete service" -ForegroundColor Red
    }
}

function Save-Config {
    Write-Host "Saving PM2 configuration..." -ForegroundColor Yellow
    pm2 save
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ PM2 configuration saved!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to save configuration" -ForegroundColor Red
    }
}

function Resurrect-Processes {
    Write-Host "Resurrecting saved PM2 processes..." -ForegroundColor Yellow
    pm2 resurrect
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Processes resurrected successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to resurrect processes" -ForegroundColor Red
    }
}

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Enter your choice"
    
    switch ($choice) {
        "1" { Start-Service "production" }
        "2" { Start-Service "development" }
        "3" { Stop-Service }
        "4" { Restart-Service }
        "5" { Reload-Service }
        "6" { Show-Logs }
        "7" { Show-Status }
        "8" { Show-Monitor }
        "9" { Remove-Service }
        "10" { Save-Config }
        "11" { Resurrect-Processes }
        "0" { 
            Write-Host "Goodbye!" -ForegroundColor Green
            break 
        }
        default { 
            Write-Host "Invalid choice! Please try again." -ForegroundColor Red
        }
    }
    
    if ($choice -ne "0") {
        Write-Host ""
        Read-Host "Press Enter to continue"
    }
} while ($choice -ne "0")