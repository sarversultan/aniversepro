# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Please run this script as Administrator" -ForegroundColor Red
    Write-Host "Right-click on PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

# Function to check if a process is running
function Test-ProcessRunning {
    param (
        [string]$ProcessName
    )
    return Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
}

# Function to check if a command exists
function Test-CommandExists {
    param (
        [string]$Command
    )
    return [bool](Get-Command -Name $Command -ErrorAction SilentlyContinue)
}

# Function to check if a port is in use
function Test-PortInUse {
    param (
        [int]$Port
    )
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connections -ne $null
}

# Function to start a process with full path
function Start-ProcessWithPath {
    param (
        [string]$ProcessPath,
        [string]$ProcessName
    )
    if (Test-Path $ProcessPath) {
        Write-Host "Starting $ProcessName..."
        Start-Process -FilePath $ProcessPath -NoNewWindow
        Start-Sleep -Seconds 5  # Give the process time to start
        if (Test-ProcessRunning $ProcessName) {
            Write-Host "$ProcessName started successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Failed to start $ProcessName" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "Error: $ProcessName not found at $ProcessPath" -ForegroundColor Red
        return $false
    }
}

# Function to check if a service is installed
function Test-ServiceInstalled {
    param (
        [string]$ServiceName
    )
    return Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
}

# Get npm path
$npmPath = (Get-Command npm -ErrorAction SilentlyContinue).Source
if (-not $npmPath) {
    Write-Host "npm not found in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# MongoDB paths (update these paths according to your installation)
$mongoPaths = @(
    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe",
    "C:\mongodb\bin\mongod.exe"
)

# Redis paths (update these paths according to your installation)
$redisPaths = @(
    "C:\Program Files\Redis\redis-server.exe",
    "C:\Redis\redis-server.exe"
)

# Check if MongoDB is installed as a service
$mongoService = Test-ServiceInstalled "MongoDB"
if ($mongoService) {
    Write-Host "MongoDB service found. Starting service..."
    try {
        Start-Service -Name "MongoDB" -ErrorAction Stop
        Start-Sleep -Seconds 5
        Write-Host "MongoDB service started successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to start MongoDB service. Trying process-based startup..." -ForegroundColor Yellow
        $mongoService = $null
    }
}

if (-not $mongoService) {
    # Check and start MongoDB as a process
    if (-not (Test-ProcessRunning "mongod")) {
        $mongoFound = $false
        foreach ($path in $mongoPaths) {
            if (Test-Path $path) {
                $mongoFound = Start-ProcessWithPath $path "MongoDB"
                if ($mongoFound) { break }
            }
        }
        if (-not $mongoFound) {
            Write-Host "MongoDB not found. Please install MongoDB or update the paths in the script." -ForegroundColor Red
            Write-Host "Download MongoDB from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
            exit 1
        }
    }
}

# Check if Redis is installed as a service
$redisService = Test-ServiceInstalled "Redis"
if ($redisService) {
    Write-Host "Redis service found. Starting service..."
    try {
        Start-Service -Name "Redis" -ErrorAction Stop
        Start-Sleep -Seconds 5
        Write-Host "Redis service started successfully" -ForegroundColor Green
    } catch {
        Write-Host "Failed to start Redis service. Trying process-based startup..." -ForegroundColor Yellow
        $redisService = $null
    }
}

if (-not $redisService) {
    # Check and start Redis as a process
    if (-not (Test-ProcessRunning "redis-server")) {
        $redisFound = $false
        foreach ($path in $redisPaths) {
            if (Test-Path $path) {
                $redisFound = Start-ProcessWithPath $path "Redis"
                if ($redisFound) { break }
            }
        }
        if (-not $redisFound) {
            Write-Host "Redis not found. Please install Redis or update the paths in the script." -ForegroundColor Red
            Write-Host "Download Redis from: https://github.com/microsoftarchive/redis/releases" -ForegroundColor Yellow
            exit 1
        }
    }
}

# Check if .env file exists
$envPath = "apps/backend/.env"
if (-not (Test-Path $envPath)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
PORT=5000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/aniverse
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
COOKIE_NAME=token
"@ | Out-File -FilePath $envPath -Encoding UTF8
    Write-Host ".env file created. Please update the values as needed." -ForegroundColor Yellow
}

# Install dependencies if needed
Write-Host "`nChecking dependencies..." -ForegroundColor Cyan
Set-Location -Path "apps/backend"
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    & $npmPath install
}

Set-Location -Path "../frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    & $npmPath install
}

# Start backend
Write-Host "`nStarting backend server..." -ForegroundColor Cyan
Set-Location -Path "../backend"
$backendJob = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "`"$npmPath`" run start" -NoNewWindow -PassThru

# Wait for backend to start
$backendStarted = $false
$attempts = 0
while (-not $backendStarted -and $attempts -lt 30) {
    Start-Sleep -Seconds 1
    $attempts++
    if (Test-PortInUse 5000) {
        $backendStarted = $true
        Write-Host "Backend server started successfully" -ForegroundColor Green
    }
}

if (-not $backendStarted) {
    Write-Host "Failed to start backend server" -ForegroundColor Red
    exit 1
}

# Start frontend
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Set-Location -Path "../frontend"
$frontendJob = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "`"$npmPath`" run dev" -NoNewWindow -PassThru

# Wait for frontend to start
$frontendStarted = $false
$attempts = 0
while (-not $frontendStarted -and $attempts -lt 30) {
    Start-Sleep -Seconds 1
    $attempts++
    if (Test-PortInUse 3000) {
        $frontendStarted = $true
        Write-Host "Frontend server started successfully" -ForegroundColor Green
    }
}

if (-not $frontendStarted) {
    Write-Host "Failed to start frontend server" -ForegroundColor Red
    exit 1
}

# Return to original directory
Set-Location -Path "../../"

Write-Host "`nDevelopment environment started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3000"
Write-Host "`nPress Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
try {
    Wait-Event
} finally {
    # Cleanup
    if ($backendJob) { Stop-Process -Id $backendJob.Id -Force }
    if ($frontendJob) { Stop-Process -Id $frontendJob.Id -Force }
    Write-Host "`nServers stopped" -ForegroundColor Yellow
} 