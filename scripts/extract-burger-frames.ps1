param(
  [string]$InputVideo = "public\imagenes\hamburguesa.mp4",
  [string]$OutputDir = "public\frames\hamburguesa",
  [int]$Fps = 24,
  [int]$Width = 1920,
  [int]$Quality = 78
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg is not installed or is not available in PATH."
}

if (-not (Test-Path $InputVideo)) {
  throw "Input video not found: $InputVideo"
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$outputPattern = Join-Path $OutputDir "frame_%04d.webp"
$scaleFilter = "fps=$Fps,scale=$($Width):-1:flags=lanczos"

ffmpeg `
  -y `
  -i $InputVideo `
  -vf $scaleFilter `
  -compression_level 6 `
  -quality $Quality `
  $outputPattern

Write-Host "Frames exported to $OutputDir"
