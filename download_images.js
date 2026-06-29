const fs = require('fs');
const path = require('path');

const images = {
  '侗族多重檐': [
    { name: 'donglou1.jpg', url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80' },
    { name: 'donglou2.jpg', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80' },
    { name: 'donglou3.jpg', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80' },
    { name: 'donglou4.jpg', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80' },
    { name: 'donglou5.jpg', url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1200&q=80' },
    { name: 'donglou6.jpg', url: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80' },
    { name: 'donglou7.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80' },
    { name: 'donglou8.jpg', url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80' },
    { name: 'donglou9.jpg', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80' },
    { name: 'donglou10.jpg', url: 'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=1200&q=80' },
    { name: 'donglou11.jpg', url: 'https://images.unsplash.com/photo-1537274942065-eda9d00a6293?w=1200&q=80' },
    { name: 'donglou12.jpg', url: 'https://images.unsplash.com/photo-1555990793-da11153b6c16?w=1200&q=80' }
  ],
  '徽派马头墙': [
    { name: 'huipai1.jpg', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80' },
    { name: 'huipai2.jpg', url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80' },
    { name: 'huipai3.jpg', url: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80' },
    { name: 'huipai4.jpg', url: 'https://images.unsplash.com/photo-1537274942065-eda9d00a6293?w=1200&q=80' },
    { name: 'huipai5.jpg', url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80' },
    { name: 'huipai6.jpg', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80' },
    { name: 'huipai7.jpg', url: 'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=1200&q=80' },
    { name: 'huipai8.jpg', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80' },
    { name: 'huipai9.jpg', url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1200&q=80' },
    { name: 'huipai10.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80' },
    { name: 'huipai11.jpg', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80' },
    { name: 'huipai12.jpg', url: 'https://images.unsplash.com/photo-1555990793-da11153b6c16?w=1200&q=80' }
  ],
  '太和殿庑殿顶': [
    { name: 'taihedian1.jpg', url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80' },
    { name: 'taihedian2.jpg', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80' },
    { name: 'taihedian3.jpg', url: 'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=1200&q=80' },
    { name: 'taihedian4.jpg', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80' },
    { name: 'taihedian5.jpg', url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1200&q=80' },
    { name: 'taihedian6.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80' },
    { name: 'taihedian7.jpg', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80' },
    { name: 'taihedian8.jpg', url: 'https://images.unsplash.com/photo-1555990793-da11153b6c16?w=1200&q=80' },
    { name: 'taihedian9.jpg', url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80' },
    { name: 'taihedian10.jpg', url: 'https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80' },
    { name: 'taihedian11.jpg', url: 'https://images.unsplash.com/photo-1537274942065-eda9d00a6293?w=1200&q=80' },
    { name: 'taihedian12.jpg', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80' }
  ]
};

async function downloadImage(url, filePath) {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

async function main() {
  for (const [folder, items] of Object.entries(images)) {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    for (const item of items) {
      const filePath = path.join(folderPath, item.name);
      try {
        await downloadImage(item.url, filePath);
        console.log(`Downloaded: ${folder}/${item.name}`);
      } catch (err) {
        console.error(`Failed to download ${item.url}:`, err.message);
      }
    }
  }
  console.log('\nAll images downloaded!');
}

main();