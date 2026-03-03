import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const imagesDir = 'public/images';
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

async function downloadWithFallbacks(urls, outputPath, minSizeKB) {
    for (const url of urls) {
        console.log(`Trying ${url} -> ${outputPath}`);
        try {
            const res = await fetch(url.replace('source.unsplash.com', 'images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800')); // fallback for source.unsplash.com
            if (!res.ok) throw new Error(`Status HTTP ${res.status}`);
            const buffer = await res.arrayBuffer();
            if (buffer.byteLength > minSizeKB * 1024) {
                fs.writeFileSync(outputPath, Buffer.from(buffer));
                console.log(`Success: ${buffer.byteLength} bytes`);
                return true;
            } else {
                console.log(`File too small (${buffer.byteLength} bytes), trying next...`);
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
    console.log(`FAILED to download ${outputPath}`);
    return false;
}

async function main() {
    let success = true;

    // Staff
    success &= await downloadWithFallbacks(
        ["https://randomuser.me/api/portraits/men/52.jpg", "https://randomuser.me/api/portraits/men/61.jpg", "https://randomuser.me/api/portraits/men/44.jpg"],
        `${imagesDir}/patrick-gallagher-owner-gallagher-custom-finish-syracuse-ny.jpg`, 2
    );

    success &= await downloadWithFallbacks(
        ["https://randomuser.me/api/portraits/men/22.jpg", "https://randomuser.me/api/portraits/men/33.jpg", "https://randomuser.me/api/portraits/men/18.jpg"],
        `${imagesDir}/sean-gallagher-project-manager-gallagher-custom-finish-ny.jpg`, 2
    );

    success &= await downloadWithFallbacks(
        ["https://randomuser.me/api/portraits/women/45.jpg", "https://randomuser.me/api/portraits/women/57.jpg", "https://randomuser.me/api/portraits/women/38.jpg"],
        `${imagesDir}/colleen-gallagher-estimator-gallagher-custom-finish-cortland-ny.jpg`, 2
    );

    // Backgrounds
    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80", "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80"],
        `${imagesDir}/interior-painting-contractor-syracuse-ny-gallagher-custom-finish.jpg`, 50
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"],
        `${imagesDir}/custom-finish-craftsman-detail-work-cortland-ny.jpg`, 50
    );

    // Portfolios
    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-victorian-brownstone-interior-restoration-syracuse-ny.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-commercial-office-interior-painting-syracuse-ny.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-historic-church-millwork-restoration-cortland-ny.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-kitchen-cabinet-refinishing-gallagher-custom-finish.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-farmhouse-exterior-painting-central-new-york.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-multi-family-apartment-exterior-painting-syracuse.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-law-office-interior-paint-finish-cortland-ny.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-garage-epoxy-floor-coating-springfield-ny.jpg`, 20
    );

    success &= await downloadWithFallbacks(
        ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=75", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800"],
        `${imagesDir}/portfolio-school-hallway-commercial-painting-central-ny.jpg`, 20
    );

    if (success) { console.log("ALL IMAGES DOWNLOADED SUCCESSFULLY"); } else { console.log("SOME IMAGES FAILED"); }
}

main();
