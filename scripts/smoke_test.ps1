# scripts/smoke_test.ps1
# PowerShell smoke test for LLM endpoint
# Usage: .\smoke_test.ps1 -Url "http://localhost:3000/api/generate" -ApiKey "..."
param(
  [string]$Url = "http://localhost:3000/api/generate",
  [string]$ApiKey = ""
)

$body = @{
  prompt = "Hello — please respond with a short greeting and the current timestamp."
  max_tokens = 64
} | ConvertTo-Json

$headers = @{ 'Content-Type' = 'application/json' }
if($ApiKey -ne ''){ $headers['Authorization'] = "Bearer $ApiKey" }

Write-Host "Sending smoke test to $Url"
try{
  $resp = Invoke-RestMethod -Uri $Url -Method Post -Body $body -Headers $headers
  Write-Host "Response:`n" ($resp | ConvertTo-Json -Depth 4)
}catch{
  Write-Host "Request failed:`n" $_.Exception.Message
}
