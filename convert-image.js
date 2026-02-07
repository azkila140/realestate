const sharp = require('sharp');
const path = require('path');

async function convertToWebP() {
    try {
        await sharp('public/mohamad-hero.png')
            .resize(634, 793, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 85 })
            .toFile('public/mohamad-hero.webp');

        console.log('✅ Successfully converted mohamad-hero.png to WebP format');
        console.log('📦 Resized to 634x793px');
        console.log('🎯 Quality: 85%');
    } catch (error) {
        console.error('❌ Error converting image:', error);
        process.exit(1);
    }
}

convertToWebP();
