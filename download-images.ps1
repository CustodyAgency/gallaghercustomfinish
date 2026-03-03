$imagesDir = "public\images"
New-Item -ItemType Directory -Force -Path $imagesDir

function Download-WithFallbacks {
    param (
        [string[]]$urls,
        [string]$outputPath,
        [int]$minSizeKB
    )
    foreach ($url in $urls) {
        Write-Host "Trying $url -> $outputPath"
        try {
            Invoke-WebRequest -Uri $url -OutFile $outputPath -MaximumRedirection 5 -ErrorAction Stop
            $item = Get-Item $outputPath
            if ($item.Length -gt ($minSizeKB * 1024)) {
                Write-Host "Success: $($item.Length) bytes"
                return $true
            } else {
                Write-Host "File too small, trying next..."
                Remove-Item $outputPath -ErrorAction SilentlyContinue
            }
        } catch {
            Write-Host "Error downloading: $_"
        }
    }
    Write-Host "FAILED to download $outputPath"
    return $false
}

$success = $true

# Staff
$success = $success -and (Download-WithFallbacks `
    -urls @("https://randomuser.me/api/portraits/men/52.jpg", "https://randomuser.me/api/portraits/men/61.jpg", "https://randomuser.me/api/portraits/men/44.jpg") `
    -outputPath "$imagesDir\patrick-gallagher-owner-gallagher-custom-finish-syracuse-ny.jpg" `
    -minSizeKB 5)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://randomuser.me/api/portraits/men/22.jpg", "https://randomuser.me/api/portraits/men/33.jpg", "https://randomuser.me/api/portraits/men/18.jpg") `
    -outputPath "$imagesDir\sean-gallagher-project-manager-gallagher-custom-finish-ny.jpg" `
    -minSizeKB 5)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://randomuser.me/api/portraits/women/45.jpg", "https://randomuser.me/api/portraits/women/57.jpg", "https://randomuser.me/api/portraits/women/38.jpg") `
    -outputPath "$imagesDir\colleen-gallagher-estimator-gallagher-custom-finish-cortland-ny.jpg" `
    -minSizeKB 5)

# Backgrounds
$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80", "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80", "https://source.unsplash.com/1920x1080/?interior,painting,contractor,professional") `
    -outputPath "$imagesDir\interior-painting-contractor-syracuse-ny-gallagher-custom-finish.jpg" `
    -minSizeKB 50)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80") `
    -outputPath "$imagesDir\custom-finish-craftsman-detail-work-cortland-ny.jpg" `
    -minSizeKB 50)

# Portfolios
$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75", "https://source.unsplash.com/800x600/?victorian") `
    -outputPath "$imagesDir\portfolio-victorian-brownstone-interior-restoration-syracuse-ny.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75", "https://source.unsplash.com/800x600/?office") `
    -outputPath "$imagesDir\portfolio-commercial-office-interior-painting-syracuse-ny.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=75", "https://source.unsplash.com/800x600/?church") `
    -outputPath "$imagesDir\portfolio-historic-church-millwork-restoration-cortland-ny.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=75", "https://source.unsplash.com/800x600/?kitchen") `
    -outputPath "$imagesDir\portfolio-kitchen-cabinet-refinishing-gallagher-custom-finish.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75", "https://source.unsplash.com/800x600/?farmhouse") `
    -outputPath "$imagesDir\portfolio-farmhouse-exterior-painting-central-new-york.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=75", "https://source.unsplash.com/800x600/?apartment") `
    -outputPath "$imagesDir\portfolio-multi-family-apartment-exterior-painting-syracuse.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=75", "https://source.unsplash.com/800x600/?law") `
    -outputPath "$imagesDir\portfolio-law-office-interior-paint-finish-cortland-ny.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75", "https://source.unsplash.com/800x600/?epoxy") `
    -outputPath "$imagesDir\portfolio-garage-epoxy-floor-coating-springfield-ny.jpg" `
    -minSizeKB 20)

$success = $success -and (Download-WithFallbacks `
    -urls @("https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=75", "https://source.unsplash.com/800x600/?school") `
    -outputPath "$imagesDir\portfolio-school-hallway-commercial-painting-central-ny.jpg" `
    -minSizeKB 20)

if ($success) { Write-Host "ALL IMAGES DOWNLOADED SUCCESSFULLY" } else { Write-Host "SOME IMAGES FAILED" }
