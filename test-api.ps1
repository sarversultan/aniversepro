# Function to test an endpoint
function Test-Endpoint {
    param (
        [string]$Url,
        [string]$Method = "Get",
        [string]$Description
    )
    Write-Host "`nTesting $Description..."
    try {
        $response = Invoke-RestMethod -Uri $Url -Method $Method -ErrorAction Stop
        Write-Host "Status: Success"
        Write-Host "Response: $($response | ConvertTo-Json -Depth 3)"
        return $true
    }
    catch {
        Write-Host "Status: Failed"
        Write-Host "Error: $($_.Exception.Message)"
        return $false
    }
}

# Wait for servers to start
Write-Host "Waiting for servers to start..."
Start-Sleep -Seconds 10

# Test health endpoints
$healthTests = @(
    @{
        Url = "http://localhost:5000/api/health"
        Description = "Basic health endpoint"
    },
    @{
        Url = "http://localhost:5000/api/health/detailed"
        Description = "Detailed health endpoint"
    }
)

$healthResults = $healthTests | ForEach-Object {
    Test-Endpoint -Url $_.Url -Description $_.Description
}

# Test anime endpoints
$animeTests = @(
    @{
        Url = "http://localhost:5000/api/anime/trending"
        Description = "Trending anime endpoint"
    },
    @{
        Url = "http://localhost:5000/api/anime/search?q=naruto"
        Description = "Anime search endpoint"
    }
)

$animeResults = $animeTests | ForEach-Object {
    Test-Endpoint -Url $_.Url -Description $_.Description
}

# Test manga endpoints
$mangaTests = @(
    @{
        Url = "http://localhost:5000/api/manga/trending"
        Description = "Trending manga endpoint"
    },
    @{
        Url = "http://localhost:5000/api/manga/search?q=one piece"
        Description = "Manga search endpoint"
    }
)

$mangaResults = $mangaTests | ForEach-Object {
    Test-Endpoint -Url $_.Url -Description $_.Description
}

# Summary
Write-Host "`nTest Summary:"
Write-Host "Health Tests: $($healthResults.Where({$_}).Count)/$($healthResults.Count) passed"
Write-Host "Anime Tests: $($animeResults.Where({$_}).Count)/$($animeResults.Count) passed"
Write-Host "Manga Tests: $($mangaResults.Where({$_}).Count)/$($mangaResults.Count) passed"

# Check if all tests passed
$allTests = $healthResults + $animeResults + $mangaResults
$passedTests = $allTests.Where({$_}).Count
$totalTests = $allTests.Count

Write-Host "`nOverall: $passedTests/$totalTests tests passed"
if ($passedTests -eq $totalTests) {
    Write-Host "All tests passed successfully!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed. Please check the errors above." -ForegroundColor Red
} 