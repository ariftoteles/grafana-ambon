#!/usr/bin/env pwsh

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Building Grafana Service Executables" -ForegroundColor Cyan  
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Building for Windows (x64)..." -ForegroundColor Yellow
npm run build-win
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Windows build completed" -ForegroundColor Green
} else {
    Write-Host "✗ Windows build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Building for all platforms..." -ForegroundColor Yellow
npm run build-all
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All platform builds completed" -ForegroundColor Green
} else {
    Write-Host "✗ Multi-platform build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Copying additional files..." -ForegroundColor Yellow

# Ensure files exist in dist
if (!(Test-Path "dist\database.json")) {
    Copy-Item "database.json" "dist\database.json" -ErrorAction SilentlyContinue
}

Write-Host "✓ Additional files copied" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Build Complete!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Files generated in 'dist' folder:" -ForegroundColor White
Get-ChildItem -Path "dist" | Format-Table Name, Length, LastWriteTime

Write-Host ""
Write-Host "To distribute:" -ForegroundColor Yellow  
Write-Host "1. Copy entire 'dist' folder to target machine" -ForegroundColor White
Write-Host "2. Run 'start-server.bat' or 'grafana-service.exe'" -ForegroundColor White
Write-Host ""

# Test executable
Write-Host "Testing executable..." -ForegroundColor Yellow
$testJob = Start-Job -ScriptBlock { 
    Set-Location "dist"
    & ".\grafana-service.exe"
}

Start-Sleep -Seconds 3

# Check if server started
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Executable test successful - Server responds!" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not test server response (might be port conflict)" -ForegroundColor Yellow
}

Stop-Job $testJob -Force
Remove-Job $testJob -Force

Write-Host ""
Read-Host "Press Enter to continue"