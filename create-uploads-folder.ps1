Write-Host "Creating uploads folder..." -ForegroundColor Green

if (!(Test-Path "backend\public\uploads")) {
    New-Item -ItemType Directory -Path "backend\public\uploads" -Force
    Write-Host "Created uploads folder successfully!" -ForegroundColor Green
} else {
    Write-Host "Uploads folder already exists!" -ForegroundColor Yellow
}

Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 