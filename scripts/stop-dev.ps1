$ports = @(5000, 5173, 5174)
$pids = @()

foreach ($port in $ports) {
  $lines = netstat -ano | Select-String ":$port\s+.*LISTENING"
  foreach ($line in $lines) {
    $parts = ($line.ToString() -split "\s+") | Where-Object { $_ -ne "" }
    $processId = [int]$parts[-1]
    if ($processId -gt 0) {
      $pids += $processId
    }
  }
}

$pids = $pids | Sort-Object -Unique

if ($pids.Count -eq 0) {
  Write-Host "No dev servers found on ports 5000, 5173, or 5174."
  exit 0
}

foreach ($processId in $pids) {
  try {
    $process = Get-Process -Id $processId -ErrorAction Stop
    if ($process.ProcessName -eq "node") {
      Write-Host "Stopping node process $processId on a dev port..."
      Stop-Process -Id $processId -Force
    } else {
      Write-Host "Skipping non-node process $processId ($($process.ProcessName))."
    }
  } catch {
    Write-Host "Process $processId already stopped."
  }
}
