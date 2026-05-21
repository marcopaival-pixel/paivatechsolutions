# Smoke test pós go-live — nexshape-site
# Uso: .\docto\scripts\smoke-prod.ps1 -BaseUrl "https://www.seudominio.com.br"

param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl
)

$BaseUrl = $BaseUrl.TrimEnd("/")
$failed = 0

function Test-Url {
  param([string]$Path, [string]$Label = $Path)
  $url = "$BaseUrl$Path"
  try {
    $r = Invoke-WebRequest -Uri $url -Method Get -MaximumRedirection 5 -TimeoutSec 30
    if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) {
      Write-Host "[OK] $Label ($($r.StatusCode))"
      return $true
    }
    Write-Host "[FAIL] $Label status $($r.StatusCode)"
    $script:failed++
    return $false
  } catch {
    Write-Host "[FAIL] $Label — $($_.Exception.Message)"
    $script:failed++
    return $false
  }
}

Write-Host "=== Smoke test: $BaseUrl ===`n"

Write-Host "--- API health ---"
try {
  $health = Invoke-RestMethod -Uri "$BaseUrl/api/health" -TimeoutSec 30
  $health | ConvertTo-Json -Depth 5
  if ($health.status -notin @("ok", "degraded")) {
    Write-Host "[FAIL] health.status inesperado"
    $failed++
  }
  if ($health.storage.mode -ne "redis") {
    Write-Host "[WARN] storage.mode=$($health.storage.mode) — esperado redis em producao"
  } else {
    Write-Host "[OK] storage.mode=redis"
  }
} catch {
  Write-Host "[FAIL] /api/health — $($_.Exception.Message)"
  $failed++
}

Write-Host "`n--- Paginas publicas ---"
Test-Url "/" "Home"
Test-Url "/contato" "Contato"
Test-Url "/sobre" "Sobre"
Test-Url "/robots.txt" "Robots"
Test-Url "/sitemap.xml" "Sitemap"

Write-Host "`n--- Redirect acessar (fitness) ---"
Test-Url "/nexshape-fitness/acessar" "Acessar fitness"

Write-Host "`n--- Admin (nao autenticado) ---"
try {
  $r = Invoke-WebRequest -Uri "$BaseUrl/admin/api/leads" -MaximumRedirection 0 -ErrorAction Stop
  Write-Host "[FAIL] /admin/api/leads deveria retornar 401, obteve $($r.StatusCode)"
  $failed++
} catch {
  if ($_.Exception.Response.StatusCode.value__ -eq 401) {
    Write-Host "[OK] /admin/api/leads retorna 401 sem sessao"
  } else {
    Write-Host "[FAIL] /admin/api/leads — $($_.Exception.Message)"
    $failed++
  }
}

Write-Host "`n=== Resultado: $failed falha(s) ==="
if ($failed -gt 0) { exit 1 }
exit 0
