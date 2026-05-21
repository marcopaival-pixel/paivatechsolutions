# Gera ADMIN_PASSWORD e SESSION_SECRET para copiar na Vercel
# Uso: .\docto\scripts\generate-secrets.ps1

$chars = (48..57) + (65..90) + (97..122)
$adminPassword = -join ($chars | Get-Random -Count 24 | ForEach-Object { [char]$_ })
$sessionBytes = 1..32 | ForEach-Object { Get-Random -Maximum 256 }
$sessionSecret = [Convert]::ToBase64String($sessionBytes -as [byte[]])

Write-Host ""
Write-Host "=== Copie para Vercel (Production) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "ADMIN_PASSWORD=$adminPassword"
Write-Host "SESSION_SECRET=$sessionSecret"
Write-Host ""
Write-Host "Guarde em um cofre de senhas. Nao commite estes valores." -ForegroundColor Yellow
Write-Host ""
