# Validacao local antes do push / deploy Vercel
# Uso: .\docto\scripts\preflight-go-live.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$site = Join-Path $root "apps\nexshape-site"

Write-Host "=== Preflight go-live - nexshape-site ===" -ForegroundColor Cyan
Write-Host "Diretorio: $site"
Write-Host ""

Push-Location $site
try {
  Write-Host "[1/4] typecheck..."
  npm run typecheck
  if ($LASTEXITCODE -ne 0) { throw "typecheck falhou" }

  Write-Host "[2/4] test (Vitest)..."
  npm run test
  if ($LASTEXITCODE -ne 0) { throw "test falhou" }

  Write-Host "[3/4] build..."
  $env:NEXT_PUBLIC_SITE_URL = "https://www.example.com"
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "build falhou" }

  Write-Host "[4/4] arquivos sensiveis..."
  $dbPath = Join-Path $site "db.json"
  if (Test-Path $dbPath) {
    Write-Host "  OK db.json existe localmente (.gitignore)" -ForegroundColor Green
  }
  $git = "C:\Program Files\Git\bin\git.exe"
  if (Test-Path $git) {
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = "SilentlyContinue"
    $tracked = & $git -C $root ls-files "apps/nexshape-site/db.json"
    $ErrorActionPreference = $prevEap
    if ($tracked) {
      Write-Host "  ERRO: db.json ainda rastreado pelo Git" -ForegroundColor Red
      Write-Host "  Execute: git rm --cached apps/nexshape-site/db.json"
      exit 1
    }
    Write-Host "  OK db.json nao rastreado pelo Git" -ForegroundColor Green
  }

  Write-Host ""
  Write-Host "=== Preflight OK ===" -ForegroundColor Green
  Write-Host "Proximo: GO_LIVE_FASE0.md"
  Write-Host ""
}
finally {
  Pop-Location
}
