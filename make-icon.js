const Jimp = require('jimp');
const fs = require('fs');

async function main() {
  try {
    if (!fs.existsSync('assets/icon.png')) return; // icon.png가 없으면 무시
    
    const image = await Jimp.read('assets/icon.png');
    // 비율을 유지하면서 256x256 정사각형 캔버스 중앙에 배치 (찌그러짐 방지)
    image.contain(256, 256);
    await image.writeAsync('assets/icon_square.png');
    
    const { default: pngToIco } = await import('png-to-ico');
    const buf = await pngToIco('assets/icon_square.png');
    fs.writeFileSync('assets/icon.ico', buf);
    console.log("✅ 새 아이콘(icon.ico) 자동 생성 완료!");
  } catch (err) {
    console.error("아이콘 생성 실패:", err.message);
  }
}
main();
